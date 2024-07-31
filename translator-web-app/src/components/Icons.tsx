import React from 'react';

interface Props {
  class?: string | undefined;
  onClick?: (event: React.MouseEvent) => void;
  color?: string;
  size?: string;
}

export const LanguageIcon: React.FC<Props> = ({
  ...props
}: Props): JSX.Element => {
  const { class: classes, size } = props as Props;
  return (
    <div className={classes}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={size}
      >
        <path
          d="M12.5 14.25H13.25V13.5V9.75H21.25V21.25H10.75V14.25H12.5Z"
          stroke="#d1d5db"
          strokeWidth="1"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.1451 12.25H15.6661L15.4647 12.6845L13.8419 16.1845L12.6829 18.6845L12.5366 19H14.19L15.0013 17.25H17.7252L18.5366 19H20.19L20.0437 18.6845L18.8846 16.1845L17.2619 12.6845L17.0604 12.25H16.5815H16.3633H16.1451ZM16.3633 14.3125L17.0298 15.75H15.6968L16.3633 14.3125Z"
          fill="#d1d5db"
        />
        <path
          d="M2.75 2.75H13.25V14.25H2.75V2.75Z"
          stroke="#d1d5db"
          strokeWidth="1"
        />
        <path
          d="M5 6.83333H6.5M11 6.83333H8M8 6.83333V5.5M8 6.83333H6.5M6.5 6.83333C6.66667 7.94444 7.5 11.5 11 11.5M9.5 6.83333C9.33333 7.94444 8.05556 11.5 5 11.5"
          stroke="#d1d5db"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};

export const UserIcon: React.FC<Props> = ({ ...props }: Props): JSX.Element => {
  const { class: classes } = props as Props;
  return (
    <div className={classes}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#d1d5db"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    </div>
  );
};

export const AIIcon: React.FC<Props> = ({ ...props }: Props): JSX.Element => {
  const { class: classes } = props as Props;
  return (
    <div className={classes}>
      <svg
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Stars AI"
        role="img"
        className="size-6 text-white"
      >
        <path
          d="M12.3488 8.56625L9.12317 7.37875L7.93567 4.15062C7.86534 3.95958 7.73811 3.7947 7.57114 3.67824C7.40417 3.56178 7.20549 3.49933 7.00192 3.49933C6.79834 3.49933 6.59966 3.56178 6.43269 3.67824C6.26572 3.7947 6.13849 3.95958 6.06817 4.15062L4.87942 7.375L1.65129 8.5625C1.46025 8.63282 1.29537 8.76005 1.17891 8.92702C1.06244 9.094 1 9.29267 1 9.49625C1 9.69983 1.06244 9.8985 1.17891 10.0655C1.29537 10.2324 1.46025 10.3597 1.65129 10.43L4.87504 11.625L6.06254 14.8512C6.13286 15.0423 6.26009 15.2072 6.42707 15.3236C6.59404 15.4401 6.79272 15.5025 6.99629 15.5025C7.19987 15.5025 7.39854 15.4401 7.56552 15.3236C7.73249 15.2072 7.85972 15.0423 7.93004 14.8512L9.11754 11.6256L12.3457 10.4381C12.5367 10.3678 12.7016 10.2406 12.8181 10.0736C12.9345 9.90663 12.997 9.70795 12.997 9.50438C12.997 9.3008 12.9345 9.10212 12.8181 8.93515C12.7016 8.76818 12.5367 8.64095 12.3457 8.57063L12.3488 8.56625ZM8.77442 10.6875C8.6393 10.7371 8.51659 10.8155 8.41482 10.9173C8.31304 11.019 8.23463 11.1418 8.18504 11.2769L6.99754 14.4931L5.81254 11.2744C5.76291 11.14 5.68475 11.0179 5.58344 10.9166C5.48213 10.8153 5.36007 10.7371 5.22567 10.6875L2.00942 9.5L5.22567 8.3125C5.36007 8.26287 5.48213 8.18471 5.58344 8.0834C5.68475 7.98209 5.76291 7.86003 5.81254 7.72563L7.00004 4.50938L8.18754 7.72563C8.23713 7.86074 8.31554 7.98345 8.41732 8.08523C8.51909 8.187 8.6418 8.26541 8.77692 8.315L11.9932 9.5025L8.77442 10.6875ZM9.00004 3C9.00004 2.86739 9.05272 2.74021 9.14649 2.64645C9.24026 2.55268 9.36743 2.5 9.50004 2.5H10.5V1.5C10.5 1.36739 10.5527 1.24021 10.6465 1.14645C10.7403 1.05268 10.8674 1 11 1C11.1326 1 11.2598 1.05268 11.3536 1.14645C11.4474 1.24021 11.5 1.36739 11.5 1.5V2.5H12.5C12.6326 2.5 12.7598 2.55268 12.8536 2.64645C12.9474 2.74021 13 2.86739 13 3C13 3.13261 12.9474 3.25979 12.8536 3.35355C12.7598 3.44732 12.6326 3.5 12.5 3.5H11.5V4.5C11.5 4.63261 11.4474 4.75979 11.3536 4.85355C11.2598 4.94732 11.1326 5 11 5C10.8674 5 10.7403 4.94732 10.6465 4.85355C10.5527 4.75979 10.5 4.63261 10.5 4.5V3.5H9.50004C9.36743 3.5 9.24026 3.44732 9.14649 3.35355C9.05272 3.25979 9.00004 3.13261 9.00004 3ZM15.5 6C15.5 6.13261 15.4474 6.25979 15.3536 6.35355C15.2598 6.44732 15.1326 6.5 15 6.5H14.5V7C14.5 7.13261 14.4474 7.25979 14.3536 7.35355C14.2598 7.44732 14.1326 7.5 14 7.5C13.8674 7.5 13.7403 7.44732 13.6465 7.35355C13.5527 7.25979 13.5 7.13261 13.5 7V6.5H13C12.8674 6.5 12.7403 6.44732 12.6465 6.35355C12.5527 6.25979 12.5 6.13261 12.5 6C12.5 5.86739 12.5527 5.74021 12.6465 5.64645C12.7403 5.55268 12.8674 5.5 13 5.5H13.5V5C13.5 4.86739 13.5527 4.74021 13.6465 4.64645C13.7403 4.55268 13.8674 4.5 14 4.5C14.1326 4.5 14.2598 4.55268 14.3536 4.64645C14.4474 4.74021 14.5 4.86739 14.5 5V5.5H15C15.1326 5.5 15.2598 5.55268 15.3536 5.64645C15.4474 5.74021 15.5 5.86739 15.5 6Z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  );
};

export const RegenIcon: React.FC<Props> = ({
  ...props
}: Props): JSX.Element => {
  const { class: classes, color } = props as Props;
  return (
    <div className={classes}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={color}
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    </div>
  );
};

export const BookmarkIcon: React.FC<Props> = ({
  ...props
}: Props): JSX.Element => {
  const { class: classes } = props as Props;
  return (
    <div className={classes}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#d1d5db"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
        />
      </svg>
    </div>
  );
};

export const LikeIcon: React.FC<Props> = ({ ...props }: Props): JSX.Element => {
  const { class: classes, color } = props as Props;
  return (
    <div className={classes}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={color}
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
        />
      </svg>
    </div>
  );
};

export const CopyIcon: React.FC<Props> = ({ ...props }: Props): JSX.Element => {
  const { class: classes, color } = props as Props;
  return (
    <div className={classes}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={color}
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
        />
      </svg>
    </div>
  );
};

export const TickIcon: React.FC<Props> = ({ ...props }: Props): JSX.Element => {
  const { class: classes } = props as Props;
  return (
    <div className={classes}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#d1d5db"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
        />
      </svg>
    </div>
  );
};

export const CrossIcon: React.FC<Props> = ({
  ...props
}: Props): JSX.Element => {
  const { class: classes, onClick, color } = props as Props;
  return (
    <div className={classes} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={color}
        className="size-4"
      >
        <path
          fillRule="evenodd"
          d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export const RightArrow: React.FC<Props> = ({
  ...props
}: Props): JSX.Element => {
  const { class: classes } = props as Props;
  return (
    <div className={classes}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-3"
      >
        <path
          fillRule="evenodd"
          d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};
