import React, { Component } from "react";
import { connect } from "react-redux";
import FeatureListActions from "../actions";
import Table from "../components/table";
import ItemSelection from "../components/selectBox";
import ItemSummary from "../components/itemSummary";
import "./CompareItems.css";

class CompareItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemsCount: [0],
      selectedOption: null,
      rowHeaders: [],
    };
  }

  componentDidMount() {
    this.props.getFeatureList();
  }

  onSelectItem = (selectedItem) => {
    const index = this.props.itemList.findIndex(
      (item) => item.value === selectedItem.value
    );
    const removeCurrentItemFromList = this.props.itemList.splice(
      index,
      index + 1
    );
    const oldItemList = this.state.selectedItemsCount;
    if (oldItemList.length <= 4) {
      oldItemList.push(removeCurrentItemFromList);
      this.props.setItemList(this.props.itemList);
    }
    const subHeaderFeatureList = [];
    this.props.featuresList.forEach((subHeader) => {
      subHeaderFeatureList.push(subHeader.title);
    });
    this.setState({
      selectedOption: { ...selectedItem },
      selectedItemsCount: oldItemList,
    });
  };

  render() {
    return (
      <>
        <label>
          {" "}
          <strong>Compare</strong>{" "}
        </label>
        <div>
          {this.state.selectedItemsCount && (
            <small>
              {this.state.selectedItemsCount.length - 1} item selected
            </small>
          )}
        </div>
        <div className="select">
          <div className="showDiffStyle">
            <div>
              <input type="checkbox" />
            </div>
            <div style={{ paddingLeft: "0.5rem" }}>Show Only Differences</div>
          </div>
          {this.state.selectedItemsCount.length === 1 ? (
            <div className="listStyling">
              <div className="dummyImageView"></div>
              <ItemSelection
                selectedOption={this.state.selectedOption}
                options={this.props.itemList}
                onSelectItem={this.onSelectItem}
              />
            </div>
          ) : this.state.selectedItemsCount &&
            this.state.selectedItemsCount.length <= 4 ? (
            this.state.selectedItemsCount.map((item, ind) => {
              if (ind < this.state.selectedItemsCount.length - 1) {
                return (
                  <div className="listStyling" key={ind}>
                    <div className="clearItem">x</div>
                    <ItemSummary
                      imageUrl={
                        this.props.compareSummary.images[
                          this.state.selectedItemsCount[ind + 1][0].value
                        ]
                      }
                      price={
                        this.props.compareSummary.productPricingSummary[
                          this.state.selectedItemsCount[ind + 1][0].value
                        ]
                      }
                      productName={
                        this.props.compareSummary.titles[
                          this.state.selectedItemsCount[ind + 1][0].value
                        ].title
                      }
                    />
                  </div>
                );
              } else {
                return (
                  <div className="listStyling" key={ind}>
                    <div className="dummyImageView"></div>
                    <ItemSelection
                      selectedOption={item.label}
                      options={this.props.itemList}
                      onSelectItem={this.onSelectItem}
                    />
                  </div>
                );
              }
            })
          ) : (
            this.state.selectedItemsCount.map((item, ind) => {
              if (ind < this.state.selectedItemsCount.length - 1) {
                return (
                  <div className="listStyling" key={ind}>
                    <div className="clearItem">x</div>
                    <ItemSummary
                      imageUrl={
                        this.props.compareSummary.images[
                          this.state.selectedItemsCount &&
                            this.state.selectedItemsCount[ind + 1] &&
                            this.state.selectedItemsCount[ind + 1][0].value
                        ]
                      }
                      price={
                        this.props.compareSummary.productPricingSummary[
                          this.state.selectedItemsCount[ind + 1][0].value
                        ]
                      }
                      productName={
                        this.props.compareSummary.titles[
                          this.state.selectedItemsCount[ind + 1][0].value
                        ].title
                      }
                    />
                  </div>
                );
              }
            })
          )}
        </div>
        {this.state.selectedItemsCount.length > 1 ? (
          <div className="table-container">
            {this.state.selectedItemsCount &&
              this.state.selectedItemsCount.length <= 5 &&
              this.state.selectedItemsCount.map((selectedItem, ind) => {
                return (
                  <div key={ind}>
                    <Table
                      colId={ind}
                      rows={this.props.featuresList}
                      selectedItemKey={selectedItem}
                    />
                  </div>
                );
              })}
          </div>
        ) : (
          <div align="center" className="NoData">
            Please select products to compare
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    featuresList: store.reducer.featuresList,
    itemList: store.reducer.itemList,
    compareSummary: store.reducer.compareSummary,
  };
};
const mapActionToProps = {
  getFeatureList: FeatureListActions.getFeatureList,
  setItemList: FeatureListActions.setItemList,
};
export default connect(mapStateToProps, mapActionToProps)(CompareItem);
