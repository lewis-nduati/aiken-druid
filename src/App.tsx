import { useEffect, useState } from 'react'
import druidLogo from '/images/logo.svg'
import './App.css'
import { processScripts } from './utils/processScripts'
import ModuleSelector from './components/ModuleSelector'
import { DruidScripts } from './utils/types'
import ScriptSelector from './components/ScriptSelector'

function App() {
  const [druidScripts, setDruidScripts] = useState<DruidScripts | null>(null)
  const [chosenModule, setChosenModule] = useState<string | null>(null)
  const [chosenScript, setChosenScript] = useState<string | null>(null)
  const availableScripts = druidScripts && chosenModule ? Object.keys(druidScripts[chosenModule]) : null
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
    fetchData() // Call the async function inside useEffect
  }, [])

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
            </div>
            <div className="column args">
              <h2 className="args-title">
                <span className="symbol">
                  x.
                </span>
                args
              </h2>
              {druidScripts && chosenModule && chosenScript && (
                <p>{JSON.stringify(druidScripts[chosenModule][chosenScript])}</p>
              )}
            </div>
          </section>
          <section className="craft">
            <button className="accent1">⚚ craft artifacts ⚚</button>
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
