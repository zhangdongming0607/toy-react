import Component from './Component'

// jsx to element
const createElement = (type, props, ...children) => {
    props = Object.assign({}, props)
    props.children = children
    return {
        type,
        props
    }
};

export default createElement;
