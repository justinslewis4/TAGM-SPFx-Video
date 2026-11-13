import * as React from 'react';
import { useState } from 'react';
import styles from './WelcomeVideo.module.scss';
import { IWelcomeVideoProps } from './IWelcomeVideoProps';

const WelcomeVideo: React.FC<IWelcomeVideoProps> = ({
  videoUrl,
  notificationId
}) => {
  const storageKey: string =
    `welcome-video-dismissed-${notificationId}`;

  const [isOpen, setIsOpen] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(storageKey) !== 'true';
    } catch {
      return true;
    }
  });

  const [doNotShowAgain, setDoNotShowAgain] =
    useState<boolean>(false);

  const closeVideo = (): void => {
    if (doNotShowAgain) {
      try {
        window.localStorage.setItem(storageKey, 'true');
      } catch {
        // The video will still close for the current page session.
      }
    }

    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={styles.overlay}
      role="presentation"
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-video-title"
      >
        <div className={styles.header}>
          <h2
            id="welcome-video-title"
            className={styles.title}
          >
            Welcome Video
          </h2>

          <button
            type="button"
            className={styles.closeButton}
            aria-label="Close welcome video"
            onClick={closeVideo}
          >
            ×
          </button>
        </div>

        <div className={styles.content}>
          <video
            className={styles.video}
            src={videoUrl}
            autoPlay
            muted
            controls
            playsInline
          />

          <div className={styles.footer}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={doNotShowAgain}
                onChange={(
                  event: React.ChangeEvent<HTMLInputElement>
                ) => {
                  setDoNotShowAgain(event.target.checked);
                }}
              />

              <span>
                Don’t show this video again
              </span>
            </label>

            <button
              type="button"
              className={styles.dismissButton}
              onClick={closeVideo}
            >
              Close
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WelcomeVideo;
