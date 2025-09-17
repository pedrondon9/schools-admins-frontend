
/**
 * Contexto de React para la aplicación.
 * 
 * Este contexto se utiliza para compartir datos globales
 * en toda la aplicación sin necesidad de pasar props manualmente
 * a través de cada nivel del árbol de componentes.
 * 
 * @module AppContext
 * @type {React.Context}
 */
import { createContext } from 'react';

const AppContext = createContext();

export default AppContext;
