import React from "react";
import Popup from "reactjs-popup";
import classNames from 'classnames';
import axios from 'axios';
//

const contentStyle = {
	maxWidth: "600px",
	width: "90%"
};

const DeletePopup = (props) => {
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
						<pre>
							<code>{JSON.stringify(props.urlSelected.original, null, 1)}</code>
						</pre>
					</div>
					<div className="actions">
						<button
							className="url-actions delete"
							onClick={() => {
								axios.delete(`${process.env.REACT_APP_BACKEND_URL}/url/${props.rowSelected}`);
								close();
							}}>
							Delete the URL
						</button>
						<button
							className="url-actions active"
							onClick={() => { close(); }}>
							Cancel
						</button>
					</div>
				</div>
			)}
		</Popup>)
};

export default DeletePopup;
