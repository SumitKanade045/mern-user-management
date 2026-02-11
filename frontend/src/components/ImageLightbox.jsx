import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ImageLightbox = ({ images = [], initialIndex = 0, open = false, onClose }) => {
  const [index, setIndex] = useState(initialIndex || 0);
  const count = images.length;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose && onClose();
      } else if (e.key === "ArrowRight" && count > 1) {
        setIndex((i) => (i + 1) % count);
      } else if (e.key === "ArrowLeft" && count > 1) {
        setIndex((i) => (i - 1 + count) % count);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, count, onClose]);

  useEffect(() => {
    setIndex(initialIndex || 0);
  }, [initialIndex]);

  const handleBackdropClick = useCallback(() => {
    onClose && onClose();
  }, [onClose]);

  const stop = (e) => e.stopPropagation();

  const goPrev = () => count > 1 && setIndex((i) => (i - 1 + count) % count);
  const goNext = () => count > 1 && setIndex((i) => (i + 1) % count);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="lightbox-content"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={stop}
            role="dialog"
            aria-modal="true"
          >
            <button className="lightbox-close" aria-label="Close" onClick={onClose}>×</button>
            {count > 1 && (
              <>
                <button className="lightbox-nav lightbox-prev" aria-label="Previous" onClick={goPrev}>‹</button>
                <button className="lightbox-nav lightbox-next" aria-label="Next" onClick={goNext}>›</button>
              </>
            )}
            {images[index]?.src ? (
              <img
                className="lightbox-image"
                src={images[index].src}
                alt={images[index].alt || "Preview"}
              />
            ) : (
              <div className="lightbox-image-fallback">Image unavailable</div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
