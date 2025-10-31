import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

import styles from './ShowTags.module.css';
import { useCustomTranslation } from '@/shared';

interface Props {
  tags: string[];
  maxVisible?: number;
}

export const ShowTags: React.FC<Props> = ({ tags, maxVisible = 6 }) => {
  const [expanded, setExpanded] = useState(false);
  const { hideButton } = useCustomTranslation('description');

  const hiddenCount = tags.length - maxVisible;
  const toggleExpanded = () => setExpanded((prev) => !prev);

  const visible = tags.slice(0, maxVisible);
  const hidden = tags.slice(maxVisible);

  return (
    <div className='flex flex-wrap gap-2'>
			{visible.map((tag, index) =>
      <span key={tag + index} className={styles.tag}>
					{tag}
				</span>
      )}

			<AnimatePresence>
				{expanded &&
        hidden.map((tag, index) =>
        <motion.span
          key={tag + index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={styles.tag}>
          
							{tag}
						</motion.span>
        )}
			</AnimatePresence>

			<AnimatePresence mode='wait'>
				{hiddenCount > 0 &&
        <motion.button
          key={expanded ? 'hide' : 'show'}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={toggleExpanded}
          className={`${styles.interest} cursor-pointer`}>
          
						{expanded ?
          <span className='text-sm'>{hideButton}</span> :

          `+${hiddenCount}`
          }
					</motion.button>
        }
			</AnimatePresence>
		</div>);

};