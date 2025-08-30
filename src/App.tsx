import './App.css'
import { ContentBox } from './components/ContentBox/ContentBox'
import { Header } from './components/Header/Header'

export const App: React.FC = () => {
    return (
        <div>
            <Header/>
            <ContentBox/>
        </div>
    )
}

export default App
