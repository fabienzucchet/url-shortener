import React from "react";
import Popup from "reactjs-popup";
import classNames from 'classnames';
import axios from 'axios';
import ReactJson from 'react-json-view';
//

const contentStyle = {
	maxWidth: "400px",
	width: "90%"
};

const DeletePopup = (props) => {
	if (props.urlSelected.original === undefined) {
		props.urlSelected.original = { name: "", original_url: "", short_url: "" }
	}
	return (
		<Popup
			trigger={<button
				className={classNames({
					"url-actions": true,
					"delete": props.rowSelected !== -1
				})}>Delete</button>}
			modal
			disabled={props.rowSelected === -1}
			contentStyle={contentStyle}
		>
			{close => (
				<div className="modal">
					<div className="header"> Deletion Confirmation Required </div>
					<div className="content">
						<br />
						If you continue the following record will be deleted :
						<br />
						<br />
						Name : {props.urlSelected.original.name}
						<br />
						Original URL : <a href={props.urlSelected.original.original_url}>{props.urlSelected.original.original_url}</a>
						<br />
						Short URL : <a href={process.env.REACT_APP_HOSTNAME + "/" + props.urlSelected.original.short_url}>{process.env.REACT_APP_HOSTNAME + "/" + props.urlSelected.original.short_url}</a>
					</div>
					<div className="actions">
						<button
							className="url-actions active"
							onClick={() => { close(); }}>
							Cancel
						</button>
						<button
							className="url-actions delete"
							onClick={() => {
								axios.delete(`${process.env.REACT_APP_BACKEND_URL}/url/${props.rowSelected}`);
								props.refreshList();
								close();
							}}>
							Delete the URL
						</button>
					</div>
				</div>
			)}
		</Popup>)
};

export default DeletePopup;
