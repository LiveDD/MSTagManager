import React, { useState, useEffect } from "react";
import { Routes, IRouteComponent } from "../../models/App";
import { connect } from "react-redux";
import { IState } from "../../reducers/Root";
import TagPanel from "./TagPanel";
import { ITagsState } from "../../reducers/Tags";
import { ITagItem } from "../../models/Tags";
import MTMList, { PartialColumn } from "../Presentational/MTMList";
import { getTagsList } from "../../service/Api";

const columns: PartialColumn[] = [
  {
    name: "Name",
    fieldName: "name"
  },
  {
    name: "Firing Triggers",
    onRender: (item: ITagItem) => item.triggers.join(", ")
  },
  {
    name: "Body",
    fieldName: "body",
    isMultiline: true,
    minColumnWidth: 500
  }
];

const mapStateToProps = (state: IState) => state.tags;

interface ITagsProps extends ITagsState {}

const Tags: React.FC<ITagsProps> = (props: ITagsProps) => {
  const [items, setItems] = useState([] as ITagItem[]);

  const fetchItems = () => {
    getTagsList().then(setItems);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <MTMList items={items} columns={columns} />
      {props.isPanelOpen && <TagPanel {...props.panelData} />}
    </>
  );
};

export default {
  name: "Tags",
  component: connect(mapStateToProps)(Tags),
  icon: "Tag",
  key: Routes.Tags
} as IRouteComponent;
