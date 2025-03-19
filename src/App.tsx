import { observer } from 'mobx-react-lite';
import Sidebar from './components/Sidebar';
import Viewer from './components/Viewer';
import './styles/App.scss';

const App: React.FC = observer(() => {
	return (
		<main className='container'>
			<Sidebar />
			<Viewer />
		</main>
	);
});

export default App;
