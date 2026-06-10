import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import Historia from '@/components/Historia/Historia'
import ProductosDestacados from '@/components/Productos/ProductosDestacados'
import Experiencia from '@/components/Experiencia/Experiencia'
import Recetas from '@/components/Recetas/Recetas'
import Testimonios from '@/components/Testimonios/Testimonios'
import Distribuidores from '@/components/Distribuidores/Distribuidores'
import Contacto from '@/components/Contacto/Contacto'
import Responsabilidad from '@/components/Responsabilidad/Responsabilidad'
import Footer from '@/components/Footer/Footer'
import Cart from '@/components/Cart/Cart'

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Historia />
        <ProductosDestacados />
        <Experiencia />
        <Recetas />
        <Testimonios />
        <Distribuidores />
        <Contacto />
        <Responsabilidad />
      </main>
      <Footer />
      <Cart />
    </>
  )
}
