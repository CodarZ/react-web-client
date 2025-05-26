import { FC } from 'react'

interface MaskProps {
  onClick: () => void
}

const Mask: FC<MaskProps> = ({ onClick }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        zIndex: 99,
      }}
      onClick={onClick}
    />
  )
}

export default Mask
