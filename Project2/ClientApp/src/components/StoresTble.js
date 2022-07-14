import React from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Button, Modal } from "semantic-ui-react";

export default class StoresTble extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stores: [],
            StoreName: "",
            StoreAddress: "",
            StoreId: 0,
            offset: 0,
            data: [],
            perPage: 3,
            currentPage: 0,
            openModal: false,
            openMod: false,
            modalTitle: "",
            postData: [],
            loading: true
        };
    }

    refreshList() {
        axios
            .get("https://onboardtaskaaron.azurewebsites.net/api/stores")
            .then((res) => {
                const data = res.data;
                const slice = data.slice(
                    this.state.offset,
                    this.state.offset + this.state.perPage
                );
                const postData = slice.map((str) => (
                    <React.Fragment>
                        <tr key={str.StoreId}>
                            <td>{str.StoreId}</td>
                            <td>{str.StoreName}</td>
                            <td>{str.StoreAddress}</td>
                            <td>
                                <Button
                                    className="ui yellow"
                                    type="button"
                                    onClick={() => this.editClick(str)}
                                >
                                    <i className="pencil alternate icon"></i>
                                    EDIT
                                </Button>

                                <Button
                                    className="negative"
                                    type="button"
                                    onClick={() => this.deleteC(str)}
                                >
                                    <i className="trash alternate icon"></i>
                                    DELETE
                                </Button>
                            </td>
                        </tr>
                    </React.Fragment>
                ));
                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    postData, loading: false
                });
            });
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState(
            {
                currentPage: selectedPage,
                offset: offset,
            },
            () => {
                this.refreshList();
            }
        );
    };

    componentDidMount() {
        this.refreshList();
    }

    changeStoreName = (e) => {
        this.setState({ StoreName: e.target.value });
    };

    changeStoreAddress = (e) => {
        this.setState({ StoreAddress: e.target.value });
    };

    addClick() {
        this.setState({
            modalTitle: "Create Store",
            StoreName: "",
            StoreAddress: "",
            StoreId: 0,
            openmodal: true,
        });
    }

    updateClick() {
        this.setState({
            openmodal: false,
        });
        axios
            .put("https://onboardtaskaaron.azurewebsites.net/api/stores", {
                StoreId: this.state.StoreId,
                StoreName: this.state.StoreName,
                StoreAddress: this.state.StoreAddress,
            })
            .then((res) => res.data)
            .then((res) => {
                this.refreshList();
            });
    }

    deleteClick(id) {
        this.setState({
            openMod: false,
        });
        axios
            .delete(
                "https://onboardtaskaaron.azurewebsites.net/api/stores/" + id
            )
            .then((res) => res.data)
            .then((res) => {
                this.refreshList();
            });
    }

    deleteC(str) {
        this.setState({
            modalTitle: "Delete Store",
            StoreId: str.StoreId,
            StoreName: str.StoreName,
            StoreAddress: str.StoreAddress,
            openMod: true,
        });
    }

    editClick(str) {
        this.setState({
            modalTitle: "Edit Store",
            StoreId: str.StoreId,
            StoreName: str.StoreName,
            StoreAddress: str.StoreAddress,
            openmodal: true,
        });
    }

    deleteModal = () => {
        this.setState({
            openMod: false,
        });
    };

    showModal = () => {
        this.setState({
            openmodal: false,
        });
    };

    createClick() {
        this.setState({
            openmodal: false,
        });
        axios
            .post(
                "https://onboardtaskaaron.azurewebsites.net/api/stores",
                {
                    StoreName: this.state.StoreName,
                    StoreAddress: this.state.StoreAddress,
                }
            )
            .then((res) => res.data)
            .then((res) => {
                this.refreshList();
            });
    }

    render() {
        const {
            StoreName,
            StoreAddress,
            StoreId,
            currentPage,
            pageCount,
            openmodal,
            openMod,
            modalTitle,
            loading
        } = this.state;

        let contents = this.state.loading ? <p className="loading--msg"><em>loading...</em></p>
            : this.state.postData;

        return (
            <div>
                <Modal onClose={this.deleteModal} open={openMod}>
                    <Modal.Header>Delete Store</Modal.Header>
                    <Modal.Content>
                        <div>
                            <p>Are you sure you want to remove "{StoreName}"</p>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button type="button" color="black" onClick={this.deleteModal}>
                            Cancel
                        </Button>

                        {this.StoreId != 0 ? (
                            <Button
                                type="button"
                                negative
                                onClick={() => this.deleteClick(StoreId)}
                            >
                                Delete
                            </Button>
                        ) : null}
                    </Modal.Actions>
                </Modal>

                <Modal
                    onClose={this.showModal}
                    open={openmodal}
                    trigger={
                        <Button primary onClick={() => this.addClick()}>
                            <i className="plus circle icon"></i>
                            Add Store
                        </Button>
                    }
                >
                    <Modal.Header>{modalTitle}</Modal.Header>
                    <Modal.Content>
                        <div className="">
                            <span>Name</span>
                            <input
                                type="text"
                                className="form-control"
                                value={StoreName}
                                onChange={this.changeStoreName}
                            />
                        </div>
                        <div className="mt-3">
                            <span>Address</span>
                            <input
                                type="text"
                                className="form-control"
                                value={StoreAddress}
                                onChange={this.changeStoreAddress}
                            />
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button type="button" color="black" onClick={this.showModal}>
                            Cancel
                        </Button>
                        {StoreId == 0 ? (
                            <Button type="button" positive onClick={() => this.createClick()}>
                                Create
                            </Button>
                        ) : null}

                        {StoreId != 0 ? (
                            <Button type="button" positive onClick={() => this.updateClick()}>
                                Update
                            </Button>
                        ) : null}
                    </Modal.Actions>
                </Modal>
                <div className="table--div">
                    <p>
                        <em>Showing 3 data / page</em>
                    </p>
                    <table className="ui celled striped table">
                        <thead>
                            <tr>
                                <th>Store ID</th>
                                <th>Store Name</th>
                                <th>Store Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>{contents}</tbody>
                    </table>
                </div>

                <div className="pagination--style">
                    <p className="float-start ml-3">
                        <em>
                            Page {currentPage + 1} of {pageCount}
                        </em>
                    </p>{" "}
                    <ReactPaginate
                        previousLabel={"<<"}
                        nextLabel={">>"}
                        breakLabel="..."
                        pageCount={this.state.pageCount}
                        pageRangeDisplayed={2}
                        onPageChange={this.handlePageClick}
                        renderOnZeroPageCount={null}
                        subContainerClassName="pages pagination"
                        activeClassName="active"
                        containerClassName="pagination d-flex justify-content-end align-items-center"
                        pageLinkClassName="btn btn-outline-primary page-num m-2"
                        previousLinkClassName="page-num"
                        nextLinkClassName="page-num mr-3"
                        activeLinkClassName="active"
                    />
                </div>
            </div>
        );
    }
}
