# 📚 Guía de Mejores Prácticas - WindyMarket

## 🎯 Convenciones del Proyecto

### Estructura de Archivos
```
windymarketnextFront-master/
├── app/              # Rutas de Next.js 13+ (App Router)
├── components/       # Componentes reutilizables
├── hooks/           # Custom hooks ⭐ NUEVO
├── helpers/         # Funciones de utilidad
├── reduxLib/        # Estado global (Redux Toolkit)
├── config/          # Configuraciones
└── public/          # Assets estáticos
```

### Naming Conventions

#### Componentes
```javascript
// ✅ PascalCase para componentes
const ProductoCard = () => { ... }
export default ProductoCard;

// ✅ camelCase para instancias y funciones
const handleClick = () => { ... }
const userData = { ... }
```

#### Custom Hooks
```javascript
// ✅ Prefijo 'use' + nombre descriptivo
export const useProductDetails = (id) => { ... }
export const useAuth = () => { ... }
```

#### Redux
```javascript
// ✅ Slice names en camelCase
const productSlice = createSlice({ name: 'products', ... })

// ✅ Action creators en camelCase descriptivo
export const obtenerProductos = createAsyncThunk(...)
export const actualizarUsuario = createAsyncThunk(...)
```

## 🔧 Patrones de Código

### 1. Custom Hooks para Lógica Compleja

**❌ Evitar:**
```javascript
const MiComponente = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // 50 líneas de lógica...
  }, []);
  
  const handleSubmit = () => {
    // 30 líneas más...
  }
  
  // UI en las líneas 100-200
}
```

**✅ Preferir:**
```javascript
// hooks/useProductForm.js
export const useProductForm = () => {
  // Toda la lógica aquí
  return { loading, error, handleSubmit }
}

// Componente limpio
const MiComponente = () => {
  const { loading, error, handleSubmit } = useProductForm();
  return ( /* Solo UI aquí */ )
}
```

### 2. Memoización Estratégica

**❌ No hacer:**
```javascript
// Memoizar todo innecesariamente
const ComponentePequeño = memo(() => <div>Hola</div>)
```

**✅ Memoizar cuando:**
- El componente renderiza listas grandes
- Recibe props complejas (objetos, arrays)
- Tiene lógica de cálculo costosa

```javascript
// ✅ Componente que renderiza lista
const ListaProductos = memo(({ productos }) => {
  return productos.map(p => <Producto key={p.id} {...p} />)
})

// ✅ Con callback costoso
const Producto = memo(({ data, onUpdate }) => {
  const precioFormateado = useMemo(() => {
    return calcularPrecioConDescuento(data.precio)
  }, [data.precio])
  
  return <div>{precioFormateado}</div>
})
```

### 3. Manejo de Errores

**❌ Evitar:**
```javascript
try {
  await fetch(...)
} catch (err) {
  console.log(err) // ❌
}
```

**✅ Preferir:**
```javascript
try {
  await fetch(...)
} catch (err) {
  // Opción 1: Redux
  dispatch(setError(err.message))
  
  // Opción 2: SweetAlert para usuario
  Swal.fire('Error', err.message, 'error')
  
  // Opción 3: Error boundary
  throw err
}
```

### 4. useEffect Dependencies

**❌ Evitar:**
```javascript
useEffect(() => {
  cargarDatos()
}, []) // ⚠️ ESLint warning si cargarDatos usa props/state
```

**✅ Preferir:**
```javascript
const cargarDatos = useCallback(() => {
  // lógica
}, [dependencias])

useEffect(() => {
  cargarDatos()
}, [cargarDatos]) // ✅ Todas las dependencias incluidas
```

### 5. Selectores de Redux

**❌ Evitar:**
```javascript
const Component = () => {
  if (condicion) {
    const data = useSelector(state => state.data) // ❌ Hook condicional
  }
}
```

**✅ Preferir:**
```javascript
const Component = () => {
  const data = useSelector(state => state.data) // ✅ Siempre llamar hooks
  
  if (!condicion) return null
  return <div>{data}</div>
}
```

### 6. Optimización de Imágenes

**❌ Evitar:**
```javascript
<img src={url} alt="..." /> // ❌ Sin optimización
```

**✅ Preferir:**
```javascript
import Image from 'next/image'
import { getOptimizedCloudinaryUrl } from '@/helpers/imageOptimization'

// Opción 1: Next/Image
<Image 
  src={url} 
  alt="..." 
  width={800} 
  height={600}
  loading="lazy"
/>

// Opción 2: Con helper
<Image
  src={getOptimizedCloudinaryUrl(url, { width: 800, quality: 'auto' })}
  alt="..."
  width={800}
  height={600}
/>
```

