import instantiateComponent from './instantiateComponent'

class Component {
    constructor(element) {
        this._currentElement = element
        // 不好说这么写会不会有问题
        this.props = element.props
        // this.props = 
        // console.log(props)
        // debugger
    }

    construct(element) {
        this._currentElement
    }

    renderComponent() {
        const renderedElemnt = this.render()
        this._renderedInstance = instantiateComponent(renderedElemnt)
        this._renderedNode = this._renderedInstance.renderComponent()
        
        return this._renderedNode
    }
    
}

export default Component