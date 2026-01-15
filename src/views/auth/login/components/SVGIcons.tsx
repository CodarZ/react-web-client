import type React from 'react';

interface SVGIconProps extends React.SVGProps<SVGSVGElement> {
  primaryColor?: string;
  secondaryColor?: string;
}

/** 右上角背景装饰图标 */
export const CornerTopIcon: React.FC<SVGIconProps> = ({
  primaryColor = '#1677ff',
  secondaryColor = '#69b1ff',
  ...props
}) => (
  <svg width="1337" height="1337" viewBox="0 0 1337 1337" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <path
        id="path-corner-top"
        fillRule="evenodd"
        d="M1337,668.5
           C1337,1037.455193874239 1037.455193874239,1337 668.5,1337
           C523.6725684305388,1337 337,1236 370.5,1094
           C434.03835568300906,824.6732385973953 0,892.6277623047779 0,668.5
           C0,299.5448061257611 299.5448061257609,0 668.5,0
           C1037.455193874239,0 1337,299.544806125761 1337,668.5Z"
      />
      <linearGradient
        id="gradient-corner-top"
        x1="0.79"
        y1="0.62"
        x2="0.21"
        y2="0.86"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0%" stopColor={primaryColor} />
        <stop offset="100%" stopColor={secondaryColor} />
      </linearGradient>
    </defs>
    <g>
      <use xlinkHref="#path-corner-top" fill="url(#gradient-corner-top)" />
    </g>
  </svg>
);

/** 左下角背景装饰图标 */
export const CornerBottomIcon: React.FC<SVGIconProps> = ({
  primaryColor = '#1677ff',
  secondaryColor = '#69b1ff',
  ...props
}) => (
  <svg width="967.8852157128662" height="896" viewBox="0 0 896 896" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <path
        id="path-corner-bottom"
        fillRule="evenodd"
        d="M896,448
           C1142.6325445712241,465.5747656464056 695.2579309733121,896 448,896
           C200.74206902668806,896 0,695.2579309733121 0,448
           C0,200.74206902668806 200.74206902668791,0 448,0
           C695.2579309733121,0 475,418 896,448Z"
      />
      <linearGradient id="gradient-corner-bottom" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0%" stopColor={secondaryColor} />
        <stop offset="100%" stopColor={primaryColor} />
      </linearGradient>
    </defs>
    <g>
      <use xlinkHref="#path-corner-bottom" fill="url(#gradient-corner-bottom)" />
    </g>
  </svg>
);

