import React, { Component } from 'react';
import axios from 'axios';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersList: [],
            page: 0,
            limit: 8,
            selectedUSer: {}
        }
    }

    componentDidMount() {
        this.getInitList()
    }

    getInitList() {
        let me = this, { usersList, apiLoading, page, limit } = me.state;
        if (apiLoading) {
            return
        }
        page = page + limit;
        me.setState({ apiLoading: true, page });
        axios.get(`https://randomuser.me/api/?page=${page}&results=${limit}`)
            .then(function (response) {
                const results = (response && response.data && response.data.results) ? response.data.results : [];
                if (results && results.length) {
                    me.setState({ usersList: usersList.concat(results) })
                }
            })
            .catch(function (error) {
                console.log('Error ===>', error);
            })
            .then(function () {
                me.setState({ apiLoading: false });
            });
    }

    viewMore() {
        this.getInitList()
    }

    selectUser(selectedUSer) {
        this.setState({ selectedUSer });
    }

    render() {
        const me = this, { usersList, selectedUSer } = me.state;
        return (
            <div className="dashboard-continer">
                <div id="center">
                    <img src="images/Capture.JPG" alt="Girl in a jacket" />
                </div>
                <br/>
                {
                    usersList.length > 0 ?
                        <div className="users-box">
                            {
                                usersList.map((item, index) => {
                                    return (
                                        <div className="user-thumbnail" key={index} onClick={() => me.selectUser(item)}>
                                            <img src={item.picture.thumbnail} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                        null
                }
                {
                    (usersList.length > 0) &&
                    <div className="view-more" onClick={() => me.viewMore()}>
                        <span className="btn">  View More </span>
                    </div>
                }
                {
                    (selectedUSer && selectedUSer.id) &&
                    <div className="user-details">
                        <div className="viewing"> You are viewing : </div>
                        <div className="user-table">
                            <div className="name">
                                {`${selectedUSer.name.title}. ${selectedUSer.name.first} ${selectedUSer.name.last}`}
                            </div>
                            <div className="profile">
                                <div className="user-img">
                                    <img src={selectedUSer.picture.medium} />
                                </div>
                                <div className="user-info">
                                    <div className="username"> {selectedUSer.login.username} </div>
                                    <div className="address"> {`${selectedUSer.location.city}, ${selectedUSer.location.state}, ${selectedUSer.location.country}`} </div>
                                </div>
                            </div>
                            <div className="email">
                                <div className="email-text">Email</div>
                                <div className="eamil-data"> {selectedUSer.email} </div>
                            </div>
                            <div className="phone">
                                <div className="phone-text">Phone</div>
                                <div className="phone-data"> {selectedUSer.phone} </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

