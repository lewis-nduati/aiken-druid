import { useEffect, useState } from 'react'
import druidLogo from '/images/logo.svg'
import './App.css'
import { processScripts } from './utils/processScripts'
import ModuleSelector from './components/ModuleSelector'
import ScriptSelector from './components/ScriptSelector'
import { ArgsForm } from './components/ArgsForm'
import { DruidScript, DruidScripts } from './types/script'
import { ScriptExport } from './components/ScriptExport'

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await processScripts('../plutus.json')
        if (response) {
          setDruidScripts(response)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])
  const [druidScripts, setDruidScripts] = useState<DruidScripts | null>(null)
  const [chosenModule, setChosenModule] = useState<string | null>(null)
  const [chosenScript, setChosenScript] = useState<string | null>(null)
  const [scriptContents, setScriptContents] = useState<DruidScript | null>(null)

  useEffect(() => {
    if (druidScripts && chosenModule && chosenScript) {
      setScriptContents(druidScripts[chosenModule][chosenScript])
      console.log("script contents changed!")
    }
  }, [druidScripts, chosenModule, chosenScript])


  const availableScripts = druidScripts && chosenModule ? Object.keys(druidScripts[chosenModule]) : null

  return (
    <>
      <div className="trunk">
        <header className="">
          <img src={druidLogo} className="logo" alt="the Druid logo: a rugged forest dweller with his bear familiar" />
          <h1 className="logo-text">
            <span className="leaf">🌿</span>
            <span className="accent1">a</span><span className="accent2">k</span>Druid</h1>
        </header>
        <main className="crafter">
          <section>
            <div className="column lambda">
              <h2 className="lambda-title">
                <span className="symbol">
                  λ.
                </span>
                script
              </h2>
              {druidScripts && (
                <ModuleSelector modules={Object.keys(druidScripts)} onSelect={(module) => setChosenModule(module)} />
              )}
              {chosenModule && availableScripts && (
                <ScriptSelector scripts={availableScripts} onSelect={(script) => setChosenScript(script)} />
              )
              }
              {scriptContents && (
                <ScriptExport druidScript={scriptContents} key={`${scriptContents.uuid}_params`} />
              )}
            </div>
            <div className="column args">
              <h2 className="args-title">
                <span className="symbol">
                  x.
                </span>
                args
              </h2>
              {scriptContents && (
                <ArgsForm key={scriptContents.uuid} druidScript={scriptContents} />)}
            </div>
          </section>
        </main>
        <footer className="footer">
          © 2024 &mdash; ajnabi workshop
        </footer>
      </div>
    </>
  )
}

export default App