/** 登录页左侧插画图标 */
export const FormLeftIcon: React.FC<SVGIconProps> = ({
  primaryColor = '#3e5ccd',
  secondaryColor = '#cddcff',
  ...props
}) => (
  <svg id="form-left-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" {...props}>
    <defs>
      <style>{`
        .form-left-1 { fill: ${secondaryColor}; }
        .form-left-2 { fill: color-mix(in srgb, ${primaryColor}, #9ca3b5 15%); }
        .form-left-3 { fill: color-mix(in srgb, ${primaryColor}, #313849 20%); }
        .form-left-4 { fill: color-mix(in srgb, ${secondaryColor}, white 85%); }
        .form-left-5 { fill: color-mix(in srgb, ${primaryColor}, #30384a 20%); }
        .stroke-left-5 { stroke: color-mix(in srgb, ${primaryColor}, #30384a 20%); fill: none; }
        .form-left-6 { fill:  color-mix(in srgb, ${primaryColor}, white 70%); }
        .form-left-7 { opacity: 0.1; }
        .form-left-8 { fill: color-mix(in srgb, ${secondaryColor}, white 90%); }
        .form-left-9 { fill: #fff; }
        .form-left-10 { fill: color-mix(in srgb, ${primaryColor}, white 50%); }
        .form-left-11 { fill: #f7cc5c; }
        .form-left-12 { fill: #58c398; }
      `}</style>
      <clipPath id="form-left-card-clip">
        <rect x="220.65" y="172.07" width="108.53" height="100.32" rx="4" ry="4" />
      </clipPath>
    </defs>
    <ellipse className="form-left-1" cx="200" cy="294.41" rx="82.5" ry="2.57" />
    <polygon className="form-left-1" points="187.73 263.31 183.06 289.47 212.95 289.47 208.28 262.38 187.73 263.31" />
    <polygon className="form-left-2" points="187.73 263.31 186.04 272.79 209.97 272.74 208.28 262.38 187.73 263.31" />
    <rect className="form-left-3" x="168.58" y="286.2" width="58.85" height="8.41" rx="4.2" />
    <path
      className="form-left-4"
      d="M305.31,266.73H94.69A8.69,8.69,0,0,1,86,258V124.42a8.69,8.69,0,0,1,8.69-8.69H305.31a8.69,8.69,0,0,1,8.69,8.69V258A8.69,8.69,0,0,1,305.31,266.73Z"
    />
    <path
      className="form-left-5"
      d="M305.31,123.73a.69.69,0,0,1,.69.69V258a.69.69,0,0,1-.69.69H94.69A.69.69,0,0,1,94,258V124.42a.69.69,0,0,1,.69-.69H305.31m0-8H94.69A8.69,8.69,0,0,0,86,124.42V258a8.69,8.69,0,0,0,8.69,8.69H305.31A8.69,8.69,0,0,0,314,258V124.42a8.69,8.69,0,0,0-8.69-8.69Z"
    />
    <rect className="form-left-1" x="183.61" y="135.51" width="111.66" height="37.33" />
    <rect className="form-left-1" x="183.61" y="181.34" width="111.66" height="64.39" />
    <rect className="form-left-1" x="108.24" y="197.27" width="55.83" height="5.79" />
    <rect className="form-left-1" x="108.24" y="207.47" width="55.83" height="5.79" />
    <rect className="form-left-1" x="108.24" y="217.66" width="55.83" height="5.79" />
    <rect className="form-left-1" x="108.24" y="227.86" width="36.43" height="5.79" />
    <rect className="form-left-1" x="108.24" y="238.06" width="25.64" height="5.79" />
    <path
      className="form-left-1"
      d="M140.11,159.75l17.2-6.42A24.46,24.46,0,0,0,144.81,142C143.16,148.24,141.18,155.73,140.11,159.75Z"
    />
    <path
      className="form-left-6"
      d="M135.64,164.68l.76-2.85c1.51-5.68,3.75-14.16,5.51-20.79a24.48,24.48,0,1,0,16.65,15.09Z"
    />
    <polygon
      className="form-left-4"
      points="192.04 165.15 191.68 164.22 218.82 153.64 240.76 161.77 279.27 142.89 290.59 139.74 290.85 140.7 279.62 143.82 240.82 162.85 218.83 154.71 192.04 165.15"
    />

    <g className="form-left-7">
      <rect className="form-left-3" x="214.26" y="179.2" width="108.53" height="87.53" rx="8" />
    </g>

    <g clipPath="url(#form-left-card-clip)">
      <rect className="form-left-8" x="220.65" y="172.07" width="108.53" height="100.32" />

      <rect className="form-left-9" x="220.65" y="172.07" width="108.53" height="13.96" />
      <rect className="form-left-1" x="236.34" y="230.19" width="6.83" height="21.02" />
      <rect className="form-left-1" x="250.72" y="215.01" width="6.83" height="36.2" />
      <rect className="form-left-1" x="265.11" y="209.18" width="6.83" height="42.03" />
      <rect className="form-left-1" x="279.5" y="200.17" width="6.83" height="51.04" />
      <rect className="form-left-1" x="293.89" y="205.85" width="6.83" height="45.35" />
      <rect className="form-left-1" x="308.27" y="205.85" width="6.83" height="45.35" />
      <polygon
        className="form-left-10"
        points="239.77 240.44 239.17 239.65 254.09 228.45 268.47 235.87 297.08 214.11 297.19 214.09 311.58 210.84 311.8 211.82 297.52 215.04 268.57 237.05 254.19 229.62 239.77 240.44"
      />
      <circle className="form-left-10" cx="239.75" cy="240.04" r="1.74" />
      <circle className="form-left-10" cx="254.14" cy="229.35" r="1.74" />
      <circle className="form-left-10" cx="268.52" cy="236.56" r="1.74" />
      <circle className="form-left-10" cx="282.91" cy="225.69" r="1.74" />
      <circle className="form-left-10" cx="297.3" cy="214.53" r="1.74" />
      <circle className="form-left-10" cx="311.69" cy="211.33" r="1.74" />
      <circle className="form-left-10" cx="227.97" cy="179.05" r="2.5" />
      <circle className="form-left-11" cx="236.97" cy="179.05" r="2.5" />
      <circle className="form-left-12" cx="245.97" cy="179.05" r="2.5" />
    </g>

    <rect className="stroke-left-5" x="220.65" y="172.07" width="108.53" height="100.32" rx="3" strokeWidth="0.8" />
  </svg>
);
