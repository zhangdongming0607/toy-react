import Component from './Component'

const createElement = (type, props, ...children) => {
    props = Object.assign({}, props)
    props.children = children
    return {
        type,
        props
    }
};

export default createElement;
