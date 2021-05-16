import '../css/funciones.css';

export const saludar = (nombre = 'Sin nombre') => {
  console.log('Creando elemento H1');
  const h1 = document.createElement('h1');
  h1.innerText = `Hola ${nombre}, cómo estás?`;

  document.body.append(h1);
}