## 🚀 Performance

### Code Splitting
```javascript
// ✅ Lazy load componentes pesados
import dynamic from 'next/dynamic'

const ModalPesado = dynamic(() => import('@/components/ModalPesado'), {
  loading: () => <Spinner />,
  ssr: false // Si no necesita SSR
})
```

### Bundle Analysis
```bash
# Analizar tamaño del bundle
npm run build
npm run analyze # (añadir script si no existe)
```

### Evitar Re-renders
```javascript
// ✅ Extraer callbacks
const handleClick = useCallback(() => {
  // lógica
}, [deps])

// ✅ Memoizar objetos/arrays
const config = useMemo(() => ({
  opcion1: true,
  opcion2: false
}), [])

// ✅ Pasar solo lo necesario
<Hijo dato={producto.nombre} /> // ✅
<Hijo producto={producto} />     // ⚠️ Re-render si cualquier campo cambia
```

## 🔐 Seguridad

### Variables de Entorno
```javascript
// ✅ Prefijo NEXT_PUBLIC_ para cliente
NEXT_PUBLIC_API_URL=...

// ✅ Sin prefijo para servidor
DATABASE_URL=...
SECRET_KEY=...
```

### Validación
```javascript
// ✅ Validar datos antes de usar
if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('API_URL no configurada')
}
```

## 📝 Documentación

### JSDoc para Funciones
```javascript
/**
 * Calcula el precio con descuento
 * @param {number} precio - Precio original
 * @param {number} descuento - Porcentaje de descuento (0-100)
 * @returns {number} Precio final
 */
export const calcularDescuento = (precio, descuento) => {
  return precio * (1 - descuento / 100)
}
```

### Comentarios Útiles
```javascript
// ✅ Explica el "por qué", no el "qué"
// Necesitamos debounce porque la API tiene rate limit de 10 req/seg
const debouncedSearch = useDebouncedCallback(search, 500)

// ❌ Comentarios obvios
// Crea un usuario nuevo
const crearUsuario = () => { ... }
```

## 🧪 Testing (Para implementar)

### Estructura Sugerida
```javascript
// __tests__/components/Producto.test.jsx
import { render, screen } from '@testing-library/react'
import Producto from '@/components/Producto'

describe('Producto', () => {
  it('renderiza el nombre del producto', () => {
    render(<Producto nombre="Vela" precio={100} />)
    expect(screen.getByText('Vela')).toBeInTheDocument()
  })
})
```

## 🎨 Estilo de Código

### Orden de Imports
```javascript
// 1. Externos
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

// 2. Internos (absolute imports)
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/Button'

// 3. Relativos
import styles from './styles.module.css'
import { helper } from '../utils'
```

### Orden dentro del Componente
```javascript
const MiComponente = ({ props }) => {
  // 1. Hooks de estado
  const [state, setState] = useState()
  
  // 2. Hooks de contexto/redux
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)
  
  // 3. Custom hooks
  const { loading, error } = useCustomHook()
  
  // 4. useEffect
  useEffect(() => { ... }, [])
  
  // 5. Funciones y handlers
  const handleClick = () => { ... }
  
  // 6. Renders condicionales tempranos
  if (loading) return <Spinner />
  if (error) return <Error />
  
  // 7. JSX principal
  return ( ... )
}
```

## 🔄 Git Workflow

### Commits
```bash
# ✅ Mensajes descriptivos
git commit -m "feat: agregar custom hook useProductDetails"
git commit -m "fix: corregir infinite loop en Navigation"
git commit -m "refactor: optimizar importaciones de lodash"
git commit -m "perf: agregar React.memo a ListaProductos"

# Prefijos comunes
# feat: nueva funcionalidad
# fix: corrección de bug
# refactor: cambio de código sin cambiar funcionalidad
# perf: mejora de performance
# docs: cambios en documentación
# style: formateo, espacios, etc
# test: agregar o modificar tests
```

## 🎯 Checklist Antes de Commit

- [ ] No hay `console.log` en el código
- [ ] No hay errores de ESLint
- [ ] Las dependencias de useEffect están completas
- [ ] Los componentes tienen PropTypes o TypeScript types
- [ ] Las imágenes usan Next/Image cuando es posible
- [ ] El código está formateado (Prettier)
- [ ] No hay imports no utilizados
- [ ] Las funciones tienen nombres descriptivos

## 📚 Recursos Recomendados

- [Next.js Docs](https://nextjs.org/docs)
- [React Hooks](https://react.dev/reference/react)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Performance](https://react.dev/learn/render-and-commit)

---

**Mantener esta guía actualizada es responsabilidad de todo el equipo** 🤝
