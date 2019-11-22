import React, { useState } from "react";
import { Status } from "../../models/App";
import { ITriggerItem } from "../../models/Triggers";
import MTMPanel from "../Presentational/MTMPanel";
import MTMTextField from "../Presentational/MTMTextField";
import { saveTriggerItem } from "../../service/Api";

interface ITriggerPanelProps extends ITriggerItem {
  refreshItems(): void;
}

const TriggerPanel: React.FC<ITriggerPanelProps> = (
  props: ITriggerPanelProps
) => {
  const [name, setName] = useState(props.name);
  const [type, setType] = useState(props.type);
  const [body, setBody] = useState(props.body);

  const [saveStatus, setSaveStatus] = useState(Status.NotYetStarted);

  const onSaveClick = () => {
    setSaveStatus(Status.Loading);
    const triggerItem = { name, type, body: props.body, id: props.id };
    saveTriggerItem(triggerItem)
      .then(() => setSaveStatus(Status.Completed))
      .then(props.refreshItems)
      .catch(() => setSaveStatus(Status.Failed));
  };

  const content = (
    <>
      <MTMTextField
        label={"Name"}
        maxLength={50}
        value={name}
        onValueChange={setName}
        required
      />
      <MTMTextField
        label={"Event Type"}
        maxLength={50}
        value={type}
        onValueChange={setType}
        required
      />
      <MTMTextField
        label={"Body"}
        value={body}
        onValueChange={setBody}
        multiline
        rows={4}
      />
    </>
  );

  return (
    <MTMPanel
      headerText={props.id === -1 ? "Add Trigger" : "Edit Trigger"}
      onSaveClick={onSaveClick}
      content={content}
      isActionInProgress={saveStatus === Status.Loading}
      isFormValid={Boolean(name) && Boolean(type)}
    />
  );
};

export default TriggerPanel;
