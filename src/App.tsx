import { SortableList } from './sortable-list'

function App() {
	const text = new URLSearchParams(window.location.search).get('text') ?? ''
	return (
		<div className="sortable-list">
			<SortableList initItems={text.split('\n')} />
		</div>
	)
}

export default App
