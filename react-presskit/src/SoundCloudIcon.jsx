const SoundCloudIcon = ({ src }) => {
  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%',
      filter: 'brightness(0) saturate(100%) invert(26%) sepia(99%) saturate(4788%) hue-rotate(302deg) brightness(102%) contrast(101%)'
    }}>
      <img
        src={src}
        alt="SoundCloud"
        aria-hidden="true"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block'
        }}
      />
    </div>
  );
};

export default SoundCloudIcon;

