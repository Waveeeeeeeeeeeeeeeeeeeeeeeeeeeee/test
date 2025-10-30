import { CircleX } from 'lucide-react';
import { useEffect } from 'react';

import styles from './ImageZoomModal.module.css';

interface ImageZoomModalProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

export const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  isOpen,
  imageSrc,
  imageAlt,
  onClose
}) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDownEvent = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDownEvent);

    return () => {
      document.removeEventListener('keydown', handleKeyDownEvent);
      document.body.style.overflowY = 'scroll';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
			<div className={styles.modal}>
				<span className={styles.closeButton} onClick={onClose}>
					<CircleX />
				</span>
				<img src={imageSrc} alt={imageAlt} className={styles.zoomedImage} />
			</div>
		</div>);

};