const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarFileChooser = document.querySelector('.ad-form-header__upload input[type="file"]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fotoFileChooser = document.querySelector('.ad-form__photo-container input[type="file"]');
const previewFoto = document.querySelector('.ad-form__photo');

const loadAvatar = () => {
  avatarFileChooser.addEventListener('change', () => {
    const file = avatarFileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      previewAvatar.src = URL.createObjectURL(file);
    }
  });
};

const loadFoto = () => {
  fotoFileChooser.addEventListener('change', () => {
    const file = fotoFileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const previewFotoImg = document.createElement('img');
      previewFotoImg.src = URL.createObjectURL(file);
      previewFoto.appendChild(previewFotoImg);
    }
  });
};

export {loadAvatar,loadFoto};
