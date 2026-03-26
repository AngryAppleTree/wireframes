import { useState } from 'react'
import { Header } from './components/Header'
import { StartPage } from './components/StartPage'
import { UploadPage } from './components/UploadPage'
import { MetadataPage, type Metadata } from './components/MetadataPage'
import { ConfirmationPage } from './components/ConfirmationPage'
import './index.css'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState<'start' | 'upload' | 'metadata' | 'confirmation'>('start')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleUploadComplete = (file: File) => {
    setUploadedFile(file)
    setCurrentPage('metadata')
  }

  const handleMetadataSubmit = (metadata: Metadata) => {
    if (!uploadedFile) {
      console.error("No file uploaded, unable to construct combined package.")
      return
    }

    // In a real application, you'd construct FormData here:
    // const formData = new FormData()
    // formData.append("file", uploadedFile)
    // formData.append("metadata", JSON.stringify(metadata))
    // await fetch('/api/upload', { method: 'POST', body: formData })

    console.log("=== Dispatched Upload Payload ===")
    console.log("File payload:", uploadedFile)
    console.log("Metadata payload:", metadata)
    console.log("=================================")

    setCurrentPage('confirmation')
  }

  return (
    <>
      <Header />
      <main className="main-content">
        <section className="content-section">
          {currentPage === 'start' && <StartPage onStart={() => setCurrentPage('upload')} />}
          {currentPage === 'upload' && <UploadPage onUploadComplete={handleUploadComplete} onBack={() => setCurrentPage('start')} onCancel={() => setCurrentPage('start')} />}
          {currentPage === 'metadata' && <MetadataPage onSubmit={handleMetadataSubmit} onBack={() => setCurrentPage('upload')} onCancel={() => setCurrentPage('start')} />}
          {currentPage === 'confirmation' && <ConfirmationPage onRestart={() => setCurrentPage('upload')} />}
        </section>
      </main>
    </>
  )
}

export default App
