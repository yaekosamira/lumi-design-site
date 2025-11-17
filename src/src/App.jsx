/*
Lumi Design — Starter 3D site (single-file React component)

Instruções rápidas:
- Dependências (instalar no projeto):
  npm install react react-dom tailwindcss @react-three/fiber @react-three/drei framer-motion

- Como rodar:
  1) Crie um projeto Vite/Next/Create React App e configure Tailwind.
  2) Cole este componente em src/App.jsx (ou pages/index.jsx no Next).
  3) Rode yarn dev / npm run dev.

- Notas sobre Blackbox:
  • Se o builder "Blackbox" permitir custom React, importe esse componente. 
  • Se não, você pode exportar a cena 3D como canvas isolado e embutir via iframe ou gerar vídeos/WebGL build.

O componente abaixo é um ponto de partida: hero 3D interativo (react-three-fiber), menu fixo, seções de produtos e contato.
Substitua imagens, textos e modelos 3D por seus ativos.
*/

import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, softShadows } from '@react-three/drei'
import { motion } from 'framer-motion'

softShadows()

function RotatingProduct() {
  const ref = useRef()
  useFrame((state, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.35 })
  return (
    <group ref={ref} position={[0, -0.6, 0]}>
      {/* Melhor placeholder: caixa estilizada que lembra um móvel; troque por GLB/GLTF quando disponível */}
      <mesh rotation={[0.15, 0.3, 0]} position={[0,0,0]}>
        <boxGeometry args={[1.6, 0.6, 0.9]} />
        <meshStandardMaterial metalness={0.3} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[1.3, 0.12, 0.7]} />
        <meshStandardMaterial metalness={0.1} roughness={0.6} />
      </mesh>
      {/* Nota: para usar GLTF, importe useLoader and GLTFLoader e renderize o modelo aqui */}
    </group>
  )
}

export default function Lumi3DSite() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9B4A21] to-[#3F1F14] text-gray-800 font-sans">
      {/* NAV */}
      <header className="fixed top-4 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-3">
              <img src="/logo-lumi.png" alt="Lumi Design" className="w-14 h-14 object-contain" />
              <div className="hidden md:block font-medium text-white">Lumi Design</div>
            </motion.div>
          </div>
          <nav className="hidden md:flex gap-6 items-center text-sm">
            <a href="#colecoes" className="hover:underline">Coleções</a>
            <a href="#sobre" className="hover:underline">Sobre</a>
            <a href="#contato" className="btn-primary px-4 py-2 rounded-full">Contato</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <main>
        <section className="relative pt-28 pb-14">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-extrabold leading-tight"
              >
                Móveis e design com alma —
                <span className="text-[#9B4A21]"> inovação 3D</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-4 text-gray-600 max-w-xl"
              >
                Experimente uma vitrine imersiva: produtos apresentados em cenas 3D, transições suaves e navegação que encanta.
              </motion.p>
              <div className="mt-8 flex gap-4">
                <a href="#colecoes" className="px-5 py-3 rounded-full bg-[#3F1F14] text-white text-sm">Ver Coleções</a>
                <a href="#contato" className="px-5 py-3 rounded-full border border-gray-300 text-sm">Fale com a gente</a>
              </div>
              <div className="mt-6 text-xs text-gray-400">Dica: use o site em desktop para melhor experiência 3D.</div>
            </div>

            <div className="w-full h-96 rounded-2xl shadow-xl overflow-hidden bg-white">
              <Canvas camera={{ position: [0, 0, 3.2], fov: 35 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={0.9} />
                <Suspense fallback={<Html center>Carregando cena...</Html>}>
                  <RotatingProduct />
                </Suspense>
                <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
              </Canvas>
            </div>
          </div>
        </section>

        {/* COLEÇÕES */}
        <section id="colecoes" className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold">Coleções</h2>
            <p className="text-gray-600 mt-2">Apresente suas coleções com cenas 3D ou imagens em alta qualidade.</p>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <article key={i} className="rounded-xl p-6 shadow-sm border bg-gray-50">
                  <div className="h-44 bg-white rounded-lg flex items-center justify-center">Imagem / Cena {i}</div>
                  <h3 className="mt-4 font-semibold">Coleção {i}</h3>
                  <p className="text-sm text-gray-500 mt-2">Descrição curta da coleção com destaque para materiais e acabamento.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="py-16">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold">Sobre a Lumi</h2>
              <p className="text-gray-600 mt-3">12 anos de mercado — design autoral e produção cuidadosa. Use este espaço para contar a história e o processo criativo.</p>
              <ul className="mt-4 text-gray-600 list-disc list-inside">
                <li>Design sob medida</li>
                <li>Materiais sustentáveis</li>
                <li>Atendimento corporativo e projetos</li>
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden h-64 bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center">
              <div className="text-center text-sm text-gray-600">Vídeo curto / timelapse do ateliê</div>
            </div>
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato" className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-bold">Contato</h2>
            <p className="text-gray-600 mt-2">Solicite orçamento ou agende uma visita ao showroom.</p>

            <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="p-3 rounded border" placeholder="Nome" />
              <input className="p-3 rounded border" placeholder="Email" />
              <input className="p-3 rounded border col-span-1 md:col-span-2" placeholder="Assunto" />
              <textarea className="p-3 rounded border col-span-1 md:col-span-2" placeholder="Mensagem" rows={4} />
              <button className="col-span-1 md:col-span-2 px-5 py-3 bg-[#3F1F14] text-white rounded">Enviar</button>
            </form>
          </div>
        </section>

        <footer className="py-8 text-center text-sm text-gray-500 flex flex-col items-center gap-3">
  <img src="/logo-lumi.png" alt="Lumi Design" className="w-16 h-16 object-contain opacity-80" />
  © {new Date().getFullYear()} Lumi Design — Todos os direitos reservados
</footer>
      </main>

      <style jsx>{`
        /* Pequenas classes utilitárias caso Tailwind não esteja disponível */
        .btn-primary { background: #3F1F14; color: white; }
      `}</style>
    </div>
  )
}
