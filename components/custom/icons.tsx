import {
  ArrowRight,
  LucideIcon,
  LucideProps,
  Plus,
  TvMinimalPlay,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  add: Plus,
  watch: TvMinimalPlay,
  // dollar: BadgeDollarSign,
  // message: MessageCircleMore,
  arrowRight: ArrowRight,
  leftChevron: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path d="M15 6L9 12L15 18" stroke="currentColor" />
    </svg>
  ),
  rightChevron: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path d="M9 6L15 12L9 18" stroke="currentColor" />
    </svg>
  ),
  facebook: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="22"
      viewBox="0 0 16 22"
      fill="none"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.18182 9.3333C1.20406 9.3333 1 9.5252 1 10.4444V12.1111C1 13.0304 1.20406 13.2222 2.18182 13.2222H4.54545V19.8889C4.54545 20.8081 4.74951 21 5.72727 21H8.0909C9.0687 21 9.2727 20.8081 9.2727 19.8889V13.2222H11.9267C12.6683 13.2222 12.8594 13.0867 13.0631 12.4164L13.5696 10.7497C13.9185 9.6014 13.7035 9.3333 12.4332 9.3333H9.2727V6.55556C9.2727 5.94191 9.8018 5.44444 10.4545 5.44444H13.8182C14.7959 5.44444 15 5.25259 15 4.33333V2.11111C15 1.19185 14.7959 1 13.8182 1H10.4545C7.191 1 4.54545 3.48731 4.54545 6.55556V9.3333H2.18182Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  x: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <path
        d="M7.14163 5.08118L11.6089 0H10.5503L6.67137 4.41192L3.57328 0H0L4.68492 6.6716L0 12H1.05866L5.15491 7.34086L8.42672 12H12L7.14137 5.08118H7.14163ZM5.69165 6.73038L5.21697 6.06604L1.44011 0.779804H3.06615L6.11412 5.04596L6.5888 5.71031L10.5508 11.2557H8.92476L5.69165 6.73063V6.73038Z"
        fill="white"
      />
    </svg>
  ),
  instagram: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M17.5074 6.5H17.4988"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  pinst: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M12 11L8 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.97368 16.5724C10.5931 16.8473 11.2787 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 12.9108 7.24367 13.7646 7.66921 14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  ),
  youTube: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M12 20.5C13.8097 20.5 15.5451 20.3212 17.1534 19.9934C19.1623 19.5839 20.1668 19.3791 21.0834 18.2006C22 17.0221 22 15.6693 22 12.9635V11.0365C22 8.33073 22 6.97787 21.0834 5.79937C20.1668 4.62088 19.1623 4.41613 17.1534 4.00662C15.5451 3.67877 13.8097 3.5 12 3.5C10.1903 3.5 8.45489 3.67877 6.84656 4.00662C4.83766 4.41613 3.83321 4.62088 2.9166 5.79937C2 6.97787 2 8.33073 2 11.0365V12.9635C2 15.6693 2 17.0221 2.9166 18.2006C3.83321 19.3791 4.83766 19.5839 6.84656 19.9934C8.45489 20.3212 10.1903 20.5 12 20.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M15.9621 12.3129C15.8137 12.9187 15.0241 13.3538 13.4449 14.2241C11.7272 15.1705 10.8684 15.6438 10.1728 15.4615C9.9372 15.3997 9.7202 15.2911 9.53799 15.1438C9 14.7089 9 13.8059 9 12C9 10.1941 9 9.29112 9.53799 8.85618C9.7202 8.70886 9.9372 8.60029 10.1728 8.53854C10.8684 8.35621 11.7272 8.82945 13.4449 9.77593C15.0241 10.6462 15.8137 11.0813 15.9621 11.6871C16.0126 11.8933 16.0126 12.1067 15.9621 12.3129Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  linkedIn: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="#FF642B" />
      <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#FF642B" />
      <path
        d="M17.9971 18L18 17.9995V13.6379C18 11.5042 17.553 9.8606 15.1253 9.8606C13.9583 9.8606 13.1751 10.5186 12.8553 11.1425H12.8216V10.0598H10.5198V17.9995H12.9166V14.068C12.9166 13.0329 13.1076 12.032 14.3552 12.032C15.5844 12.032 15.6027 13.2133 15.6027 14.1344V18H17.9971Z"
        fill="white"
      />
      <path
        d="M6.19092 10.0602H8.59062V17.9998H6.19092V10.0602Z"
        fill="white"
      />
      <path
        d="M7.38986 6C6.62259 6 6 6.63971 6 7.42808C6 8.21645 6.62259 8.86954 7.38986 8.86954C8.15713 8.86954 8.77972 8.21645 8.77972 7.42808C8.77924 6.63971 8.15665 6 7.38986 6Z"
        fill="white"
      />
    </svg>
  ),
  clock: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <path
        d="M9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0ZM9 2.5C8.44771 2.5 8 2.94772 8 3.5V8.75C8 9.44036 8.55964 10 9.25 10H12.5C13.0523 10 13.5 9.55229 13.5 9C13.5 8.44771 13.0523 8 12.5 8H10V3.5C10 2.94772 9.55229 2.5 9 2.5Z"
        fill="currentColor"
      />
    </svg>
  ),
  calendar: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2"
      height="5"
      viewBox="0 0 2 5"
      fill="none"
      {...props}
    >
      <path
        d="M1 1L0.999999 3.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  whatsapp: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.3789 2.27907 14.6926 2.78382 15.8877C3.06278 16.5481 3.20226 16.8784 3.21953 17.128C3.2368 17.3776 3.16334 17.6521 3.01642 18.2012L2 22L5.79877 20.9836C6.34788 20.8367 6.62244 20.7632 6.87202 20.7805C7.12161 20.7977 7.45185 20.9372 8.11235 21.2162C9.30745 21.7209 10.6211 22 12 22Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.58815 12.3773L9.45909 11.2956C9.82616 10.8397 10.2799 10.4153 10.3155 9.80826C10.3244 9.65494 10.2166 8.96657 10.0008 7.58986C9.91601 7.04881 9.41086 7 8.97332 7C8.40314 7 8.11805 7 7.83495 7.12931C7.47714 7.29275 7.10979 7.75231 7.02917 8.13733C6.96539 8.44196 7.01279 8.65187 7.10759 9.07169C7.51023 10.8548 8.45481 12.6158 9.91948 14.0805C11.3842 15.5452 13.1452 16.4898 14.9283 16.8924C15.3481 16.9872 15.558 17.0346 15.8627 16.9708C16.2477 16.8902 16.7072 16.5229 16.8707 16.165C17 15.8819 17 15.5969 17 15.0267C17 14.5891 16.9512 14.084 16.4101 13.9992C15.0334 13.7834 14.3451 13.6756 14.1917 13.6845C13.5847 13.7201 13.1603 14.1738 12.7044 14.5409L11.6227 15.4118"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  ),
  // ---------------------

  search: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M17 17L21 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  arrowMoveRight: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      {...props}
    >
      <path
        d="M0.75 6.75H16.75M16.75 6.75L10.75 0.75M16.75 6.75L10.75 12.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  address: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M3 10.9866V15.4932C3 18.3257 3 19.742 3.87868 20.622C4.75736 21.502 6.17157 21.502 9 21.502H15C17.8284 21.502 19.2426 21.502 20.1213 20.622C21 19.742 21 18.3257 21 15.4932V10.9866"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 17.9741H11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17.7966 2.50049L6.1508 2.52954C4.41263 2.44011 3.96697 3.77859 3.96697 4.4329C3.96697 5.01809 3.89152 5.8712 2.82621 7.47462C1.7609 9.07804 1.84095 9.55437 2.44168 10.6644C2.94025 11.5857 4.20838 11.9455 4.86959 12.0061C6.9698 12.0538 7.99162 10.2398 7.99162 8.96495C9.03348 12.1683 11.9965 12.1683 13.3167 11.802C14.6395 11.435 15.7726 10.1214 16.04 8.96495C16.1959 10.4021 16.6691 11.2408 18.0672 11.817C19.5154 12.4139 20.7608 11.5016 21.3857 10.9168C22.0106 10.332 22.4116 9.03364 21.2977 7.60666C20.5295 6.62257 20.2093 5.69548 20.1042 4.73462C20.0432 4.17787 19.9897 3.57961 19.5981 3.1989C19.0257 2.64253 18.2045 2.47372 17.7966 2.50049Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  phoneCall: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M4.91186 10.5413L7.55229 7.90088C8.09091 7.36227 8.27728 6.56642 8.05944 5.83652C7.8891 5.26577 7.69718 4.57964 7.56961 3.99292C7.45162 3.45027 6.97545 3 6.42012 3H4.91186C3.8012 3 2.88911 3.90384 3.01094 5.0078C3.93709 13.3996 10.6004 20.0629 18.9922 20.9891C20.0962 21.1109 21 20.1988 21 19.0881V17.5799C21 17.0246 20.5479 16.569 20.0015 16.4696C19.3988 16.36 18.7611 16.1804 18.2276 16.0103C17.4611 15.7659 16.6091 15.9377 16.0403 16.5065L13.4587 19.0881"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  clockTime: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12.0078 10.5082C11.1794 10.5082 10.5078 11.1798 10.5078 12.0082C10.5078 12.8366 11.1794 13.5082 12.0078 13.5082C12.8362 13.5082 13.5078 12.8366 13.5078 12.0082C13.5078 11.1798 12.8362 10.5082 12.0078 10.5082ZM12.0078 10.5082V6.99902M15.0147 15.0198L13.0661 13.0712"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};
