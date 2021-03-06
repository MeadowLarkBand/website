import React, {Component} from 'react';
import ImageMapper from 'react-image-mapper';
import Map from './map';
import { Redirect } from 'react-router';



class ImageSelector extends Component{

	constructor(props){
		super(props);
		this.logStr = " "
		this.MAP = new Map();
		this.MAP.createTextMap()
		//React-image-mapper package functions
		this.clicked = this.clicked.bind(this);
		this.load = this.load.bind(this);
		this.moveOnArea = this.moveOnArea.bind(this);
		this.enterArea = this.enterArea.bind(this);
		this.leaveArea = this.leaveArea.bind(this);
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.state = {
			width: 0, 
			height: 0,
			screen_scale : .8,
			max_width : 500,
			url: '/harlanSiteMap.png',
			redirect: false,
			redirect_path : ""
		};
	}

	componentDidMount() {
	  this.updateWindowDimensions();
	  window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
	  window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
	  this.setState({ width: window.innerWidth, height: window.innerHeight });
	  this.MAP.scaleMap(window.innerWidth, window.innerHeight, this.state.max_width, this.state.screen_scale);
	}


	//this function handles clicking on a hotspot area
	clicked(area,i,evt) {
		console.log(this.state);
		evt.preventDefault();
		this.setState({
			redirect_path : area['url'],
			redirect : true
		});
	}

	load() {
		this.setState({})
	}

	enterArea(area) {
		this.MAP.makeTextOnMapVisible(area.id)
		this.MAP.createTextMap()
		this.setState({hoveredArea: area})
	}

	leaveArea(area){
		this.MAP.makeTextOnMapVisible(-1, true)
		this.MAP.createTextMap()
		this.setState({hoveredArea: undefined})

	}

	moveOnArea(area) {
		//this.MAP.makeTextOnMapVisible(area.id)
		//this.MAP.createTextMap()
		//this.setState({hoveredArea: area})
		
	}

	/*Good dev function but don't need at present*/ 
	/*
	clickedOutside(evt) {
		//Add new hotspot to map
		
		this.logStr =  this.logStr + ',' + evt.nativeEvent.layerX.toString() + ',' + evt.nativeEvent.layerY.toString()
		console.log(this.logStr)
		this.MAP.addAreaToMap([evt.nativeEvent.layerX, evt.nativeEvent.layerY])
		//create the text map
		this.MAP.createTextMap()
		this.setState({});
	}
	*/




	/*
	This is based off of the react-image-mapper example
	app which can be found at the below two urls:
	https://coldiary.github.io/react-image-mapper/
	https://github.com/coldiary/react-image-mapper
	*/
	render() {
		if (this.state.redirect) {
			//window.location.assign("https://meadowlarkband.github.io/website/");
			window.location.assign(this.state.redirect_path);
  		}
		return (
			<div className="grid"
			onContextMenu={(e)=> e.preventDefault()}>
				<div className="presenter">
					<div id = "imageMapper" style={{ position: "relative"}}>
						<ImageMapper	
							src={'harlanSiteMap.png'}
							map={this.MAP.getMap()}
							width={Math.min((this.state.width * this.state.screen_scale),this.state.max_width)}
							onLoad={() => this.load()}
							onClick={(area,i,e) => this.clicked(area,i,e)}
							onMouseEnter={area => this.enterArea(area)}
							onMouseLeave={area => this.leaveArea(area)}
							onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
							lineWidth={4}
							strokeColor={"white"}
						></ImageMapper>
						{/* this is where the text map is drawn */}
				        {this.MAP.getTextMap().map(function(d, idx){
					           return (
					           	d
					           	);
				       	 })
				        }
			        </div>
				</div>
			</div>
		);
	}
}

export default ImageSelector;