const List = props => props.ordered ? <ol {...props}/> : <ul {...props}/>

List.Item = props => <li {...props}/>

export default List