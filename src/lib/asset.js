/** Ruta a un archivo de la carpeta public/, respetando la base del sitio */
export const asset = (file) => `${import.meta.env.BASE_URL}${file}`;
