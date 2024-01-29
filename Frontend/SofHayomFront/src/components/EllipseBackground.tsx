import React from 'react';
import Svg, { Path, Rect, Defs, ClipPath } from 'react-native-svg';

// Define the props for EllipseBackground
interface EllipseBackgroundProps {
  left: number;
}

const ELLIPSE_WIDTH = 136; // Width of the ellipse
const ELLIPSE_HEIGHT = 104; // Height of the ellipse

const EllipseBackground: React.FC<EllipseBackgroundProps> = ({ left }) => {
  return (
    <Svg 
      height={ELLIPSE_HEIGHT} 
      width={ELLIPSE_WIDTH} 
      style={{ 
        position: 'absolute', 
        top: -72, 
        left,
        pointerEvents: 'none' // This makes the SVG click-through
      }}
    >
      <Defs>
        <ClipPath id="clip">
          {/* Start the rect from the middle of the ellipse to hide the top 50% */}
          <Rect x="0" y={ELLIPSE_HEIGHT / 2} width={ELLIPSE_WIDTH} height={ELLIPSE_HEIGHT / 2} />
        </ClipPath>
      </Defs>
      <Path
        d="M136 52C90.8 52 100.6 104 62 104C23.4 104 29.2 52 0 52C0 23.2223 29.6288 0 62 0C94.3712 0 136 23.2223 136 52Z"
        fill="#EFEFEF"
        clipPath="url(#clip)" // Apply the clipping path
      />
    </Svg>
  );
};

export default EllipseBackground;
