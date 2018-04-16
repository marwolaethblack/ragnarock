import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class BandSetUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            bandName: "",
            members: [""]
        }
    }

    memberChangeHandler = (e, index) => {
        let values = [...this.state.members];
        values[index] = e.target.value;
        this.setState({
           members: [...values]
        })
    }

    addMemberHandler = () => {
        this.setState({
            members: [...this.state.members, ""]
        })
    }

    

    render() {
        const styles = {
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }
        return(
            <div style={styles}>
                <h2>Band Name</h2>
                <input id="bandname" type="text" value={this.state.bandName} onChange={e => this.setState({
                    bandName: e.target.value
                })} />
                <h2>Members</h2>
                {this.state.members.map((member,i) => (
                    <input key={i} type="text" value={member} onChange={(e) => {this.memberChangeHandler(e, i)}} />
                ))}
                <button onClick={this.addMemberHandler}>Add member</button>
                <Link to={
                    {
                        pathname: "/",
                        state: {
                            ...this.state
                        }
                    }
                }
                >Next</Link>
            </div>
        )
    }
        
}

export default BandSetUp;