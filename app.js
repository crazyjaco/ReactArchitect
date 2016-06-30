import React, { Component } from 'react'
import { render } from 'react-dom'
import JSONTree from 'react-json-tree'
import TreeView from './components/react-treeview.js'
import { default as dataSource } from '../dist/mainArchitecture'

console.log('data1: ', dataSource)

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			collapsedBookkeeping: dataSource.map(() => false)
		}
		this.handleClick = this.handleClick.bind(this)
		this.collapseAll = this.collapseAll.bind(this)

	}


	printData() {
		console.log('data', dataSource)
		return dataSource
	}

				// <JSONTree data={this.printData()} />
				// <br/><br/>
				// <hr>
				// <br/><br/>
				// <TreeView/>
				
	// A controlled TreeView, akin to React's controlled inputs
	// (http://facebook.github.io/react/docs/forms.html#controlled-components), has
	// many benefits. Among others, you can expand/collapse everything (i.e. easily
	// trigger those somewhere else).

	handleClick(i) {
		let [...collapsedBookkeeping] = this.state.collapsedBookkeeping;
		collapsedBookkeeping[i] = !collapsedBookkeeping[i];
		this.setState({collapsedBookkeeping: collapsedBookkeeping});
	}

	collapseAll() {
		this.setState({
		  collapsedBookkeeping: this.state.collapsedBookkeeping.map(() => true),
		});
	}

	render() {
		const collapsedBookkeeping = this.state.collapsedBookkeeping;
		
		let traverseDataSource = ( dataSource ) => {
			return dataSource.map(( module, i ) => {
				//let children = traverseDataSource( module.deps )
				const label =
		        	<span className="node" onClick={this.handleClick.bind(null, i)}>
		        	  {module.request}
		        	</span>;
				return (
			        <TreeView
			          key={module.id}
			          nodeLabel={label}
			          collapsed={collapsedBookkeeping[i]}
			          onClick={this.handleClick.bind(null, i)}>
			          {<div className="info" key={module.id}></div>}
			          { undefined !== module.deps ? traverseDataSource( module.deps ) : '' }
			        </TreeView>
				)
			})
		}


		return (
		  <div>
		    <button onClick={this.collapseAll}>Collapse all</button>
		    { traverseDataSource(dataSource) }
		  </div>
		);
	}

	// render() {
	// 	return (
	// 		<div id="app-wrapper">
	// 			<TreeView collapsed={false} >
	// 			</TreeView>

	// 		</div>
	// 	)
	// }
}
