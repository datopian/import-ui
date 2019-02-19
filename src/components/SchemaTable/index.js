import React from 'react';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'


export default class SchemaTable extends React.Component {

  colorCheck(n) {
    if (n == 1) {
      return <span className='number' style={{backgroundColor: "red"}}>{n}</span>
    }
    return <span className='number'>{n}</span>
  }

  typeSelect(value, index, column, updateTableSchema) {
    const options = ["string", "integer", "boolean"];
    let selectOptions = options.map((option) => {
      const key = `${value}-${option}-${index}`;
      return <option key={key}>{option}</option>
    });
    return <select data-tag={column} onChange={updateTableSchema} value={value} className="form-control schema select" name='schema-select'>{selectOptions}</select>
  }

  schemaCell(props, updateTableSchema) {
    console.log(props);
    const column = props.column.Header;
    if (props.index == 0) {
      return (
        <div>{props.value}
         <button className="btn btn-sm schema edit-button" onClick={() => this.editCell(props.value)}><FontAwesomeIcon icon={faEdit} /></button>
        </div>
      )
   } else if (props.index == 1) {
       return (
       <div>
        {this.typeSelect(props.value, props.index, column, updateTableSchema)}
       </div>
       )
     }
     else {
       return(
         <div>
          {props.value};
         </div>
       )
     }
  }
  /**
   *
  schemaCell(props) {
     if (props.index == 0) {
      return
        <div>{props.value}
         <button className="btn btn-sm" onClick={() => this.editCell(props.value)}><FontAwesomeIcon icon={faEdit} />Edit</button>
       </div>
     } else if (props.index == 1) {
       return <div>
        this.typeSelect(props.value);
       </div>
     }
     else {
       return <div>
        {props.value};
       </div>
     }
  }
  */

  render() {
    const { data, defaultPageSize, columns, tableSchema, updateTableSchema } = this.props;
    const schemaData = [
      {
        Address: "",
        "Aldermanic District": "",
        Comments: "",
        "Handicap Accessible": "",
        Latitude: "",
        Longitude: "",
        Name: "",
        Ward: ""
      },
      {
        Address: "string",
        "Aldermanic District": "integer",
        Comments: "string",
        "Handicap Accessible": "bolean",
        Latitude: "integer",
        Longitude: "integer",
        Name: "string",
        Ward: "integer"
      },
    ]
    let cols = JSON.parse(JSON.stringify( columns ));
    const emptyCols = cols.map((c) => {
      c.Cell = (props) => this.schemaCell(props, updateTableSchema)
      return c;
    });
/*
    const cols = [
      {
        Header: "Name",
        id: "name",
        Cell: props => <span className='number'>{props.value}</span>, // Custom cell components!
        style:  {
          "backgroundColor": "black"
        }
      },
      {
        Header: "Ward",
        accessor: "Ward",
        Cell: props => this.colorCheck(props.value), // Custom cell components!
      },
      {
        Header: "Name",
        accessor: "Name"
      }
    ]
    */
    return (
      <div className="row">
        <div className="col-sm-1">
					<div id="schema-help">
            <div className="schema-help-row">Name <FontAwesomeIcon icon={faQuestionCircle} /></div>
            <div className="schema-help-row">Description <FontAwesomeIcon icon={faQuestionCircle} /></div>
            <div className="schema-help-row">Type <FontAwesomeIcon icon={faQuestionCircle} /></div>
            <div className="schema-help-row">Format <FontAwesomeIcon icon={faQuestionCircle} /></div>
					</div>

        </div>
        <div className="col-sm-11">
          <ReactTable
            sortable={false}
            data={schemaData}
            defaultPageSize={3}
            columns={emptyCols}
            showPagination={false}
          />
          <span id="data-table">
            <ReactTable
              data={data}
              defaultPageSize={defaultPageSize}
              columns={columns} />
           </span>
         </div>
      </div>
    );
  }
}
