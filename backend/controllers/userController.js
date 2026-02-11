const User = require("../models/User");
const { Parser } = require("json2csv");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const cloudAvailable = Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);


// Create User
exports.createUser = async (req, res, next) => {
  const { firstName, lastName, email, mobile, gender, status, location } = req.body;

  try {
    // Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      mobile,
      gender,
      status,
      location,
    });

    // If image file provided via multer disk storage
    if (req.file) {
      newUser.profileImage = req.file.filename || null;
    }

    await newUser.save();
    const responseUser = Object.assign({}, newUser.toObject(), {
      profileImage: newUser.profileImage ? `/uploads/${newUser.profileImage}` : null
    });
    res.status(201).json(responseUser);
  } catch (error) {
    next(error);
  }
};


// GET USERS WITH PAGINATION, SEARCH, AND FILTER
exports.getUsers = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search || "";
    const gender = req.query.gender || "All";
    const status = req.query.status || "All";
    const sort = req.query.sort || "new";

    const query = {
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };

    if (gender !== "All") {
      query.gender = gender;
    }

    if (status !== "All") {
      query.status = status;
    }

    const sortOptions = {};
    if (sort === "new") sortOptions.createdAt = -1;
    if (sort === "old") sortOptions.createdAt = 1;

    const users = await User.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await User.countDocuments(query);

    res.json({
      users,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};


// SEARCH USERS (Deprecated - use getUsers with search param)
exports.searchUsers = async (req, res, next) => {
  try {
    const query = req.query.query;

    const users = await User.find({
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });

    res.json(users);
  } catch (error) {
    next(error);
  }
};


// GET SINGLE USER
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const responseUser = Object.assign({}, user.toObject(), {
      profileImage: user.profileImage ? `/uploads/${user.profileImage}` : null
    });
    res.json(responseUser);
  } catch (error) {
    next(error);
  }
};


// UPDATE USER
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Update basic fields
    const { firstName, lastName, email, mobile, gender, status, location } = req.body;
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (email !== undefined) user.email = email;
    if (mobile !== undefined) user.mobile = mobile;
    if (gender !== undefined) user.gender = gender;
    if (status !== undefined) user.status = status;
    if (location !== undefined) user.location = location;

    // If new image provided, use multer disk storage filename
    if (req.file) {
      user.profileImage = req.file.filename || null;
    }

    await user.save();
    const responseUser = Object.assign({}, user.toObject(), {
      profileImage: user.profileImage ? `/uploads/${user.profileImage}` : null
    });
    res.json(responseUser);
  } catch (error) {
    next(error);
  }
};


// DELETE USER
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};


// EXPORT CSV
exports.exportUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    const fields = [
      "firstName",
      "lastName",
      "email",
      "mobile",
      "gender",
      "status",
      "location",
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(users);

    res.header("Content-Type", "text/csv");
    res.attachment("users.csv");
    res.send(csv);
  } catch (error) {
    next(error);
  }
};
