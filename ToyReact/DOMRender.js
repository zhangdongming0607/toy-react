import instantiateComponent from './instantiateComponent'

const render = (element, node) => {
    mount(element, node)
}

const mount = (element, node) => {
    const componentInstance = instantiateComponent(element)
    const renderedComponent = componentInstance.renderComponent()

    //todo: children 怎么办
    node.appendChild(renderedComponent)
}

export default render