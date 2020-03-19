/*
 * This combined file was created by the DataTables downloader builder:
 *   https://datatables.net/download
 *
 * To rebuild or modify this file with the latest versions of the included
 * software please visit:
 *   https://datatables.net/download/#bs4/dt-1.10.20/e-1.9.2/b-1.6.1/b-flash-1.6.1/b-print-1.6.1
 *
 * Included libraries:
 *   DataTables 1.10.20, Editor 1.9.2, Buttons 1.6.1, Flash export 1.6.1, Print view 1.6.1
 */

/*! DataTables 1.10.20
 * ©2008-2019 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     DataTables
 * @description Paginate, search and order HTML tables
 * @version     1.10.20
 * @file        jquery.dataTables.js
 * @author      SpryMedia Ltd
 * @contact     www.datatables.net
 * @copyright   Copyright 2008-2019 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

/*jslint evil: true, undef: true, browser: true */
/*globals $,require,jQuery,define,_selector_run,_selector_opts,_selector_first,_selector_row_indexes,_ext,_Api,_api_register,_api_registerPlural,_re_new_lines,_re_html,_re_formatted_numeric,_re_escape_regex,_empty,_intVal,_numToDecimal,_isNumber,_isHtml,_htmlNumeric,_pluck,_pluck_order,_range,_stripHtml,_unique,_fnBuildAjax,_fnAjaxUpdate,_fnAjaxParameters,_fnAjaxUpdateDraw,_fnAjaxDataSrc,_fnAddColumn,_fnColumnOptions,_fnAdjustColumnSizing,_fnVisibleToColumnIndex,_fnColumnIndexToVisible,_fnVisbleColumns,_fnGetColumns,_fnColumnTypes,_fnApplyColumnDefs,_fnHungarianMap,_fnCamelToHungarian,_fnLanguageCompat,_fnBrowserDetect,_fnAddData,_fnAddTr,_fnNodeToDataIndex,_fnNodeToColumnIndex,_fnGetCellData,_fnSetCellData,_fnSplitObjNotation,_fnGetObjectDataFn,_fnSetObjectDataFn,_fnGetDataMaster,_fnClearTable,_fnDeleteIndex,_fnInvalidate,_fnGetRowElements,_fnCreateTr,_fnBuildHead,_fnDrawHead,_fnDraw,_fnReDraw,_fnAddOptionsHtml,_fnDetectHeader,_fnGetUniqueThs,_fnFeatureHtmlFilter,_fnFilterComplete,_fnFilterCustom,_fnFilterColumn,_fnFilter,_fnFilterCreateSearch,_fnEscapeRegex,_fnFilterData,_fnFeatureHtmlInfo,_fnUpdateInfo,_fnInfoMacros,_fnInitialise,_fnInitComplete,_fnLengthChange,_fnFeatureHtmlLength,_fnFeatureHtmlPaginate,_fnPageChange,_fnFeatureHtmlProcessing,_fnProcessingDisplay,_fnFeatureHtmlTable,_fnScrollDraw,_fnApplyToChildren,_fnCalculateColumnWidths,_fnThrottle,_fnConvertToWidth,_fnGetWidestNode,_fnGetMaxLenString,_fnStringToCss,_fnSortFlatten,_fnSort,_fnSortAria,_fnSortListener,_fnSortAttachListener,_fnSortingClasses,_fnSortData,_fnSaveState,_fnLoadState,_fnSettingsFromNode,_fnLog,_fnMap,_fnBindAction,_fnCallbackReg,_fnCallbackFire,_fnLengthOverflow,_fnRenderer,_fnDataSource,_fnRowAttributes*/

(function( factory ) {
	"use strict";

	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				// CommonJS environments without a window global must pass a
				// root. This will give an error otherwise
				root = window;
			}

			if ( ! $ ) {
				$ = typeof window !== 'undefined' ? // jQuery's factory checks for a global window
					require('jquery') :
					require('jquery')( root );
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}
(function( $, window, document, undefined ) {
	"use strict";

	/**
	 * DataTables is a plug-in for the jQuery Javascript library. It is a highly
	 * flexible tool, based upon the foundations of progressive enhancement,
	 * which will add advanced interaction controls to any HTML table. For a
	 * full list of features please refer to
	 * [DataTables.net](href="http://datatables.net).
	 *
	 * Note that the `DataTable` object is not a global variable but is aliased
	 * to `jQuery.fn.DataTable` and `jQuery.fn.dataTable` through which it may
	 * be  accessed.
	 *
	 *  @class
	 *  @param {object} [init={}] Configuration object for DataTables. Options
	 *    are defined by {@link DataTable.defaults}
	 *  @requires jQuery 1.7+
	 *
	 *  @example
	 *    // Basic initialisation
	 *    $(document).ready( function {
	 *      $('#example').dataTable();
	 *    } );
	 *
	 *  @example
	 *    // Initialisation with configuration options - in this case, disable
	 *    // pagination and sorting.
	 *    $(document).ready( function {
	 *      $('#example').dataTable( {
	 *        "paginate": false,
	 *        "sort": false
	 *      } );
	 *    } );
	 */
	var DataTable = function ( options )
	{
		/**
		 * Perform a jQuery selector action on the table's TR elements (from the tbody) and
		 * return the resulting jQuery object.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select TR elements that meet the current filter
		 *    criterion ("applied") or all TR elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the TR elements in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {object} jQuery object, filtered by the given selector.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Highlight every second row
		 *      oTable.$('tr:odd').css('backgroundColor', 'blue');
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to rows with 'Webkit' in them, add a background colour and then
		 *      // remove the filter, thus highlighting the 'Webkit' rows only.
		 *      oTable.fnFilter('Webkit');
		 *      oTable.$('tr', {"search": "applied"}).css('backgroundColor', 'blue');
		 *      oTable.fnFilter('');
		 *    } );
		 */
		this.$ = function ( sSelector, oOpts )
		{
			return this.api(true).$( sSelector, oOpts );
		};
		
		
		/**
		 * Almost identical to $ in operation, but in this case returns the data for the matched
		 * rows - as such, the jQuery selector used should match TR row nodes or TD/TH cell nodes
		 * rather than any descendants, so the data can be obtained for the row/cell. If matching
		 * rows are found, the data returned is the original data array/object that was used to
		 * create the row (or a generated array if from a DOM source).
		 *
		 * This method is often useful in-combination with $ where both functions are given the
		 * same parameters and the array indexes will match identically.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select elements that meet the current filter
		 *    criterion ("applied") or all elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the data in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {array} Data for the matched elements. If any elements, as a result of the
		 *    selector, were not TR, TD or TH elements in the DataTable, they will have a null
		 *    entry in the array.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the data from the first row in the table
		 *      var data = oTable._('tr:first');
		 *
		 *      // Do something useful with the data
		 *      alert( "First cell is: "+data[0] );
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to 'Webkit' and get all data for
		 *      oTable.fnFilter('Webkit');
		 *      var data = oTable._('tr', {"search": "applied"});
		 *
		 *      // Do something with the data
		 *      alert( data.length+" rows matched the search" );
		 *    } );
		 */
		this._ = function ( sSelector, oOpts )
		{
			return this.api(true).rows( sSelector, oOpts ).data();
		};
		
		
		/**
		 * Create a DataTables Api instance, with the currently selected tables for
		 * the Api's context.
		 * @param {boolean} [traditional=false] Set the API instance's context to be
		 *   only the table referred to by the `DataTable.ext.iApiIndex` option, as was
		 *   used in the API presented by DataTables 1.9- (i.e. the traditional mode),
		 *   or if all tables captured in the jQuery object should be used.
		 * @return {DataTables.Api}
		 */
		this.api = function ( traditional )
		{
			return traditional ?
				new _Api(
					_fnSettingsFromNode( this[ _ext.iApiIndex ] )
				) :
				new _Api( this );
		};
		
		
		/**
		 * Add a single new row or multiple rows of data to the table. Please note
		 * that this is suitable for client-side processing only - if you are using
		 * server-side processing (i.e. "bServerSide": true), then to add data, you
		 * must add it to the data source, i.e. the server-side, through an Ajax call.
		 *  @param {array|object} data The data to be added to the table. This can be:
		 *    <ul>
		 *      <li>1D array of data - add a single row with the data provided</li>
		 *      <li>2D array of arrays - add multiple rows in a single call</li>
		 *      <li>object - data object when using <i>mData</i></li>
		 *      <li>array of objects - multiple data objects when using <i>mData</i></li>
		 *    </ul>
		 *  @param {bool} [redraw=true] redraw the table or not
		 *  @returns {array} An array of integers, representing the list of indexes in
		 *    <i>aoData</i> ({@link DataTable.models.oSettings}) that have been added to
		 *    the table.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Global var for counter
		 *    var giCount = 2;
		 *
		 *    $(document).ready(function() {
		 *      $('#example').dataTable();
		 *    } );
		 *
		 *    function fnClickAddRow() {
		 *      $('#example').dataTable().fnAddData( [
		 *        giCount+".1",
		 *        giCount+".2",
		 *        giCount+".3",
		 *        giCount+".4" ]
		 *      );
		 *
		 *      giCount++;
		 *    }
		 */
		this.fnAddData = function( data, redraw )
		{
			var api = this.api( true );
		
			/* Check if we want to add multiple rows or not */
			var rows = $.isArray(data) && ( $.isArray(data[0]) || $.isPlainObject(data[0]) ) ?
				api.rows.add( data ) :
				api.row.add( data );
		
			if ( redraw === undefined || redraw ) {
				api.draw();
			}
		
			return rows.flatten().toArray();
		};
		
		
		/**
		 * This function will make DataTables recalculate the column sizes, based on the data
		 * contained in the table and the sizes applied to the columns (in the DOM, CSS or
		 * through the sWidth parameter). This can be useful when the width of the table's
		 * parent element changes (for example a window resize).
		 *  @param {boolean} [bRedraw=true] Redraw the table or not, you will typically want to
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable( {
		 *        "sScrollY": "200px",
		 *        "bPaginate": false
		 *      } );
		 *
		 *      $(window).on('resize', function () {
		 *        oTable.fnAdjustColumnSizing();
		 *      } );
		 *    } );
		 */
		this.fnAdjustColumnSizing = function ( bRedraw )
		{
			var api = this.api( true ).columns.adjust();
			var settings = api.settings()[0];
			var scroll = settings.oScroll;
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw( false );
			}
			else if ( scroll.sX !== "" || scroll.sY !== "" ) {
				/* If not redrawing, but scrolling, we want to apply the new column sizes anyway */
				_fnScrollDraw( settings );
			}
		};
		
		
		/**
		 * Quickly and simply clear a table
		 *  @param {bool} [bRedraw=true] redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately 'nuke' the current rows (perhaps waiting for an Ajax callback...)
		 *      oTable.fnClearTable();
		 *    } );
		 */
		this.fnClearTable = function( bRedraw )
		{
			var api = this.api( true ).clear();
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw();
			}
		};
		
		
		/**
		 * The exact opposite of 'opening' a row, this function will close any rows which
		 * are currently 'open'.
		 *  @param {node} nTr the table row to 'close'
		 *  @returns {int} 0 on success, or 1 if failed (can't find the row)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnClose = function( nTr )
		{
			this.api( true ).row( nTr ).child.hide();
		};
		
		
		/**
		 * Remove a row for the table
		 *  @param {mixed} target The index of the row from aoData to be deleted, or
		 *    the TR element you want to delete
		 *  @param {function|null} [callBack] Callback function
		 *  @param {bool} [redraw=true] Redraw the table or not
		 *  @returns {array} The row that was deleted
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately remove the first row
		 *      oTable.fnDeleteRow( 0 );
		 *    } );
		 */
		this.fnDeleteRow = function( target, callback, redraw )
		{
			var api = this.api( true );
			var rows = api.rows( target );
			var settings = rows.settings()[0];
			var data = settings.aoData[ rows[0][0] ];
		
			rows.remove();
		
			if ( callback ) {
				callback.call( this, settings, data );
			}
		
			if ( redraw === undefined || redraw ) {
				api.draw();
			}
		
			return data;
		};
		
		
		/**
		 * Restore the table to it's original state in the DOM by removing all of DataTables
		 * enhancements, alterations to the DOM structure of the table and event listeners.
		 *  @param {boolean} [remove=false] Completely remove the table from the DOM
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      // This example is fairly pointless in reality, but shows how fnDestroy can be used
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnDestroy();
		 *    } );
		 */
		this.fnDestroy = function ( remove )
		{
			this.api( true ).destroy( remove );
		};
		
		
		/**
		 * Redraw the table
		 *  @param {bool} [complete=true] Re-filter and resort (if enabled) the table before the draw.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Re-draw the table - you wouldn't want to do it here, but it's an example :-)
		 *      oTable.fnDraw();
		 *    } );
		 */
		this.fnDraw = function( complete )
		{
			// Note that this isn't an exact match to the old call to _fnDraw - it takes
			// into account the new data, but can hold position.
			this.api( true ).draw( complete );
		};
		
		
		/**
		 * Filter the input based on data
		 *  @param {string} sInput String to filter the table on
		 *  @param {int|null} [iColumn] Column to limit filtering to
		 *  @param {bool} [bRegex=false] Treat as regular expression or not
		 *  @param {bool} [bSmart=true] Perform smart filtering or not
		 *  @param {bool} [bShowGlobal=true] Show the input global filter in it's input box(es)
		 *  @param {bool} [bCaseInsensitive=true] Do case-insensitive matching (true) or not (false)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sometime later - filter...
		 *      oTable.fnFilter( 'test string' );
		 *    } );
		 */
		this.fnFilter = function( sInput, iColumn, bRegex, bSmart, bShowGlobal, bCaseInsensitive )
		{
			var api = this.api( true );
		
			if ( iColumn === null || iColumn === undefined ) {
				api.search( sInput, bRegex, bSmart, bCaseInsensitive );
			}
			else {
				api.column( iColumn ).search( sInput, bRegex, bSmart, bCaseInsensitive );
			}
		
			api.draw();
		};
		
		
		/**
		 * Get the data for the whole table, an individual row or an individual cell based on the
		 * provided parameters.
		 *  @param {int|node} [src] A TR row node, TD/TH cell node or an integer. If given as
		 *    a TR node then the data source for the whole row will be returned. If given as a
		 *    TD/TH cell node then iCol will be automatically calculated and the data for the
		 *    cell returned. If given as an integer, then this is treated as the aoData internal
		 *    data index for the row (see fnGetPosition) and the data for that row used.
		 *  @param {int} [col] Optional column index that you want the data of.
		 *  @returns {array|object|string} If mRow is undefined, then the data for all rows is
		 *    returned. If mRow is defined, just data for that row, and is iCol is
		 *    defined, only data for the designated cell is returned.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Row data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('tr').click( function () {
		 *        var data = oTable.fnGetData( this );
		 *        // ... do something with the array / object of data for the row
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Individual cell data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('td').click( function () {
		 *        var sData = oTable.fnGetData( this );
		 *        alert( 'The cell clicked on had the value of '+sData );
		 *      } );
		 *    } );
		 */
		this.fnGetData = function( src, col )
		{
			var api = this.api( true );
		
			if ( src !== undefined ) {
				var type = src.nodeName ? src.nodeName.toLowerCase() : '';
		
				return col !== undefined || type == 'td' || type == 'th' ?
					api.cell( src, col ).data() :
					api.row( src ).data() || null;
			}
		
			return api.data().toArray();
		};
		
		
		/**
		 * Get an array of the TR nodes that are used in the table's body. Note that you will
		 * typically want to use the '$' API method in preference to this as it is more
		 * flexible.
		 *  @param {int} [iRow] Optional row index for the TR element you want
		 *  @returns {array|node} If iRow is undefined, returns an array of all TR elements
		 *    in the table's body, or iRow is defined, just the TR element requested.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the nodes from the table
		 *      var nNodes = oTable.fnGetNodes( );
		 *    } );
		 */
		this.fnGetNodes = function( iRow )
		{
			var api = this.api( true );
		
			return iRow !== undefined ?
				api.row( iRow ).node() :
				api.rows().nodes().flatten().toArray();
		};
		
		
		/**
		 * Get the array indexes of a particular cell from it's DOM element
		 * and column index including hidden columns
		 *  @param {node} node this can either be a TR, TD or TH in the table's body
		 *  @returns {int} If nNode is given as a TR, then a single index is returned, or
		 *    if given as a cell, an array of [row index, column index (visible),
		 *    column index (all)] is given.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      $('#example tbody td').click( function () {
		 *        // Get the position of the current data from the node
		 *        var aPos = oTable.fnGetPosition( this );
		 *
		 *        // Get the data array for this row
		 *        var aData = oTable.fnGetData( aPos[0] );
		 *
		 *        // Update the data array and return the value
		 *        aData[ aPos[1] ] = 'clicked';
		 *        this.innerHTML = 'clicked';
		 *      } );
		 *
		 *      // Init DataTables
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnGetPosition = function( node )
		{
			var api = this.api( true );
			var nodeName = node.nodeName.toUpperCase();
		
			if ( nodeName == 'TR' ) {
				return api.row( node ).index();
			}
			else if ( nodeName == 'TD' || nodeName == 'TH' ) {
				var cell = api.cell( node ).index();
		
				return [
					cell.row,
					cell.columnVisible,
					cell.column
				];
			}
			return null;
		};
		
		
		/**
		 * Check to see if a row is 'open' or not.
		 *  @param {node} nTr the table row to check
		 *  @returns {boolean} true if the row is currently open, false otherwise
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnIsOpen = function( nTr )
		{
			return this.api( true ).row( nTr ).child.isShown();
		};
		
		
		/**
		 * This function will place a new row directly after a row which is currently
		 * on display on the page, with the HTML contents that is passed into the
		 * function. This can be used, for example, to ask for confirmation that a
		 * particular record should be deleted.
		 *  @param {node} nTr The table row to 'open'
		 *  @param {string|node|jQuery} mHtml The HTML to put into the row
		 *  @param {string} sClass Class to give the new TD cell
		 *  @returns {node} The row opened. Note that if the table row passed in as the
		 *    first parameter, is not found in the table, this method will silently
		 *    return.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnOpen = function( nTr, mHtml, sClass )
		{
			return this.api( true )
				.row( nTr )
				.child( mHtml, sClass )
				.show()
				.child()[0];
		};
		
		
		/**
		 * Change the pagination - provides the internal logic for pagination in a simple API
		 * function. With this function you can have a DataTables table go to the next,
		 * previous, first or last pages.
		 *  @param {string|int} mAction Paging action to take: "first", "previous", "next" or "last"
		 *    or page number to jump to (integer), note that page 0 is the first page.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnPageChange( 'next' );
		 *    } );
		 */
		this.fnPageChange = function ( mAction, bRedraw )
		{
			var api = this.api( true ).page( mAction );
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw(false);
			}
		};
		
		
		/**
		 * Show a particular column
		 *  @param {int} iCol The column whose display should be changed
		 *  @param {bool} bShow Show (true) or hide (false) the column
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Hide the second column after initialisation
		 *      oTable.fnSetColumnVis( 1, false );
		 *    } );
		 */
		this.fnSetColumnVis = function ( iCol, bShow, bRedraw )
		{
			var api = this.api( true ).column( iCol ).visible( bShow );
		
			if ( bRedraw === undefined || bRedraw ) {
				api.columns.adjust().draw();
			}
		};
		
		
		/**
		 * Get the settings for a particular table for external manipulation
		 *  @returns {object} DataTables settings object. See
		 *    {@link DataTable.models.oSettings}
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      var oSettings = oTable.fnSettings();
		 *
		 *      // Show an example parameter from the settings
		 *      alert( oSettings._iDisplayStart );
		 *    } );
		 */
		this.fnSettings = function()
		{
			return _fnSettingsFromNode( this[_ext.iApiIndex] );
		};
		
		
		/**
		 * Sort the table by a particular column
		 *  @param {int} iCol the data index to sort on. Note that this will not match the
		 *    'display index' if you have hidden data entries
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort immediately with columns 0 and 1
		 *      oTable.fnSort( [ [0,'asc'], [1,'asc'] ] );
		 *    } );
		 */
		this.fnSort = function( aaSort )
		{
			this.api( true ).order( aaSort ).draw();
		};
		
		
		/**
		 * Attach a sort listener to an element for a given column
		 *  @param {node} nNode the element to attach the sort listener to
		 *  @param {int} iColumn the column that a click on this node will sort on
		 *  @param {function} [fnCallback] callback function when sort is run
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort on column 1, when 'sorter' is clicked on
		 *      oTable.fnSortListener( document.getElementById('sorter'), 1 );
		 *    } );
		 */
		this.fnSortListener = function( nNode, iColumn, fnCallback )
		{
			this.api( true ).order.listener( nNode, iColumn, fnCallback );
		};
		
		
		/**
		 * Update a table cell or row - this method will accept either a single value to
		 * update the cell with, an array of values with one element for each column or
		 * an object in the same format as the original data source. The function is
		 * self-referencing in order to make the multi column updates easier.
		 *  @param {object|array|string} mData Data to update the cell/row with
		 *  @param {node|int} mRow TR element you want to update or the aoData index
		 *  @param {int} [iColumn] The column to update, give as null or undefined to
		 *    update a whole row.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @param {bool} [bAction=true] Perform pre-draw actions or not
		 *  @returns {int} 0 on success, 1 on error
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnUpdate( 'Example update', 0, 0 ); // Single cell
		 *      oTable.fnUpdate( ['a', 'b', 'c', 'd', 'e'], $('tbody tr')[0] ); // Row
		 *    } );
		 */
		this.fnUpdate = function( mData, mRow, iColumn, bRedraw, bAction )
		{
			var api = this.api( true );
		
			if ( iColumn === undefined || iColumn === null ) {
				api.row( mRow ).data( mData );
			}
			else {
				api.cell( mRow, iColumn ).data( mData );
			}
		
			if ( bAction === undefined || bAction ) {
				api.columns.adjust();
			}
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw();
			}
			return 0;
		};
		
		
		/**
		 * Provide a common method for plug-ins to check the version of DataTables being used, in order
		 * to ensure compatibility.
		 *  @param {string} sVersion Version string to check for, in the format "X.Y.Z". Note that the
		 *    formats "X" and "X.Y" are also acceptable.
		 *  @returns {boolean} true if this version of DataTables is greater or equal to the required
		 *    version, or false if this version of DataTales is not suitable
		 *  @method
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      alert( oTable.fnVersionCheck( '1.9.0' ) );
		 *    } );
		 */
		this.fnVersionCheck = _ext.fnVersionCheck;
		

		var _that = this;
		var emptyInit = options === undefined;
		var len = this.length;

		if ( emptyInit ) {
			options = {};
		}

		this.oApi = this.internal = _ext.internal;

		// Extend with old style plug-in API methods
		for ( var fn in DataTable.ext.internal ) {
			if ( fn ) {
				this[fn] = _fnExternApiFunc(fn);
			}
		}

		this.each(function() {
			// For each initialisation we want to give it a clean initialisation
			// object that can be bashed around
			var o = {};
			var oInit = len > 1 ? // optimisation for single table case
				_fnExtend( o, options, true ) :
				options;

			/*global oInit,_that,emptyInit*/
			var i=0, iLen, j, jLen, k, kLen;
			var sId = this.getAttribute( 'id' );
			var bInitHandedOff = false;
			var defaults = DataTable.defaults;
			var $this = $(this);
			
			
			/* Sanity check */
			if ( this.nodeName.toLowerCase() != 'table' )
			{
				_fnLog( null, 0, 'Non-table node initialisation ('+this.nodeName+')', 2 );
				return;
			}
			
			/* Backwards compatibility for the defaults */
			_fnCompatOpts( defaults );
			_fnCompatCols( defaults.column );
			
			/* Convert the camel-case defaults to Hungarian */
			_fnCamelToHungarian( defaults, defaults, true );
			_fnCamelToHungarian( defaults.column, defaults.column, true );
			
			/* Setting up the initialisation object */
			_fnCamelToHungarian( defaults, $.extend( oInit, $this.data() ), true );
			
			
			
			/* Check to see if we are re-initialising a table */
			var allSettings = DataTable.settings;
			for ( i=0, iLen=allSettings.length ; i<iLen ; i++ )
			{
				var s = allSettings[i];
			
				/* Base check on table node */
				if (
					s.nTable == this ||
					(s.nTHead && s.nTHead.parentNode == this) ||
					(s.nTFoot && s.nTFoot.parentNode == this)
				) {
					var bRetrieve = oInit.bRetrieve !== undefined ? oInit.bRetrieve : defaults.bRetrieve;
					var bDestroy = oInit.bDestroy !== undefined ? oInit.bDestroy : defaults.bDestroy;
			
					if ( emptyInit || bRetrieve )
					{
						return s.oInstance;
					}
					else if ( bDestroy )
					{
						s.oInstance.fnDestroy();
						break;
					}
					else
					{
						_fnLog( s, 0, 'Cannot reinitialise DataTable', 3 );
						return;
					}
				}
			
				/* If the element we are initialising has the same ID as a table which was previously
				 * initialised, but the table nodes don't match (from before) then we destroy the old
				 * instance by simply deleting it. This is under the assumption that the table has been
				 * destroyed by other methods. Anyone using non-id selectors will need to do this manually
				 */
				if ( s.sTableId == this.id )
				{
					allSettings.splice( i, 1 );
					break;
				}
			}
			
			/* Ensure the table has an ID - required for accessibility */
			if ( sId === null || sId === "" )
			{
				sId = "DataTables_Table_"+(DataTable.ext._unique++);
				this.id = sId;
			}
			
			/* Create the settings object for this table and set some of the default parameters */
			var oSettings = $.extend( true, {}, DataTable.models.oSettings, {
				"sDestroyWidth": $this[0].style.width,
				"sInstance":     sId,
				"sTableId":      sId
			} );
			oSettings.nTable = this;
			oSettings.oApi   = _that.internal;
			oSettings.oInit  = oInit;
			
			allSettings.push( oSettings );
			
			// Need to add the instance after the instance after the settings object has been added
			// to the settings array, so we can self reference the table instance if more than one
			oSettings.oInstance = (_that.length===1) ? _that : $this.dataTable();
			
			// Backwards compatibility, before we apply all the defaults
			_fnCompatOpts( oInit );
			_fnLanguageCompat( oInit.oLanguage );
			
			// If the length menu is given, but the init display length is not, use the length menu
			if ( oInit.aLengthMenu && ! oInit.iDisplayLength )
			{
				oInit.iDisplayLength = $.isArray( oInit.aLengthMenu[0] ) ?
					oInit.aLengthMenu[0][0] : oInit.aLengthMenu[0];
			}
			
			// Apply the defaults and init options to make a single init object will all
			// options defined from defaults and instance options.
			oInit = _fnExtend( $.extend( true, {}, defaults ), oInit );
			
			
			// Map the initialisation options onto the settings object
			_fnMap( oSettings.oFeatures, oInit, [
				"bPaginate",
				"bLengthChange",
				"bFilter",
				"bSort",
				"bSortMulti",
				"bInfo",
				"bProcessing",
				"bAutoWidth",
				"bSortClasses",
				"bServerSide",
				"bDeferRender"
			] );
			_fnMap( oSettings, oInit, [
				"asStripeClasses",
				"ajax",
				"fnServerData",
				"fnFormatNumber",
				"sServerMethod",
				"aaSorting",
				"aaSortingFixed",
				"aLengthMenu",
				"sPaginationType",
				"sAjaxSource",
				"sAjaxDataProp",
				"iStateDuration",
				"sDom",
				"bSortCellsTop",
				"iTabIndex",
				"fnStateLoadCallback",
				"fnStateSaveCallback",
				"renderer",
				"searchDelay",
				"rowId",
				[ "iCookieDuration", "iStateDuration" ], // backwards compat
				[ "oSearch", "oPreviousSearch" ],
				[ "aoSearchCols", "aoPreSearchCols" ],
				[ "iDisplayLength", "_iDisplayLength" ]
			] );
			_fnMap( oSettings.oScroll, oInit, [
				[ "sScrollX", "sX" ],
				[ "sScrollXInner", "sXInner" ],
				[ "sScrollY", "sY" ],
				[ "bScrollCollapse", "bCollapse" ]
			] );
			_fnMap( oSettings.oLanguage, oInit, "fnInfoCallback" );
			
			/* Callback functions which are array driven */
			_fnCallbackReg( oSettings, 'aoDrawCallback',       oInit.fnDrawCallback,      'user' );
			_fnCallbackReg( oSettings, 'aoServerParams',       oInit.fnServerParams,      'user' );
			_fnCallbackReg( oSettings, 'aoStateSaveParams',    oInit.fnStateSaveParams,   'user' );
			_fnCallbackReg( oSettings, 'aoStateLoadParams',    oInit.fnStateLoadParams,   'user' );
			_fnCallbackReg( oSettings, 'aoStateLoaded',        oInit.fnStateLoaded,       'user' );
			_fnCallbackReg( oSettings, 'aoRowCallback',        oInit.fnRowCallback,       'user' );
			_fnCallbackReg( oSettings, 'aoRowCreatedCallback', oInit.fnCreatedRow,        'user' );
			_fnCallbackReg( oSettings, 'aoHeaderCallback',     oInit.fnHeaderCallback,    'user' );
			_fnCallbackReg( oSettings, 'aoFooterCallback',     oInit.fnFooterCallback,    'user' );
			_fnCallbackReg( oSettings, 'aoInitComplete',       oInit.fnInitComplete,      'user' );
			_fnCallbackReg( oSettings, 'aoPreDrawCallback',    oInit.fnPreDrawCallback,   'user' );
			
			oSettings.rowIdFn = _fnGetObjectDataFn( oInit.rowId );
			
			/* Browser support detection */
			_fnBrowserDetect( oSettings );
			
			var oClasses = oSettings.oClasses;
			
			$.extend( oClasses, DataTable.ext.classes, oInit.oClasses );
			$this.addClass( oClasses.sTable );
			
			
			if ( oSettings.iInitDisplayStart === undefined )
			{
				/* Display start point, taking into account the save saving */
				oSettings.iInitDisplayStart = oInit.iDisplayStart;
				oSettings._iDisplayStart = oInit.iDisplayStart;
			}
			
			if ( oInit.iDeferLoading !== null )
			{
				oSettings.bDeferLoading = true;
				var tmp = $.isArray( oInit.iDeferLoading );
				oSettings._iRecordsDisplay = tmp ? oInit.iDeferLoading[0] : oInit.iDeferLoading;
				oSettings._iRecordsTotal = tmp ? oInit.iDeferLoading[1] : oInit.iDeferLoading;
			}
			
			/* Language definitions */
			var oLanguage = oSettings.oLanguage;
			$.extend( true, oLanguage, oInit.oLanguage );
			
			if ( oLanguage.sUrl )
			{
				/* Get the language definitions from a file - because this Ajax call makes the language
				 * get async to the remainder of this function we use bInitHandedOff to indicate that
				 * _fnInitialise will be fired by the returned Ajax handler, rather than the constructor
				 */
				$.ajax( {
					dataType: 'json',
					url: oLanguage.sUrl,
					success: function ( json ) {
						_fnLanguageCompat( json );
						_fnCamelToHungarian( defaults.oLanguage, json );
						$.extend( true, oLanguage, json );
						_fnInitialise( oSettings );
					},
					error: function () {
						// Error occurred loading language file, continue on as best we can
						_fnInitialise( oSettings );
					}
				} );
				bInitHandedOff = true;
			}
			
			/*
			 * Stripes
			 */
			if ( oInit.asStripeClasses === null )
			{
				oSettings.asStripeClasses =[
					oClasses.sStripeOdd,
					oClasses.sStripeEven
				];
			}
			
			/* Remove row stripe classes if they are already on the table row */
			var stripeClasses = oSettings.asStripeClasses;
			var rowOne = $this.children('tbody').find('tr').eq(0);
			if ( $.inArray( true, $.map( stripeClasses, function(el, i) {
				return rowOne.hasClass(el);
			} ) ) !== -1 ) {
				$('tbody tr', this).removeClass( stripeClasses.join(' ') );
				oSettings.asDestroyStripes = stripeClasses.slice();
			}
			
			/*
			 * Columns
			 * See if we should load columns automatically or use defined ones
			 */
			var anThs = [];
			var aoColumnsInit;
			var nThead = this.getElementsByTagName('thead');
			if ( nThead.length !== 0 )
			{
				_fnDetectHeader( oSettings.aoHeader, nThead[0] );
				anThs = _fnGetUniqueThs( oSettings );
			}
			
			/* If not given a column array, generate one with nulls */
			if ( oInit.aoColumns === null )
			{
				aoColumnsInit = [];
				for ( i=0, iLen=anThs.length ; i<iLen ; i++ )
				{
					aoColumnsInit.push( null );
				}
			}
			else
			{
				aoColumnsInit = oInit.aoColumns;
			}
			
			/* Add the columns */
			for ( i=0, iLen=aoColumnsInit.length ; i<iLen ; i++ )
			{
				_fnAddColumn( oSettings, anThs ? anThs[i] : null );
			}
			
			/* Apply the column definitions */
			_fnApplyColumnDefs( oSettings, oInit.aoColumnDefs, aoColumnsInit, function (iCol, oDef) {
				_fnColumnOptions( oSettings, iCol, oDef );
			} );
			
			/* HTML5 attribute detection - build an mData object automatically if the
			 * attributes are found
			 */
			if ( rowOne.length ) {
				var a = function ( cell, name ) {
					return cell.getAttribute( 'data-'+name ) !== null ? name : null;
				};
			
				$( rowOne[0] ).children('th, td').each( function (i, cell) {
					var col = oSettings.aoColumns[i];
			
					if ( col.mData === i ) {
						var sort = a( cell, 'sort' ) || a( cell, 'order' );
						var filter = a( cell, 'filter' ) || a( cell, 'search' );
			
						if ( sort !== null || filter !== null ) {
							col.mData = {
								_:      i+'.display',
								sort:   sort !== null   ? i+'.@data-'+sort   : undefined,
								type:   sort !== null   ? i+'.@data-'+sort   : undefined,
								filter: filter !== null ? i+'.@data-'+filter : undefined
							};
			
							_fnColumnOptions( oSettings, i );
						}
					}
				} );
			}
			
			var features = oSettings.oFeatures;
			var loadedInit = function () {
				/*
				 * Sorting
				 * @todo For modularisation (1.11) this needs to do into a sort start up handler
				 */
			
				// If aaSorting is not defined, then we use the first indicator in asSorting
				// in case that has been altered, so the default sort reflects that option
				if ( oInit.aaSorting === undefined ) {
					var sorting = oSettings.aaSorting;
					for ( i=0, iLen=sorting.length ; i<iLen ; i++ ) {
						sorting[i][1] = oSettings.aoColumns[ i ].asSorting[0];
					}
				}
			
				/* Do a first pass on the sorting classes (allows any size changes to be taken into
				 * account, and also will apply sorting disabled classes if disabled
				 */
				_fnSortingClasses( oSettings );
			
				if ( features.bSort ) {
					_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
						if ( oSettings.bSorted ) {
							var aSort = _fnSortFlatten( oSettings );
							var sortedColumns = {};
			
							$.each( aSort, function (i, val) {
								sortedColumns[ val.src ] = val.dir;
							} );
			
							_fnCallbackFire( oSettings, null, 'order', [oSettings, aSort, sortedColumns] );
							_fnSortAria( oSettings );
						}
					} );
				}
			
				_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
					if ( oSettings.bSorted || _fnDataSource( oSettings ) === 'ssp' || features.bDeferRender ) {
						_fnSortingClasses( oSettings );
					}
				}, 'sc' );
			
			
				/*
				 * Final init
				 * Cache the header, body and footer as required, creating them if needed
				 */
			
				// Work around for Webkit bug 83867 - store the caption-side before removing from doc
				var captions = $this.children('caption').each( function () {
					this._captionSide = $(this).css('caption-side');
				} );
			
				var thead = $this.children('thead');
				if ( thead.length === 0 ) {
					thead = $('<thead/>').appendTo($this);
				}
				oSettings.nTHead = thead[0];
			
				var tbody = $this.children('tbody');
				if ( tbody.length === 0 ) {
					tbody = $('<tbody/>').appendTo($this);
				}
				oSettings.nTBody = tbody[0];
			
				var tfoot = $this.children('tfoot');
				if ( tfoot.length === 0 && captions.length > 0 && (oSettings.oScroll.sX !== "" || oSettings.oScroll.sY !== "") ) {
					// If we are a scrolling table, and no footer has been given, then we need to create
					// a tfoot element for the caption element to be appended to
					tfoot = $('<tfoot/>').appendTo($this);
				}
			
				if ( tfoot.length === 0 || tfoot.children().length === 0 ) {
					$this.addClass( oClasses.sNoFooter );
				}
				else if ( tfoot.length > 0 ) {
					oSettings.nTFoot = tfoot[0];
					_fnDetectHeader( oSettings.aoFooter, oSettings.nTFoot );
				}
			
				/* Check if there is data passing into the constructor */
				if ( oInit.aaData ) {
					for ( i=0 ; i<oInit.aaData.length ; i++ ) {
						_fnAddData( oSettings, oInit.aaData[ i ] );
					}
				}
				else if ( oSettings.bDeferLoading || _fnDataSource( oSettings ) == 'dom' ) {
					/* Grab the data from the page - only do this when deferred loading or no Ajax
					 * source since there is no point in reading the DOM data if we are then going
					 * to replace it with Ajax data
					 */
					_fnAddTr( oSettings, $(oSettings.nTBody).children('tr') );
				}
			
				/* Copy the data index array */
				oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
			
				/* Initialisation complete - table can be drawn */
				oSettings.bInitialised = true;
			
				/* Check if we need to initialise the table (it might not have been handed off to the
				 * language processor)
				 */
				if ( bInitHandedOff === false ) {
					_fnInitialise( oSettings );
				}
			};
			
			/* Must be done after everything which can be overridden by the state saving! */
			if ( oInit.bStateSave )
			{
				features.bStateSave = true;
				_fnCallbackReg( oSettings, 'aoDrawCallback', _fnSaveState, 'state_save' );
				_fnLoadState( oSettings, oInit, loadedInit );
			}
			else {
				loadedInit();
			}
			
		} );
		_that = null;
		return this;
	};

	
	/*
	 * It is useful to have variables which are scoped locally so only the
	 * DataTables functions can access them and they don't leak into global space.
	 * At the same time these functions are often useful over multiple files in the
	 * core and API, so we list, or at least document, all variables which are used
	 * by DataTables as private variables here. This also ensures that there is no
	 * clashing of variable names and that they can easily referenced for reuse.
	 */
	
	
	// Defined else where
	//  _selector_run
	//  _selector_opts
	//  _selector_first
	//  _selector_row_indexes
	
	var _ext; // DataTable.ext
	var _Api; // DataTable.Api
	var _api_register; // DataTable.Api.register
	var _api_registerPlural; // DataTable.Api.registerPlural
	
	var _re_dic = {};
	var _re_new_lines = /[\r\n\u2028]/g;
	var _re_html = /<.*?>/g;
	
	// This is not strict ISO8601 - Date.parse() is quite lax, although
	// implementations differ between browsers.
	var _re_date = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/;
	
	// Escape regular expression special characters
	var _re_escape_regex = new RegExp( '(\\' + [ '/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-' ].join('|\\') + ')', 'g' );
	
	// http://en.wikipedia.org/wiki/Foreign_exchange_market
	// - \u20BD - Russian ruble.
	// - \u20a9 - South Korean Won
	// - \u20BA - Turkish Lira
	// - \u20B9 - Indian Rupee
	// - R - Brazil (R$) and South Africa
	// - fr - Swiss Franc
	// - kr - Swedish krona, Norwegian krone and Danish krone
	// - \u2009 is thin space and \u202F is narrow no-break space, both used in many
	// - Ƀ - Bitcoin
	// - Ξ - Ethereum
	//   standards as thousands separators.
	var _re_formatted_numeric = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi;
	
	
	var _empty = function ( d ) {
		return !d || d === true || d === '-' ? true : false;
	};
	
	
	var _intVal = function ( s ) {
		var integer = parseInt( s, 10 );
		return !isNaN(integer) && isFinite(s) ? integer : null;
	};
	
	// Convert from a formatted number with characters other than `.` as the
	// decimal place, to a Javascript number
	var _numToDecimal = function ( num, decimalPoint ) {
		// Cache created regular expressions for speed as this function is called often
		if ( ! _re_dic[ decimalPoint ] ) {
			_re_dic[ decimalPoint ] = new RegExp( _fnEscapeRegex( decimalPoint ), 'g' );
		}
		return typeof num === 'string' && decimalPoint !== '.' ?
			num.replace( /\./g, '' ).replace( _re_dic[ decimalPoint ], '.' ) :
			num;
	};
	
	
	var _isNumber = function ( d, decimalPoint, formatted ) {
		var strType = typeof d === 'string';
	
		// If empty return immediately so there must be a number if it is a
		// formatted string (this stops the string "k", or "kr", etc being detected
		// as a formatted number for currency
		if ( _empty( d ) ) {
			return true;
		}
	
		if ( decimalPoint && strType ) {
			d = _numToDecimal( d, decimalPoint );
		}
	
		if ( formatted && strType ) {
			d = d.replace( _re_formatted_numeric, '' );
		}
	
		return !isNaN( parseFloat(d) ) && isFinite( d );
	};
	
	
	// A string without HTML in it can be considered to be HTML still
	var _isHtml = function ( d ) {
		return _empty( d ) || typeof d === 'string';
	};
	
	
	var _htmlNumeric = function ( d, decimalPoint, formatted ) {
		if ( _empty( d ) ) {
			return true;
		}
	
		var html = _isHtml( d );
		return ! html ?
			null :
			_isNumber( _stripHtml( d ), decimalPoint, formatted ) ?
				true :
				null;
	};
	
	
	var _pluck = function ( a, prop, prop2 ) {
		var out = [];
		var i=0, ien=a.length;
	
		// Could have the test in the loop for slightly smaller code, but speed
		// is essential here
		if ( prop2 !== undefined ) {
			for ( ; i<ien ; i++ ) {
				if ( a[i] && a[i][ prop ] ) {
					out.push( a[i][ prop ][ prop2 ] );
				}
			}
		}
		else {
			for ( ; i<ien ; i++ ) {
				if ( a[i] ) {
					out.push( a[i][ prop ] );
				}
			}
		}
	
		return out;
	};
	
	
	// Basically the same as _pluck, but rather than looping over `a` we use `order`
	// as the indexes to pick from `a`
	var _pluck_order = function ( a, order, prop, prop2 )
	{
		var out = [];
		var i=0, ien=order.length;
	
		// Could have the test in the loop for slightly smaller code, but speed
		// is essential here
		if ( prop2 !== undefined ) {
			for ( ; i<ien ; i++ ) {
				if ( a[ order[i] ][ prop ] ) {
					out.push( a[ order[i] ][ prop ][ prop2 ] );
				}
			}
		}
		else {
			for ( ; i<ien ; i++ ) {
				out.push( a[ order[i] ][ prop ] );
			}
		}
	
		return out;
	};
	
	
	var _range = function ( len, start )
	{
		var out = [];
		var end;
	
		if ( start === undefined ) {
			start = 0;
			end = len;
		}
		else {
			end = start;
			start = len;
		}
	
		for ( var i=start ; i<end ; i++ ) {
			out.push( i );
		}
	
		return out;
	};
	
	
	var _removeEmpty = function ( a )
	{
		var out = [];
	
		for ( var i=0, ien=a.length ; i<ien ; i++ ) {
			if ( a[i] ) { // careful - will remove all falsy values!
				out.push( a[i] );
			}
		}
	
		return out;
	};
	
	
	var _stripHtml = function ( d ) {
		return d.replace( _re_html, '' );
	};
	
	
	/**
	 * Determine if all values in the array are unique. This means we can short
	 * cut the _unique method at the cost of a single loop. A sorted array is used
	 * to easily check the values.
	 *
	 * @param  {array} src Source array
	 * @return {boolean} true if all unique, false otherwise
	 * @ignore
	 */
	var _areAllUnique = function ( src ) {
		if ( src.length < 2 ) {
			return true;
		}
	
		var sorted = src.slice().sort();
		var last = sorted[0];
	
		for ( var i=1, ien=sorted.length ; i<ien ; i++ ) {
			if ( sorted[i] === last ) {
				return false;
			}
	
			last = sorted[i];
		}
	
		return true;
	};
	
	
	/**
	 * Find the unique elements in a source array.
	 *
	 * @param  {array} src Source array
	 * @return {array} Array of unique items
	 * @ignore
	 */
	var _unique = function ( src )
	{
		if ( _areAllUnique( src ) ) {
			return src.slice();
		}
	
		// A faster unique method is to use object keys to identify used values,
		// but this doesn't work with arrays or objects, which we must also
		// consider. See jsperf.com/compare-array-unique-versions/4 for more
		// information.
		var
			out = [],
			val,
			i, ien=src.length,
			j, k=0;
	
		again: for ( i=0 ; i<ien ; i++ ) {
			val = src[i];
	
			for ( j=0 ; j<k ; j++ ) {
				if ( out[j] === val ) {
					continue again;
				}
			}
	
			out.push( val );
			k++;
		}
	
		return out;
	};
	
	
	/**
	 * DataTables utility methods
	 * 
	 * This namespace provides helper methods that DataTables uses internally to
	 * create a DataTable, but which are not exclusively used only for DataTables.
	 * These methods can be used by extension authors to save the duplication of
	 * code.
	 *
	 *  @namespace
	 */
	DataTable.util = {
		/**
		 * Throttle the calls to a function. Arguments and context are maintained
		 * for the throttled function.
		 *
		 * @param {function} fn Function to be called
		 * @param {integer} freq Call frequency in mS
		 * @return {function} Wrapped function
		 */
		throttle: function ( fn, freq ) {
			var
				frequency = freq !== undefined ? freq : 200,
				last,
				timer;
	
			return function () {
				var
					that = this,
					now  = +new Date(),
					args = arguments;
	
				if ( last && now < last + frequency ) {
					clearTimeout( timer );
	
					timer = setTimeout( function () {
						last = undefined;
						fn.apply( that, args );
					}, frequency );
				}
				else {
					last = now;
					fn.apply( that, args );
				}
			};
		},
	
	
		/**
		 * Escape a string such that it can be used in a regular expression
		 *
		 *  @param {string} val string to escape
		 *  @returns {string} escaped string
		 */
		escapeRegex: function ( val ) {
			return val.replace( _re_escape_regex, '\\$1' );
		}
	};
	
	
	
	/**
	 * Create a mapping object that allows camel case parameters to be looked up
	 * for their Hungarian counterparts. The mapping is stored in a private
	 * parameter called `_hungarianMap` which can be accessed on the source object.
	 *  @param {object} o
	 *  @memberof DataTable#oApi
	 */
	function _fnHungarianMap ( o )
	{
		var
			hungarian = 'a aa ai ao as b fn i m o s ',
			match,
			newKey,
			map = {};
	
		$.each( o, function (key, val) {
			match = key.match(/^([^A-Z]+?)([A-Z])/);
	
			if ( match && hungarian.indexOf(match[1]+' ') !== -1 )
			{
				newKey = key.replace( match[0], match[2].toLowerCase() );
				map[ newKey ] = key;
	
				if ( match[1] === 'o' )
				{
					_fnHungarianMap( o[key] );
				}
			}
		} );
	
		o._hungarianMap = map;
	}
	
	
	/**
	 * Convert from camel case parameters to Hungarian, based on a Hungarian map
	 * created by _fnHungarianMap.
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 *  @memberof DataTable#oApi
	 */
	function _fnCamelToHungarian ( src, user, force )
	{
		if ( ! src._hungarianMap ) {
			_fnHungarianMap( src );
		}
	
		var hungarianKey;
	
		$.each( user, function (key, val) {
			hungarianKey = src._hungarianMap[ key ];
	
			if ( hungarianKey !== undefined && (force || user[hungarianKey] === undefined) )
			{
				// For objects, we need to buzz down into the object to copy parameters
				if ( hungarianKey.charAt(0) === 'o' )
				{
					// Copy the camelCase options over to the hungarian
					if ( ! user[ hungarianKey ] ) {
						user[ hungarianKey ] = {};
					}
					$.extend( true, user[hungarianKey], user[key] );
	
					_fnCamelToHungarian( src[hungarianKey], user[hungarianKey], force );
				}
				else {
					user[hungarianKey] = user[ key ];
				}
			}
		} );
	}
	
	
	/**
	 * Language compatibility - when certain options are given, and others aren't, we
	 * need to duplicate the values over, in order to provide backwards compatibility
	 * with older language files.
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnLanguageCompat( lang )
	{
		// Note the use of the Hungarian notation for the parameters in this method as
		// this is called after the mapping of camelCase to Hungarian
		var defaults = DataTable.defaults.oLanguage;
	
		// Default mapping
		var defaultDecimal = defaults.sDecimal;
		if ( defaultDecimal ) {
			_addNumericSort( defaultDecimal );
		}
	
		if ( lang ) {
			var zeroRecords = lang.sZeroRecords;
	
			// Backwards compatibility - if there is no sEmptyTable given, then use the same as
			// sZeroRecords - assuming that is given.
			if ( ! lang.sEmptyTable && zeroRecords &&
				defaults.sEmptyTable === "No data available in table" )
			{
				_fnMap( lang, lang, 'sZeroRecords', 'sEmptyTable' );
			}
	
			// Likewise with loading records
			if ( ! lang.sLoadingRecords && zeroRecords &&
				defaults.sLoadingRecords === "Loading..." )
			{
				_fnMap( lang, lang, 'sZeroRecords', 'sLoadingRecords' );
			}
	
			// Old parameter name of the thousands separator mapped onto the new
			if ( lang.sInfoThousands ) {
				lang.sThousands = lang.sInfoThousands;
			}
	
			var decimal = lang.sDecimal;
			if ( decimal && defaultDecimal !== decimal ) {
				_addNumericSort( decimal );
			}
		}
	}
	
	
	/**
	 * Map one parameter onto another
	 *  @param {object} o Object to map
	 *  @param {*} knew The new parameter name
	 *  @param {*} old The old parameter name
	 */
	var _fnCompatMap = function ( o, knew, old ) {
		if ( o[ knew ] !== undefined ) {
			o[ old ] = o[ knew ];
		}
	};
	
	
	/**
	 * Provide backwards compatibility for the main DT options. Note that the new
	 * options are mapped onto the old parameters, so this is an external interface
	 * change only.
	 *  @param {object} init Object to map
	 */
	function _fnCompatOpts ( init )
	{
		_fnCompatMap( init, 'ordering',      'bSort' );
		_fnCompatMap( init, 'orderMulti',    'bSortMulti' );
		_fnCompatMap( init, 'orderClasses',  'bSortClasses' );
		_fnCompatMap( init, 'orderCellsTop', 'bSortCellsTop' );
		_fnCompatMap( init, 'order',         'aaSorting' );
		_fnCompatMap( init, 'orderFixed',    'aaSortingFixed' );
		_fnCompatMap( init, 'paging',        'bPaginate' );
		_fnCompatMap( init, 'pagingType',    'sPaginationType' );
		_fnCompatMap( init, 'pageLength',    'iDisplayLength' );
		_fnCompatMap( init, 'searching',     'bFilter' );
	
		// Boolean initialisation of x-scrolling
		if ( typeof init.sScrollX === 'boolean' ) {
			init.sScrollX = init.sScrollX ? '100%' : '';
		}
		if ( typeof init.scrollX === 'boolean' ) {
			init.scrollX = init.scrollX ? '100%' : '';
		}
	
		// Column search objects are in an array, so it needs to be converted
		// element by element
		var searchCols = init.aoSearchCols;
	
		if ( searchCols ) {
			for ( var i=0, ien=searchCols.length ; i<ien ; i++ ) {
				if ( searchCols[i] ) {
					_fnCamelToHungarian( DataTable.models.oSearch, searchCols[i] );
				}
			}
		}
	}
	
	
	/**
	 * Provide backwards compatibility for column options. Note that the new options
	 * are mapped onto the old parameters, so this is an external interface change
	 * only.
	 *  @param {object} init Object to map
	 */
	function _fnCompatCols ( init )
	{
		_fnCompatMap( init, 'orderable',     'bSortable' );
		_fnCompatMap( init, 'orderData',     'aDataSort' );
		_fnCompatMap( init, 'orderSequence', 'asSorting' );
		_fnCompatMap( init, 'orderDataType', 'sortDataType' );
	
		// orderData can be given as an integer
		var dataSort = init.aDataSort;
		if ( typeof dataSort === 'number' && ! $.isArray( dataSort ) ) {
			init.aDataSort = [ dataSort ];
		}
	}
	
	
	/**
	 * Browser feature detection for capabilities, quirks
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBrowserDetect( settings )
	{
		// We don't need to do this every time DataTables is constructed, the values
		// calculated are specific to the browser and OS configuration which we
		// don't expect to change between initialisations
		if ( ! DataTable.__browser ) {
			var browser = {};
			DataTable.__browser = browser;
	
			// Scrolling feature / quirks detection
			var n = $('<div/>')
				.css( {
					position: 'fixed',
					top: 0,
					left: $(window).scrollLeft()*-1, // allow for scrolling
					height: 1,
					width: 1,
					overflow: 'hidden'
				} )
				.append(
					$('<div/>')
						.css( {
							position: 'absolute',
							top: 1,
							left: 1,
							width: 100,
							overflow: 'scroll'
						} )
						.append(
							$('<div/>')
								.css( {
									width: '100%',
									height: 10
								} )
						)
				)
				.appendTo( 'body' );
	
			var outer = n.children();
			var inner = outer.children();
	
			// Numbers below, in order, are:
			// inner.offsetWidth, inner.clientWidth, outer.offsetWidth, outer.clientWidth
			//
			// IE6 XP:                           100 100 100  83
			// IE7 Vista:                        100 100 100  83
			// IE 8+ Windows:                     83  83 100  83
			// Evergreen Windows:                 83  83 100  83
			// Evergreen Mac with scrollbars:     85  85 100  85
			// Evergreen Mac without scrollbars: 100 100 100 100
	
			// Get scrollbar width
			browser.barWidth = outer[0].offsetWidth - outer[0].clientWidth;
	
			// IE6/7 will oversize a width 100% element inside a scrolling element, to
			// include the width of the scrollbar, while other browsers ensure the inner
			// element is contained without forcing scrolling
			browser.bScrollOversize = inner[0].offsetWidth === 100 && outer[0].clientWidth !== 100;
	
			// In rtl text layout, some browsers (most, but not all) will place the
			// scrollbar on the left, rather than the right.
			browser.bScrollbarLeft = Math.round( inner.offset().left ) !== 1;
	
			// IE8- don't provide height and width for getBoundingClientRect
			browser.bBounding = n[0].getBoundingClientRect().width ? true : false;
	
			n.remove();
		}
	
		$.extend( settings.oBrowser, DataTable.__browser );
		settings.oScroll.iBarWidth = DataTable.__browser.barWidth;
	}
	
	
	/**
	 * Array.prototype reduce[Right] method, used for browsers which don't support
	 * JS 1.6. Done this way to reduce code size, since we iterate either way
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnReduce ( that, fn, init, start, end, inc )
	{
		var
			i = start,
			value,
			isSet = false;
	
		if ( init !== undefined ) {
			value = init;
			isSet = true;
		}
	
		while ( i !== end ) {
			if ( ! that.hasOwnProperty(i) ) {
				continue;
			}
	
			value = isSet ?
				fn( value, that[i], i, that ) :
				that[i];
	
			isSet = true;
			i += inc;
		}
	
		return value;
	}
	
	/**
	 * Add a column to the list used for the table with default values
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nTh The th element for this column
	 *  @memberof DataTable#oApi
	 */
	function _fnAddColumn( oSettings, nTh )
	{
		// Add column to aoColumns array
		var oDefaults = DataTable.defaults.column;
		var iCol = oSettings.aoColumns.length;
		var oCol = $.extend( {}, DataTable.models.oColumn, oDefaults, {
			"nTh": nTh ? nTh : document.createElement('th'),
			"sTitle":    oDefaults.sTitle    ? oDefaults.sTitle    : nTh ? nTh.innerHTML : '',
			"aDataSort": oDefaults.aDataSort ? oDefaults.aDataSort : [iCol],
			"mData": oDefaults.mData ? oDefaults.mData : iCol,
			idx: iCol
		} );
		oSettings.aoColumns.push( oCol );
	
		// Add search object for column specific search. Note that the `searchCols[ iCol ]`
		// passed into extend can be undefined. This allows the user to give a default
		// with only some of the parameters defined, and also not give a default
		var searchCols = oSettings.aoPreSearchCols;
		searchCols[ iCol ] = $.extend( {}, DataTable.models.oSearch, searchCols[ iCol ] );
	
		// Use the default column options function to initialise classes etc
		_fnColumnOptions( oSettings, iCol, $(nTh).data() );
	}
	
	
	/**
	 * Apply options for a column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iCol column index to consider
	 *  @param {object} oOptions object with sType, bVisible and bSearchable etc
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnOptions( oSettings, iCol, oOptions )
	{
		var oCol = oSettings.aoColumns[ iCol ];
		var oClasses = oSettings.oClasses;
		var th = $(oCol.nTh);
	
		// Try to get width information from the DOM. We can't get it from CSS
		// as we'd need to parse the CSS stylesheet. `width` option can override
		if ( ! oCol.sWidthOrig ) {
			// Width attribute
			oCol.sWidthOrig = th.attr('width') || null;
	
			// Style attribute
			var t = (th.attr('style') || '').match(/width:\s*(\d+[pxem%]+)/);
			if ( t ) {
				oCol.sWidthOrig = t[1];
			}
		}
	
		/* User specified column options */
		if ( oOptions !== undefined && oOptions !== null )
		{
			// Backwards compatibility
			_fnCompatCols( oOptions );
	
			// Map camel case parameters to their Hungarian counterparts
			_fnCamelToHungarian( DataTable.defaults.column, oOptions, true );
	
			/* Backwards compatibility for mDataProp */
			if ( oOptions.mDataProp !== undefined && !oOptions.mData )
			{
				oOptions.mData = oOptions.mDataProp;
			}
	
			if ( oOptions.sType )
			{
				oCol._sManualType = oOptions.sType;
			}
	
			// `class` is a reserved word in Javascript, so we need to provide
			// the ability to use a valid name for the camel case input
			if ( oOptions.className && ! oOptions.sClass )
			{
				oOptions.sClass = oOptions.className;
			}
			if ( oOptions.sClass ) {
				th.addClass( oOptions.sClass );
			}
	
			$.extend( oCol, oOptions );
			_fnMap( oCol, oOptions, "sWidth", "sWidthOrig" );
	
			/* iDataSort to be applied (backwards compatibility), but aDataSort will take
			 * priority if defined
			 */
			if ( oOptions.iDataSort !== undefined )
			{
				oCol.aDataSort = [ oOptions.iDataSort ];
			}
			_fnMap( oCol, oOptions, "aDataSort" );
		}
	
		/* Cache the data get and set functions for speed */
		var mDataSrc = oCol.mData;
		var mData = _fnGetObjectDataFn( mDataSrc );
		var mRender = oCol.mRender ? _fnGetObjectDataFn( oCol.mRender ) : null;
	
		var attrTest = function( src ) {
			return typeof src === 'string' && src.indexOf('@') !== -1;
		};
		oCol._bAttrSrc = $.isPlainObject( mDataSrc ) && (
			attrTest(mDataSrc.sort) || attrTest(mDataSrc.type) || attrTest(mDataSrc.filter)
		);
		oCol._setter = null;
	
		oCol.fnGetData = function (rowData, type, meta) {
			var innerData = mData( rowData, type, undefined, meta );
	
			return mRender && type ?
				mRender( innerData, type, rowData, meta ) :
				innerData;
		};
		oCol.fnSetData = function ( rowData, val, meta ) {
			return _fnSetObjectDataFn( mDataSrc )( rowData, val, meta );
		};
	
		// Indicate if DataTables should read DOM data as an object or array
		// Used in _fnGetRowElements
		if ( typeof mDataSrc !== 'number' ) {
			oSettings._rowReadObject = true;
		}
	
		/* Feature sorting overrides column specific when off */
		if ( !oSettings.oFeatures.bSort )
		{
			oCol.bSortable = false;
			th.addClass( oClasses.sSortableNone ); // Have to add class here as order event isn't called
		}
	
		/* Check that the class assignment is correct for sorting */
		var bAsc = $.inArray('asc', oCol.asSorting) !== -1;
		var bDesc = $.inArray('desc', oCol.asSorting) !== -1;
		if ( !oCol.bSortable || (!bAsc && !bDesc) )
		{
			oCol.sSortingClass = oClasses.sSortableNone;
			oCol.sSortingClassJUI = "";
		}
		else if ( bAsc && !bDesc )
		{
			oCol.sSortingClass = oClasses.sSortableAsc;
			oCol.sSortingClassJUI = oClasses.sSortJUIAscAllowed;
		}
		else if ( !bAsc && bDesc )
		{
			oCol.sSortingClass = oClasses.sSortableDesc;
			oCol.sSortingClassJUI = oClasses.sSortJUIDescAllowed;
		}
		else
		{
			oCol.sSortingClass = oClasses.sSortable;
			oCol.sSortingClassJUI = oClasses.sSortJUI;
		}
	}
	
	
	/**
	 * Adjust the table column widths for new data. Note: you would probably want to
	 * do a redraw after calling this function!
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAdjustColumnSizing ( settings )
	{
		/* Not interested in doing column width calculation if auto-width is disabled */
		if ( settings.oFeatures.bAutoWidth !== false )
		{
			var columns = settings.aoColumns;
	
			_fnCalculateColumnWidths( settings );
			for ( var i=0 , iLen=columns.length ; i<iLen ; i++ )
			{
				columns[i].nTh.style.width = columns[i].sWidth;
			}
		}
	
		var scroll = settings.oScroll;
		if ( scroll.sY !== '' || scroll.sX !== '')
		{
			_fnScrollDraw( settings );
		}
	
		_fnCallbackFire( settings, null, 'column-sizing', [settings] );
	}
	
	
	/**
	 * Covert the index of a visible column to the index in the data array (take account
	 * of hidden columns)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iMatch Visible column index to lookup
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnVisibleToColumnIndex( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );
	
		return typeof aiVis[iMatch] === 'number' ?
			aiVis[iMatch] :
			null;
	}
	
	
	/**
	 * Covert the index of an index in the data array and convert it to the visible
	 *   column index (take account of hidden columns)
	 *  @param {int} iMatch Column index to lookup
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnIndexToVisible( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );
		var iPos = $.inArray( iMatch, aiVis );
	
		return iPos !== -1 ? iPos : null;
	}
	
	
	/**
	 * Get the number of visible columns
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the number of visible columns
	 *  @memberof DataTable#oApi
	 */
	function _fnVisbleColumns( oSettings )
	{
		var vis = 0;
	
		// No reduce in IE8, use a loop for now
		$.each( oSettings.aoColumns, function ( i, col ) {
			if ( col.bVisible && $(col.nTh).css('display') !== 'none' ) {
				vis++;
			}
		} );
	
		return vis;
	}
	
	
	/**
	 * Get an array of column indexes that match a given property
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sParam Parameter in aoColumns to look for - typically
	 *    bVisible or bSearchable
	 *  @returns {array} Array of indexes with matched properties
	 *  @memberof DataTable#oApi
	 */
	function _fnGetColumns( oSettings, sParam )
	{
		var a = [];
	
		$.map( oSettings.aoColumns, function(val, i) {
			if ( val[sParam] ) {
				a.push( i );
			}
		} );
	
		return a;
	}
	
	
	/**
	 * Calculate the 'type' of a column
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnTypes ( settings )
	{
		var columns = settings.aoColumns;
		var data = settings.aoData;
		var types = DataTable.ext.type.detect;
		var i, ien, j, jen, k, ken;
		var col, cell, detectedType, cache;
	
		// For each column, spin over the 
		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			col = columns[i];
			cache = [];
	
			if ( ! col.sType && col._sManualType ) {
				col.sType = col._sManualType;
			}
			else if ( ! col.sType ) {
				for ( j=0, jen=types.length ; j<jen ; j++ ) {
					for ( k=0, ken=data.length ; k<ken ; k++ ) {
						// Use a cache array so we only need to get the type data
						// from the formatter once (when using multiple detectors)
						if ( cache[k] === undefined ) {
							cache[k] = _fnGetCellData( settings, k, i, 'type' );
						}
	
						detectedType = types[j]( cache[k], settings );
	
						// If null, then this type can't apply to this column, so
						// rather than testing all cells, break out. There is an
						// exception for the last type which is `html`. We need to
						// scan all rows since it is possible to mix string and HTML
						// types
						if ( ! detectedType && j !== types.length-1 ) {
							break;
						}
	
						// Only a single match is needed for html type since it is
						// bottom of the pile and very similar to string
						if ( detectedType === 'html' ) {
							break;
						}
					}
	
					// Type is valid for all data points in the column - use this
					// type
					if ( detectedType ) {
						col.sType = detectedType;
						break;
					}
				}
	
				// Fall back - if no type was detected, always use string
				if ( ! col.sType ) {
					col.sType = 'string';
				}
			}
		}
	}
	
	
	/**
	 * Take the column definitions and static columns arrays and calculate how
	 * they relate to column indexes. The callback function will then apply the
	 * definition found for a column to a suitable configuration object.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aoColDefs The aoColumnDefs array that is to be applied
	 *  @param {array} aoCols The aoColumns array that defines columns individually
	 *  @param {function} fn Callback function - takes two parameters, the calculated
	 *    column index and the definition for that column.
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyColumnDefs( oSettings, aoColDefs, aoCols, fn )
	{
		var i, iLen, j, jLen, k, kLen, def;
		var columns = oSettings.aoColumns;
	
		// Column definitions with aTargets
		if ( aoColDefs )
		{
			/* Loop over the definitions array - loop in reverse so first instance has priority */
			for ( i=aoColDefs.length-1 ; i>=0 ; i-- )
			{
				def = aoColDefs[i];
	
				/* Each definition can target multiple columns, as it is an array */
				var aTargets = def.targets !== undefined ?
					def.targets :
					def.aTargets;
	
				if ( ! $.isArray( aTargets ) )
				{
					aTargets = [ aTargets ];
				}
	
				for ( j=0, jLen=aTargets.length ; j<jLen ; j++ )
				{
					if ( typeof aTargets[j] === 'number' && aTargets[j] >= 0 )
					{
						/* Add columns that we don't yet know about */
						while( columns.length <= aTargets[j] )
						{
							_fnAddColumn( oSettings );
						}
	
						/* Integer, basic index */
						fn( aTargets[j], def );
					}
					else if ( typeof aTargets[j] === 'number' && aTargets[j] < 0 )
					{
						/* Negative integer, right to left column counting */
						fn( columns.length+aTargets[j], def );
					}
					else if ( typeof aTargets[j] === 'string' )
					{
						/* Class name matching on TH element */
						for ( k=0, kLen=columns.length ; k<kLen ; k++ )
						{
							if ( aTargets[j] == "_all" ||
							     $(columns[k].nTh).hasClass( aTargets[j] ) )
							{
								fn( k, def );
							}
						}
					}
				}
			}
		}
	
		// Statically defined columns array
		if ( aoCols )
		{
			for ( i=0, iLen=aoCols.length ; i<iLen ; i++ )
			{
				fn( i, aoCols[i] );
			}
		}
	}
	
	/**
	 * Add a data array to the table, creating DOM node etc. This is the parallel to
	 * _fnGatherData, but for adding rows from a Javascript source, rather than a
	 * DOM source.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aData data array to be added
	 *  @param {node} [nTr] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @returns {int} >=0 if successful (index of new aoData entry), -1 if failed
	 *  @memberof DataTable#oApi
	 */
	function _fnAddData ( oSettings, aDataIn, nTr, anTds )
	{
		/* Create the object for storing information about this new row */
		var iRow = oSettings.aoData.length;
		var oData = $.extend( true, {}, DataTable.models.oRow, {
			src: nTr ? 'dom' : 'data',
			idx: iRow
		} );
	
		oData._aData = aDataIn;
		oSettings.aoData.push( oData );
	
		/* Create the cells */
		var nTd, sThisType;
		var columns = oSettings.aoColumns;
	
		// Invalidate the column types as the new data needs to be revalidated
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
		{
			columns[i].sType = null;
		}
	
		/* Add to the display array */
		oSettings.aiDisplayMaster.push( iRow );
	
		var id = oSettings.rowIdFn( aDataIn );
		if ( id !== undefined ) {
			oSettings.aIds[ id ] = oData;
		}
	
		/* Create the DOM information, or register it if already present */
		if ( nTr || ! oSettings.oFeatures.bDeferRender )
		{
			_fnCreateTr( oSettings, iRow, nTr, anTds );
		}
	
		return iRow;
	}
	
	
	/**
	 * Add one or more TR elements to the table. Generally we'd expect to
	 * use this for reading data from a DOM sourced table, but it could be
	 * used for an TR element. Note that if a TR is given, it is used (i.e.
	 * it is not cloned).
	 *  @param {object} settings dataTables settings object
	 *  @param {array|node|jQuery} trs The TR element(s) to add to the table
	 *  @returns {array} Array of indexes for the added rows
	 *  @memberof DataTable#oApi
	 */
	function _fnAddTr( settings, trs )
	{
		var row;
	
		// Allow an individual node to be passed in
		if ( ! (trs instanceof $) ) {
			trs = $(trs);
		}
	
		return trs.map( function (i, el) {
			row = _fnGetRowElements( settings, el );
			return _fnAddData( settings, row.data, el, row.cells );
		} );
	}
	
	
	/**
	 * Take a TR element and convert it to an index in aoData
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} n the TR element to find
	 *  @returns {int} index if the node is found, null if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToDataIndex( oSettings, n )
	{
		return (n._DT_RowIndex!==undefined) ? n._DT_RowIndex : null;
	}
	
	
	/**
	 * Take a TD element and convert it into a column data index (not the visible index)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow The row number the TD/TH can be found in
	 *  @param {node} n The TD/TH element to find
	 *  @returns {int} index if the node is found, -1 if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToColumnIndex( oSettings, iRow, n )
	{
		return $.inArray( n, oSettings.aoData[ iRow ].anCells );
	}
	
	
	/**
	 * Get the data for a given cell from the internal cache, taking into account data mapping
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {string} type data get type ('display', 'type' 'filter' 'sort')
	 *  @returns {*} Cell data
	 *  @memberof DataTable#oApi
	 */
	function _fnGetCellData( settings, rowIdx, colIdx, type )
	{
		var draw           = settings.iDraw;
		var col            = settings.aoColumns[colIdx];
		var rowData        = settings.aoData[rowIdx]._aData;
		var defaultContent = col.sDefaultContent;
		var cellData       = col.fnGetData( rowData, type, {
			settings: settings,
			row:      rowIdx,
			col:      colIdx
		} );
	
		if ( cellData === undefined ) {
			if ( settings.iDrawError != draw && defaultContent === null ) {
				_fnLog( settings, 0, "Requested unknown parameter "+
					(typeof col.mData=='function' ? '{function}' : "'"+col.mData+"'")+
					" for row "+rowIdx+", column "+colIdx, 4 );
				settings.iDrawError = draw;
			}
			return defaultContent;
		}
	
		// When the data source is null and a specific data type is requested (i.e.
		// not the original data), we can use default column data
		if ( (cellData === rowData || cellData === null) && defaultContent !== null && type !== undefined ) {
			cellData = defaultContent;
		}
		else if ( typeof cellData === 'function' ) {
			// If the data source is a function, then we run it and use the return,
			// executing in the scope of the data object (for instances)
			return cellData.call( rowData );
		}
	
		if ( cellData === null && type == 'display' ) {
			return '';
		}
		return cellData;
	}
	
	
	/**
	 * Set the value for a specific cell, into the internal data cache
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {*} val Value to set
	 *  @memberof DataTable#oApi
	 */
	function _fnSetCellData( settings, rowIdx, colIdx, val )
	{
		var col     = settings.aoColumns[colIdx];
		var rowData = settings.aoData[rowIdx]._aData;
	
		col.fnSetData( rowData, val, {
			settings: settings,
			row:      rowIdx,
			col:      colIdx
		}  );
	}
	
	
	// Private variable that is used to match action syntax in the data property object
	var __reArray = /\[.*?\]$/;
	var __reFn = /\(\)$/;
	
	/**
	 * Split string on periods, taking into account escaped periods
	 * @param  {string} str String to split
	 * @return {array} Split string
	 */
	function _fnSplitObjNotation( str )
	{
		return $.map( str.match(/(\\.|[^\.])+/g) || [''], function ( s ) {
			return s.replace(/\\\./g, '.');
		} );
	}
	
	
	/**
	 * Return a function that can be used to get data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data get function
	 *  @memberof DataTable#oApi
	 */
	function _fnGetObjectDataFn( mSource )
	{
		if ( $.isPlainObject( mSource ) )
		{
			/* Build an object of get functions, and wrap them in a single call */
			var o = {};
			$.each( mSource, function (key, val) {
				if ( val ) {
					o[key] = _fnGetObjectDataFn( val );
				}
			} );
	
			return function (data, type, row, meta) {
				var t = o[type] || o._;
				return t !== undefined ?
					t(data, type, row, meta) :
					data;
			};
		}
		else if ( mSource === null )
		{
			/* Give an empty string for rendering / sorting etc */
			return function (data) { // type, row and meta also passed, but not used
				return data;
			};
		}
		else if ( typeof mSource === 'function' )
		{
			return function (data, type, row, meta) {
				return mSource( data, type, row, meta );
			};
		}
		else if ( typeof mSource === 'string' && (mSource.indexOf('.') !== -1 ||
			      mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1) )
		{
			/* If there is a . in the source string then the data source is in a
			 * nested object so we loop over the data for each level to get the next
			 * level down. On each loop we test for undefined, and if found immediately
			 * return. This allows entire objects to be missing and sDefaultContent to
			 * be used if defined, rather than throwing an error
			 */
			var fetchData = function (data, type, src) {
				var arrayNotation, funcNotation, out, innerSrc;
	
				if ( src !== "" )
				{
					var a = _fnSplitObjNotation( src );
	
					for ( var i=0, iLen=a.length ; i<iLen ; i++ )
					{
						// Check if we are dealing with special notation
						arrayNotation = a[i].match(__reArray);
						funcNotation = a[i].match(__reFn);
	
						if ( arrayNotation )
						{
							// Array notation
							a[i] = a[i].replace(__reArray, '');
	
							// Condition allows simply [] to be passed in
							if ( a[i] !== "" ) {
								data = data[ a[i] ];
							}
							out = [];
	
							// Get the remainder of the nested object to get
							a.splice( 0, i+1 );
							innerSrc = a.join('.');
	
							// Traverse each entry in the array getting the properties requested
							if ( $.isArray( data ) ) {
								for ( var j=0, jLen=data.length ; j<jLen ; j++ ) {
									out.push( fetchData( data[j], type, innerSrc ) );
								}
							}
	
							// If a string is given in between the array notation indicators, that
							// is used to join the strings together, otherwise an array is returned
							var join = arrayNotation[0].substring(1, arrayNotation[0].length-1);
							data = (join==="") ? out : out.join(join);
	
							// The inner call to fetchData has already traversed through the remainder
							// of the source requested, so we exit from the loop
							break;
						}
						else if ( funcNotation )
						{
							// Function call
							a[i] = a[i].replace(__reFn, '');
							data = data[ a[i] ]();
							continue;
						}
	
						if ( data === null || data[ a[i] ] === undefined )
						{
							return undefined;
						}
						data = data[ a[i] ];
					}
				}
	
				return data;
			};
	
			return function (data, type) { // row and meta also passed, but not used
				return fetchData( data, type, mSource );
			};
		}
		else
		{
			/* Array or flat object mapping */
			return function (data, type) { // row and meta also passed, but not used
				return data[mSource];
			};
		}
	}
	
	
	/**
	 * Return a function that can be used to set data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data set function
	 *  @memberof DataTable#oApi
	 */
	function _fnSetObjectDataFn( mSource )
	{
		if ( $.isPlainObject( mSource ) )
		{
			/* Unlike get, only the underscore (global) option is used for for
			 * setting data since we don't know the type here. This is why an object
			 * option is not documented for `mData` (which is read/write), but it is
			 * for `mRender` which is read only.
			 */
			return _fnSetObjectDataFn( mSource._ );
		}
		else if ( mSource === null )
		{
			/* Nothing to do when the data source is null */
			return function () {};
		}
		else if ( typeof mSource === 'function' )
		{
			return function (data, val, meta) {
				mSource( data, 'set', val, meta );
			};
		}
		else if ( typeof mSource === 'string' && (mSource.indexOf('.') !== -1 ||
			      mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1) )
		{
			/* Like the get, we need to get data from a nested object */
			var setData = function (data, val, src) {
				var a = _fnSplitObjNotation( src ), b;
				var aLast = a[a.length-1];
				var arrayNotation, funcNotation, o, innerSrc;
	
				for ( var i=0, iLen=a.length-1 ; i<iLen ; i++ )
				{
					// Check if we are dealing with an array notation request
					arrayNotation = a[i].match(__reArray);
					funcNotation = a[i].match(__reFn);
	
					if ( arrayNotation )
					{
						a[i] = a[i].replace(__reArray, '');
						data[ a[i] ] = [];
	
						// Get the remainder of the nested object to set so we can recurse
						b = a.slice();
						b.splice( 0, i+1 );
						innerSrc = b.join('.');
	
						// Traverse each entry in the array setting the properties requested
						if ( $.isArray( val ) )
						{
							for ( var j=0, jLen=val.length ; j<jLen ; j++ )
							{
								o = {};
								setData( o, val[j], innerSrc );
								data[ a[i] ].push( o );
							}
						}
						else
						{
							// We've been asked to save data to an array, but it
							// isn't array data to be saved. Best that can be done
							// is to just save the value.
							data[ a[i] ] = val;
						}
	
						// The inner call to setData has already traversed through the remainder
						// of the source and has set the data, thus we can exit here
						return;
					}
					else if ( funcNotation )
					{
						// Function call
						a[i] = a[i].replace(__reFn, '');
						data = data[ a[i] ]( val );
					}
	
					// If the nested object doesn't currently exist - since we are
					// trying to set the value - create it
					if ( data[ a[i] ] === null || data[ a[i] ] === undefined )
					{
						data[ a[i] ] = {};
					}
					data = data[ a[i] ];
				}
	
				// Last item in the input - i.e, the actual set
				if ( aLast.match(__reFn ) )
				{
					// Function call
					data = data[ aLast.replace(__reFn, '') ]( val );
				}
				else
				{
					// If array notation is used, we just want to strip it and use the property name
					// and assign the value. If it isn't used, then we get the result we want anyway
					data[ aLast.replace(__reArray, '') ] = val;
				}
			};
	
			return function (data, val) { // meta is also passed in, but not used
				return setData( data, val, mSource );
			};
		}
		else
		{
			/* Array or flat object mapping */
			return function (data, val) { // meta is also passed in, but not used
				data[mSource] = val;
			};
		}
	}
	
	
	/**
	 * Return an array with the full table data
	 *  @param {object} oSettings dataTables settings object
	 *  @returns array {array} aData Master data array
	 *  @memberof DataTable#oApi
	 */
	function _fnGetDataMaster ( settings )
	{
		return _pluck( settings.aoData, '_aData' );
	}
	
	
	/**
	 * Nuke the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnClearTable( settings )
	{
		settings.aoData.length = 0;
		settings.aiDisplayMaster.length = 0;
		settings.aiDisplay.length = 0;
		settings.aIds = {};
	}
	
	
	 /**
	 * Take an array of integers (index array) and remove a target integer (value - not
	 * the key!)
	 *  @param {array} a Index array to target
	 *  @param {int} iTarget value to find
	 *  @memberof DataTable#oApi
	 */
	function _fnDeleteIndex( a, iTarget, splice )
	{
		var iTargetIndex = -1;
	
		for ( var i=0, iLen=a.length ; i<iLen ; i++ )
		{
			if ( a[i] == iTarget )
			{
				iTargetIndex = i;
			}
			else if ( a[i] > iTarget )
			{
				a[i]--;
			}
		}
	
		if ( iTargetIndex != -1 && splice === undefined )
		{
			a.splice( iTargetIndex, 1 );
		}
	}
	
	
	/**
	 * Mark cached data as invalid such that a re-read of the data will occur when
	 * the cached data is next requested. Also update from the data source object.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {int}    rowIdx   Row index to invalidate
	 * @param {string} [src]    Source to invalidate from: undefined, 'auto', 'dom'
	 *     or 'data'
	 * @param {int}    [colIdx] Column index to invalidate. If undefined the whole
	 *     row will be invalidated
	 * @memberof DataTable#oApi
	 *
	 * @todo For the modularisation of v1.11 this will need to become a callback, so
	 *   the sort and filter methods can subscribe to it. That will required
	 *   initialisation options for sorting, which is why it is not already baked in
	 */
	function _fnInvalidate( settings, rowIdx, src, colIdx )
	{
		var row = settings.aoData[ rowIdx ];
		var i, ien;
		var cellWrite = function ( cell, col ) {
			// This is very frustrating, but in IE if you just write directly
			// to innerHTML, and elements that are overwritten are GC'ed,
			// even if there is a reference to them elsewhere
			while ( cell.childNodes.length ) {
				cell.removeChild( cell.firstChild );
			}
	
			cell.innerHTML = _fnGetCellData( settings, rowIdx, col, 'display' );
		};
	
		// Are we reading last data from DOM or the data object?
		if ( src === 'dom' || ((! src || src === 'auto') && row.src === 'dom') ) {
			// Read the data from the DOM
			row._aData = _fnGetRowElements(
					settings, row, colIdx, colIdx === undefined ? undefined : row._aData
				)
				.data;
		}
		else {
			// Reading from data object, update the DOM
			var cells = row.anCells;
	
			if ( cells ) {
				if ( colIdx !== undefined ) {
					cellWrite( cells[colIdx], colIdx );
				}
				else {
					for ( i=0, ien=cells.length ; i<ien ; i++ ) {
						cellWrite( cells[i], i );
					}
				}
			}
		}
	
		// For both row and cell invalidation, the cached data for sorting and
		// filtering is nulled out
		row._aSortData = null;
		row._aFilterData = null;
	
		// Invalidate the type for a specific column (if given) or all columns since
		// the data might have changed
		var cols = settings.aoColumns;
		if ( colIdx !== undefined ) {
			cols[ colIdx ].sType = null;
		}
		else {
			for ( i=0, ien=cols.length ; i<ien ; i++ ) {
				cols[i].sType = null;
			}
	
			// Update DataTables special `DT_*` attributes for the row
			_fnRowAttributes( settings, row );
		}
	}
	
	
	/**
	 * Build a data source object from an HTML row, reading the contents of the
	 * cells that are in the row.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {node|object} TR element from which to read data or existing row
	 *   object from which to re-read the data from the cells
	 * @param {int} [colIdx] Optional column index
	 * @param {array|object} [d] Data source object. If `colIdx` is given then this
	 *   parameter should also be given and will be used to write the data into.
	 *   Only the column in question will be written
	 * @returns {object} Object with two parameters: `data` the data read, in
	 *   document order, and `cells` and array of nodes (they can be useful to the
	 *   caller, so rather than needing a second traversal to get them, just return
	 *   them from here).
	 * @memberof DataTable#oApi
	 */
	function _fnGetRowElements( settings, row, colIdx, d )
	{
		var
			tds = [],
			td = row.firstChild,
			name, col, o, i=0, contents,
			columns = settings.aoColumns,
			objectRead = settings._rowReadObject;
	
		// Allow the data object to be passed in, or construct
		d = d !== undefined ?
			d :
			objectRead ?
				{} :
				[];
	
		var attr = function ( str, td  ) {
			if ( typeof str === 'string' ) {
				var idx = str.indexOf('@');
	
				if ( idx !== -1 ) {
					var attr = str.substring( idx+1 );
					var setter = _fnSetObjectDataFn( str );
					setter( d, td.getAttribute( attr ) );
				}
			}
		};
	
		// Read data from a cell and store into the data object
		var cellProcess = function ( cell ) {
			if ( colIdx === undefined || colIdx === i ) {
				col = columns[i];
				contents = $.trim(cell.innerHTML);
	
				if ( col && col._bAttrSrc ) {
					var setter = _fnSetObjectDataFn( col.mData._ );
					setter( d, contents );
	
					attr( col.mData.sort, cell );
					attr( col.mData.type, cell );
					attr( col.mData.filter, cell );
				}
				else {
					// Depending on the `data` option for the columns the data can
					// be read to either an object or an array.
					if ( objectRead ) {
						if ( ! col._setter ) {
							// Cache the setter function
							col._setter = _fnSetObjectDataFn( col.mData );
						}
						col._setter( d, contents );
					}
					else {
						d[i] = contents;
					}
				}
			}
	
			i++;
		};
	
		if ( td ) {
			// `tr` element was passed in
			while ( td ) {
				name = td.nodeName.toUpperCase();
	
				if ( name == "TD" || name == "TH" ) {
					cellProcess( td );
					tds.push( td );
				}
	
				td = td.nextSibling;
			}
		}
		else {
			// Existing row object passed in
			tds = row.anCells;
	
			for ( var j=0, jen=tds.length ; j<jen ; j++ ) {
				cellProcess( tds[j] );
			}
		}
	
		// Read the ID from the DOM if present
		var rowNode = row.firstChild ? row : row.nTr;
	
		if ( rowNode ) {
			var id = rowNode.getAttribute( 'id' );
	
			if ( id ) {
				_fnSetObjectDataFn( settings.rowId )( d, id );
			}
		}
	
		return {
			data: d,
			cells: tds
		};
	}
	/**
	 * Create a new TR element (and it's TD children) for a row
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow Row to consider
	 *  @param {node} [nTrIn] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @memberof DataTable#oApi
	 */
	function _fnCreateTr ( oSettings, iRow, nTrIn, anTds )
	{
		var
			row = oSettings.aoData[iRow],
			rowData = row._aData,
			cells = [],
			nTr, nTd, oCol,
			i, iLen, create;
	
		if ( row.nTr === null )
		{
			nTr = nTrIn || document.createElement('tr');
	
			row.nTr = nTr;
			row.anCells = cells;
	
			/* Use a private property on the node to allow reserve mapping from the node
			 * to the aoData array for fast look up
			 */
			nTr._DT_RowIndex = iRow;
	
			/* Special parameters can be given by the data source to be used on the row */
			_fnRowAttributes( oSettings, row );
	
			/* Process each column */
			for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				oCol = oSettings.aoColumns[i];
				create = nTrIn ? false : true;
	
				nTd = create ? document.createElement( oCol.sCellType ) : anTds[i];
				nTd._DT_CellIndex = {
					row: iRow,
					column: i
				};
				
				cells.push( nTd );
	
				// Need to create the HTML if new, or if a rendering function is defined
				if ( create || ((!nTrIn || oCol.mRender || oCol.mData !== i) &&
					 (!$.isPlainObject(oCol.mData) || oCol.mData._ !== i+'.display')
				)) {
					nTd.innerHTML = _fnGetCellData( oSettings, iRow, i, 'display' );
				}
	
				/* Add user defined class */
				if ( oCol.sClass )
				{
					nTd.className += ' '+oCol.sClass;
				}
	
				// Visibility - add or remove as required
				if ( oCol.bVisible && ! nTrIn )
				{
					nTr.appendChild( nTd );
				}
				else if ( ! oCol.bVisible && nTrIn )
				{
					nTd.parentNode.removeChild( nTd );
				}
	
				if ( oCol.fnCreatedCell )
				{
					oCol.fnCreatedCell.call( oSettings.oInstance,
						nTd, _fnGetCellData( oSettings, iRow, i ), rowData, iRow, i
					);
				}
			}
	
			_fnCallbackFire( oSettings, 'aoRowCreatedCallback', null, [nTr, rowData, iRow, cells] );
		}
	
		// Remove once webkit bug 131819 and Chromium bug 365619 have been resolved
		// and deployed
		row.nTr.setAttribute( 'role', 'row' );
	}
	
	
	/**
	 * Add attributes to a row based on the special `DT_*` parameters in a data
	 * source object.
	 *  @param {object} settings DataTables settings object
	 *  @param {object} DataTables row object for the row to be modified
	 *  @memberof DataTable#oApi
	 */
	function _fnRowAttributes( settings, row )
	{
		var tr = row.nTr;
		var data = row._aData;
	
		if ( tr ) {
			var id = settings.rowIdFn( data );
	
			if ( id ) {
				tr.id = id;
			}
	
			if ( data.DT_RowClass ) {
				// Remove any classes added by DT_RowClass before
				var a = data.DT_RowClass.split(' ');
				row.__rowc = row.__rowc ?
					_unique( row.__rowc.concat( a ) ) :
					a;
	
				$(tr)
					.removeClass( row.__rowc.join(' ') )
					.addClass( data.DT_RowClass );
			}
	
			if ( data.DT_RowAttr ) {
				$(tr).attr( data.DT_RowAttr );
			}
	
			if ( data.DT_RowData ) {
				$(tr).data( data.DT_RowData );
			}
		}
	}
	
	
	/**
	 * Create the HTML header for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBuildHead( oSettings )
	{
		var i, ien, cell, row, column;
		var thead = oSettings.nTHead;
		var tfoot = oSettings.nTFoot;
		var createHeader = $('th, td', thead).length === 0;
		var classes = oSettings.oClasses;
		var columns = oSettings.aoColumns;
	
		if ( createHeader ) {
			row = $('<tr/>').appendTo( thead );
		}
	
		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			column = columns[i];
			cell = $( column.nTh ).addClass( column.sClass );
	
			if ( createHeader ) {
				cell.appendTo( row );
			}
	
			// 1.11 move into sorting
			if ( oSettings.oFeatures.bSort ) {
				cell.addClass( column.sSortingClass );
	
				if ( column.bSortable !== false ) {
					cell
						.attr( 'tabindex', oSettings.iTabIndex )
						.attr( 'aria-controls', oSettings.sTableId );
	
					_fnSortAttachListener( oSettings, column.nTh, i );
				}
			}
	
			if ( column.sTitle != cell[0].innerHTML ) {
				cell.html( column.sTitle );
			}
	
			_fnRenderer( oSettings, 'header' )(
				oSettings, cell, column, classes
			);
		}
	
		if ( createHeader ) {
			_fnDetectHeader( oSettings.aoHeader, thead );
		}
		
		/* ARIA role for the rows */
	 	$(thead).find('>tr').attr('role', 'row');
	
		/* Deal with the footer - add classes if required */
		$(thead).find('>tr>th, >tr>td').addClass( classes.sHeaderTH );
		$(tfoot).find('>tr>th, >tr>td').addClass( classes.sFooterTH );
	
		// Cache the footer cells. Note that we only take the cells from the first
		// row in the footer. If there is more than one row the user wants to
		// interact with, they need to use the table().foot() method. Note also this
		// allows cells to be used for multiple columns using colspan
		if ( tfoot !== null ) {
			var cells = oSettings.aoFooter[0];
	
			for ( i=0, ien=cells.length ; i<ien ; i++ ) {
				column = columns[i];
				column.nTf = cells[i].cell;
	
				if ( column.sClass ) {
					$(column.nTf).addClass( column.sClass );
				}
			}
		}
	}
	
	
	/**
	 * Draw the header (or footer) element based on the column visibility states. The
	 * methodology here is to use the layout array from _fnDetectHeader, modified for
	 * the instantaneous column visibility, to construct the new layout. The grid is
	 * traversed over cell at a time in a rows x columns grid fashion, although each
	 * cell insert can cover multiple elements in the grid - which is tracks using the
	 * aApplied array. Cell inserts in the grid will only occur where there isn't
	 * already a cell in that position.
	 *  @param {object} oSettings dataTables settings object
	 *  @param array {objects} aoSource Layout array from _fnDetectHeader
	 *  @param {boolean} [bIncludeHidden=false] If true then include the hidden columns in the calc,
	 *  @memberof DataTable#oApi
	 */
	function _fnDrawHead( oSettings, aoSource, bIncludeHidden )
	{
		var i, iLen, j, jLen, k, kLen, n, nLocalTr;
		var aoLocal = [];
		var aApplied = [];
		var iColumns = oSettings.aoColumns.length;
		var iRowspan, iColspan;
	
		if ( ! aoSource )
		{
			return;
		}
	
		if (  bIncludeHidden === undefined )
		{
			bIncludeHidden = false;
		}
	
		/* Make a copy of the master layout array, but without the visible columns in it */
		for ( i=0, iLen=aoSource.length ; i<iLen ; i++ )
		{
			aoLocal[i] = aoSource[i].slice();
			aoLocal[i].nTr = aoSource[i].nTr;
	
			/* Remove any columns which are currently hidden */
			for ( j=iColumns-1 ; j>=0 ; j-- )
			{
				if ( !oSettings.aoColumns[j].bVisible && !bIncludeHidden )
				{
					aoLocal[i].splice( j, 1 );
				}
			}
	
			/* Prep the applied array - it needs an element for each row */
			aApplied.push( [] );
		}
	
		for ( i=0, iLen=aoLocal.length ; i<iLen ; i++ )
		{
			nLocalTr = aoLocal[i].nTr;
	
			/* All cells are going to be replaced, so empty out the row */
			if ( nLocalTr )
			{
				while( (n = nLocalTr.firstChild) )
				{
					nLocalTr.removeChild( n );
				}
			}
	
			for ( j=0, jLen=aoLocal[i].length ; j<jLen ; j++ )
			{
				iRowspan = 1;
				iColspan = 1;
	
				/* Check to see if there is already a cell (row/colspan) covering our target
				 * insert point. If there is, then there is nothing to do.
				 */
				if ( aApplied[i][j] === undefined )
				{
					nLocalTr.appendChild( aoLocal[i][j].cell );
					aApplied[i][j] = 1;
	
					/* Expand the cell to cover as many rows as needed */
					while ( aoLocal[i+iRowspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i+iRowspan][j].cell )
					{
						aApplied[i+iRowspan][j] = 1;
						iRowspan++;
					}
	
					/* Expand the cell to cover as many columns as needed */
					while ( aoLocal[i][j+iColspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i][j+iColspan].cell )
					{
						/* Must update the applied array over the rows for the columns */
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aApplied[i+k][j+iColspan] = 1;
						}
						iColspan++;
					}
	
					/* Do the actual expansion in the DOM */
					$(aoLocal[i][j].cell)
						.attr('rowspan', iRowspan)
						.attr('colspan', iColspan);
				}
			}
		}
	}
	
	
	/**
	 * Insert the required TR nodes into the table for display
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnDraw( oSettings )
	{
		/* Provide a pre-callback function which can be used to cancel the draw is false is returned */
		var aPreDraw = _fnCallbackFire( oSettings, 'aoPreDrawCallback', 'preDraw', [oSettings] );
		if ( $.inArray( false, aPreDraw ) !== -1 )
		{
			_fnProcessingDisplay( oSettings, false );
			return;
		}
	
		var i, iLen, n;
		var anRows = [];
		var iRowCount = 0;
		var asStripeClasses = oSettings.asStripeClasses;
		var iStripes = asStripeClasses.length;
		var iOpenRows = oSettings.aoOpenRows.length;
		var oLang = oSettings.oLanguage;
		var iInitDisplayStart = oSettings.iInitDisplayStart;
		var bServerSide = _fnDataSource( oSettings ) == 'ssp';
		var aiDisplay = oSettings.aiDisplay;
	
		oSettings.bDrawing = true;
	
		/* Check and see if we have an initial draw position from state saving */
		if ( iInitDisplayStart !== undefined && iInitDisplayStart !== -1 )
		{
			oSettings._iDisplayStart = bServerSide ?
				iInitDisplayStart :
				iInitDisplayStart >= oSettings.fnRecordsDisplay() ?
					0 :
					iInitDisplayStart;
	
			oSettings.iInitDisplayStart = -1;
		}
	
		var iDisplayStart = oSettings._iDisplayStart;
		var iDisplayEnd = oSettings.fnDisplayEnd();
	
		/* Server-side processing draw intercept */
		if ( oSettings.bDeferLoading )
		{
			oSettings.bDeferLoading = false;
			oSettings.iDraw++;
			_fnProcessingDisplay( oSettings, false );
		}
		else if ( !bServerSide )
		{
			oSettings.iDraw++;
		}
		else if ( !oSettings.bDestroying && !_fnAjaxUpdate( oSettings ) )
		{
			return;
		}
	
		if ( aiDisplay.length !== 0 )
		{
			var iStart = bServerSide ? 0 : iDisplayStart;
			var iEnd = bServerSide ? oSettings.aoData.length : iDisplayEnd;
	
			for ( var j=iStart ; j<iEnd ; j++ )
			{
				var iDataIndex = aiDisplay[j];
				var aoData = oSettings.aoData[ iDataIndex ];
				if ( aoData.nTr === null )
				{
					_fnCreateTr( oSettings, iDataIndex );
				}
	
				var nRow = aoData.nTr;
	
				/* Remove the old striping classes and then add the new one */
				if ( iStripes !== 0 )
				{
					var sStripe = asStripeClasses[ iRowCount % iStripes ];
					if ( aoData._sRowStripe != sStripe )
					{
						$(nRow).removeClass( aoData._sRowStripe ).addClass( sStripe );
						aoData._sRowStripe = sStripe;
					}
				}
	
				// Row callback functions - might want to manipulate the row
				// iRowCount and j are not currently documented. Are they at all
				// useful?
				_fnCallbackFire( oSettings, 'aoRowCallback', null,
					[nRow, aoData._aData, iRowCount, j, iDataIndex] );
	
				anRows.push( nRow );
				iRowCount++;
			}
		}
		else
		{
			/* Table is empty - create a row with an empty message in it */
			var sZero = oLang.sZeroRecords;
			if ( oSettings.iDraw == 1 &&  _fnDataSource( oSettings ) == 'ajax' )
			{
				sZero = oLang.sLoadingRecords;
			}
			else if ( oLang.sEmptyTable && oSettings.fnRecordsTotal() === 0 )
			{
				sZero = oLang.sEmptyTable;
			}
	
			anRows[ 0 ] = $( '<tr/>', { 'class': iStripes ? asStripeClasses[0] : '' } )
				.append( $('<td />', {
					'valign':  'top',
					'colSpan': _fnVisbleColumns( oSettings ),
					'class':   oSettings.oClasses.sRowEmpty
				} ).html( sZero ) )[0];
		}
	
		/* Header and footer callbacks */
		_fnCallbackFire( oSettings, 'aoHeaderCallback', 'header', [ $(oSettings.nTHead).children('tr')[0],
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );
	
		_fnCallbackFire( oSettings, 'aoFooterCallback', 'footer', [ $(oSettings.nTFoot).children('tr')[0],
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );
	
		var body = $(oSettings.nTBody);
	
		body.children().detach();
		body.append( $(anRows) );
	
		/* Call all required callback functions for the end of a draw */
		_fnCallbackFire( oSettings, 'aoDrawCallback', 'draw', [oSettings] );
	
		/* Draw is complete, sorting and filtering must be as well */
		oSettings.bSorted = false;
		oSettings.bFiltered = false;
		oSettings.bDrawing = false;
	}
	
	
	/**
	 * Redraw the table - taking account of the various features which are enabled
	 *  @param {object} oSettings dataTables settings object
	 *  @param {boolean} [holdPosition] Keep the current paging position. By default
	 *    the paging is reset to the first page
	 *  @memberof DataTable#oApi
	 */
	function _fnReDraw( settings, holdPosition )
	{
		var
			features = settings.oFeatures,
			sort     = features.bSort,
			filter   = features.bFilter;
	
		if ( sort ) {
			_fnSort( settings );
		}
	
		if ( filter ) {
			_fnFilterComplete( settings, settings.oPreviousSearch );
		}
		else {
			// No filtering, so we want to just use the display master
			settings.aiDisplay = settings.aiDisplayMaster.slice();
		}
	
		if ( holdPosition !== true ) {
			settings._iDisplayStart = 0;
		}
	
		// Let any modules know about the draw hold position state (used by
		// scrolling internally)
		settings._drawHold = holdPosition;
	
		_fnDraw( settings );
	
		settings._drawHold = false;
	}
	
	
	/**
	 * Add the options to the page HTML for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAddOptionsHtml ( oSettings )
	{
		var classes = oSettings.oClasses;
		var table = $(oSettings.nTable);
		var holding = $('<div/>').insertBefore( table ); // Holding element for speed
		var features = oSettings.oFeatures;
	
		// All DataTables are wrapped in a div
		var insert = $('<div/>', {
			id:      oSettings.sTableId+'_wrapper',
			'class': classes.sWrapper + (oSettings.nTFoot ? '' : ' '+classes.sNoFooter)
		} );
	
		oSettings.nHolding = holding[0];
		oSettings.nTableWrapper = insert[0];
		oSettings.nTableReinsertBefore = oSettings.nTable.nextSibling;
	
		/* Loop over the user set positioning and place the elements as needed */
		var aDom = oSettings.sDom.split('');
		var featureNode, cOption, nNewNode, cNext, sAttr, j;
		for ( var i=0 ; i<aDom.length ; i++ )
		{
			featureNode = null;
			cOption = aDom[i];
	
			if ( cOption == '<' )
			{
				/* New container div */
				nNewNode = $('<div/>')[0];
	
				/* Check to see if we should append an id and/or a class name to the container */
				cNext = aDom[i+1];
				if ( cNext == "'" || cNext == '"' )
				{
					sAttr = "";
					j = 2;
					while ( aDom[i+j] != cNext )
					{
						sAttr += aDom[i+j];
						j++;
					}
	
					/* Replace jQuery UI constants @todo depreciated */
					if ( sAttr == "H" )
					{
						sAttr = classes.sJUIHeader;
					}
					else if ( sAttr == "F" )
					{
						sAttr = classes.sJUIFooter;
					}
	
					/* The attribute can be in the format of "#id.class", "#id" or "class" This logic
					 * breaks the string into parts and applies them as needed
					 */
					if ( sAttr.indexOf('.') != -1 )
					{
						var aSplit = sAttr.split('.');
						nNewNode.id = aSplit[0].substr(1, aSplit[0].length-1);
						nNewNode.className = aSplit[1];
					}
					else if ( sAttr.charAt(0) == "#" )
					{
						nNewNode.id = sAttr.substr(1, sAttr.length-1);
					}
					else
					{
						nNewNode.className = sAttr;
					}
	
					i += j; /* Move along the position array */
				}
	
				insert.append( nNewNode );
				insert = $(nNewNode);
			}
			else if ( cOption == '>' )
			{
				/* End container div */
				insert = insert.parent();
			}
			// @todo Move options into their own plugins?
			else if ( cOption == 'l' && features.bPaginate && features.bLengthChange )
			{
				/* Length */
				featureNode = _fnFeatureHtmlLength( oSettings );
			}
			else if ( cOption == 'f' && features.bFilter )
			{
				/* Filter */
				featureNode = _fnFeatureHtmlFilter( oSettings );
			}
			else if ( cOption == 'r' && features.bProcessing )
			{
				/* pRocessing */
				featureNode = _fnFeatureHtmlProcessing( oSettings );
			}
			else if ( cOption == 't' )
			{
				/* Table */
				featureNode = _fnFeatureHtmlTable( oSettings );
			}
			else if ( cOption ==  'i' && features.bInfo )
			{
				/* Info */
				featureNode = _fnFeatureHtmlInfo( oSettings );
			}
			else if ( cOption == 'p' && features.bPaginate )
			{
				/* Pagination */
				featureNode = _fnFeatureHtmlPaginate( oSettings );
			}
			else if ( DataTable.ext.feature.length !== 0 )
			{
				/* Plug-in features */
				var aoFeatures = DataTable.ext.feature;
				for ( var k=0, kLen=aoFeatures.length ; k<kLen ; k++ )
				{
					if ( cOption == aoFeatures[k].cFeature )
					{
						featureNode = aoFeatures[k].fnInit( oSettings );
						break;
					}
				}
			}
	
			/* Add to the 2D features array */
			if ( featureNode )
			{
				var aanFeatures = oSettings.aanFeatures;
	
				if ( ! aanFeatures[cOption] )
				{
					aanFeatures[cOption] = [];
				}
	
				aanFeatures[cOption].push( featureNode );
				insert.append( featureNode );
			}
		}
	
		/* Built our DOM structure - replace the holding div with what we want */
		holding.replaceWith( insert );
		oSettings.nHolding = null;
	}
	
	
	/**
	 * Use the DOM source to create up an array of header cells. The idea here is to
	 * create a layout grid (array) of rows x columns, which contains a reference
	 * to the cell that that point in the grid (regardless of col/rowspan), such that
	 * any column / row could be removed and the new grid constructed
	 *  @param array {object} aLayout Array to store the calculated layout in
	 *  @param {node} nThead The header/footer element for the table
	 *  @memberof DataTable#oApi
	 */
	function _fnDetectHeader ( aLayout, nThead )
	{
		var nTrs = $(nThead).children('tr');
		var nTr, nCell;
		var i, k, l, iLen, jLen, iColShifted, iColumn, iColspan, iRowspan;
		var bUnique;
		var fnShiftCol = function ( a, i, j ) {
			var k = a[i];
	                while ( k[j] ) {
				j++;
			}
			return j;
		};
	
		aLayout.splice( 0, aLayout.length );
	
		/* We know how many rows there are in the layout - so prep it */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			aLayout.push( [] );
		}
	
		/* Calculate a layout array */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			nTr = nTrs[i];
			iColumn = 0;
	
			/* For every cell in the row... */
			nCell = nTr.firstChild;
			while ( nCell ) {
				if ( nCell.nodeName.toUpperCase() == "TD" ||
				     nCell.nodeName.toUpperCase() == "TH" )
				{
					/* Get the col and rowspan attributes from the DOM and sanitise them */
					iColspan = nCell.getAttribute('colspan') * 1;
					iRowspan = nCell.getAttribute('rowspan') * 1;
					iColspan = (!iColspan || iColspan===0 || iColspan===1) ? 1 : iColspan;
					iRowspan = (!iRowspan || iRowspan===0 || iRowspan===1) ? 1 : iRowspan;
	
					/* There might be colspan cells already in this row, so shift our target
					 * accordingly
					 */
					iColShifted = fnShiftCol( aLayout, i, iColumn );
	
					/* Cache calculation for unique columns */
					bUnique = iColspan === 1 ? true : false;
	
					/* If there is col / rowspan, copy the information into the layout grid */
					for ( l=0 ; l<iColspan ; l++ )
					{
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aLayout[i+k][iColShifted+l] = {
								"cell": nCell,
								"unique": bUnique
							};
							aLayout[i+k].nTr = nTr;
						}
					}
				}
				nCell = nCell.nextSibling;
			}
		}
	}
	
	
	/**
	 * Get an array of unique th elements, one for each column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nHeader automatically detect the layout from this node - optional
	 *  @param {array} aLayout thead/tfoot layout from _fnDetectHeader - optional
	 *  @returns array {node} aReturn list of unique th's
	 *  @memberof DataTable#oApi
	 */
	function _fnGetUniqueThs ( oSettings, nHeader, aLayout )
	{
		var aReturn = [];
		if ( !aLayout )
		{
			aLayout = oSettings.aoHeader;
			if ( nHeader )
			{
				aLayout = [];
				_fnDetectHeader( aLayout, nHeader );
			}
		}
	
		for ( var i=0, iLen=aLayout.length ; i<iLen ; i++ )
		{
			for ( var j=0, jLen=aLayout[i].length ; j<jLen ; j++ )
			{
				if ( aLayout[i][j].unique &&
					 (!aReturn[j] || !oSettings.bSortCellsTop) )
				{
					aReturn[j] = aLayout[i][j].cell;
				}
			}
		}
	
		return aReturn;
	}
	
	/**
	 * Create an Ajax call based on the table's settings, taking into account that
	 * parameters can have multiple forms, and backwards compatibility.
	 *
	 * @param {object} oSettings dataTables settings object
	 * @param {array} data Data to send to the server, required by
	 *     DataTables - may be augmented by developer callbacks
	 * @param {function} fn Callback function to run when data is obtained
	 */
	function _fnBuildAjax( oSettings, data, fn )
	{
		// Compatibility with 1.9-, allow fnServerData and event to manipulate
		_fnCallbackFire( oSettings, 'aoServerParams', 'serverParams', [data] );
	
		// Convert to object based for 1.10+ if using the old array scheme which can
		// come from server-side processing or serverParams
		if ( data && $.isArray(data) ) {
			var tmp = {};
			var rbracket = /(.*?)\[\]$/;
	
			$.each( data, function (key, val) {
				var match = val.name.match(rbracket);
	
				if ( match ) {
					// Support for arrays
					var name = match[0];
	
					if ( ! tmp[ name ] ) {
						tmp[ name ] = [];
					}
					tmp[ name ].push( val.value );
				}
				else {
					tmp[val.name] = val.value;
				}
			} );
			data = tmp;
		}
	
		var ajaxData;
		var ajax = oSettings.ajax;
		var instance = oSettings.oInstance;
		var callback = function ( json ) {
			_fnCallbackFire( oSettings, null, 'xhr', [oSettings, json, oSettings.jqXHR] );
			fn( json );
		};
	
		if ( $.isPlainObject( ajax ) && ajax.data )
		{
			ajaxData = ajax.data;
	
			var newData = typeof ajaxData === 'function' ?
				ajaxData( data, oSettings ) :  // fn can manipulate data or return
				ajaxData;                      // an object object or array to merge
	
			// If the function returned something, use that alone
			data = typeof ajaxData === 'function' && newData ?
				newData :
				$.extend( true, data, newData );
	
			// Remove the data property as we've resolved it already and don't want
			// jQuery to do it again (it is restored at the end of the function)
			delete ajax.data;
		}
	
		var baseAjax = {
			"data": data,
			"success": function (json) {
				var error = json.error || json.sError;
				if ( error ) {
					_fnLog( oSettings, 0, error );
				}
	
				oSettings.json = json;
				callback( json );
			},
			"dataType": "json",
			"cache": false,
			"type": oSettings.sServerMethod,
			"error": function (xhr, error, thrown) {
				var ret = _fnCallbackFire( oSettings, null, 'xhr', [oSettings, null, oSettings.jqXHR] );
	
				if ( $.inArray( true, ret ) === -1 ) {
					if ( error == "parsererror" ) {
						_fnLog( oSettings, 0, 'Invalid JSON response', 1 );
					}
					else if ( xhr.readyState === 4 ) {
						_fnLog( oSettings, 0, 'Ajax error', 7 );
					}
				}
	
				_fnProcessingDisplay( oSettings, false );
			}
		};
	
		// Store the data submitted for the API
		oSettings.oAjaxData = data;
	
		// Allow plug-ins and external processes to modify the data
		_fnCallbackFire( oSettings, null, 'preXhr', [oSettings, data] );
	
		if ( oSettings.fnServerData )
		{
			// DataTables 1.9- compatibility
			oSettings.fnServerData.call( instance,
				oSettings.sAjaxSource,
				$.map( data, function (val, key) { // Need to convert back to 1.9 trad format
					return { name: key, value: val };
				} ),
				callback,
				oSettings
			);
		}
		else if ( oSettings.sAjaxSource || typeof ajax === 'string' )
		{
			// DataTables 1.9- compatibility
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, {
				url: ajax || oSettings.sAjaxSource
			} ) );
		}
		else if ( typeof ajax === 'function' )
		{
			// Is a function - let the caller define what needs to be done
			oSettings.jqXHR = ajax.call( instance, data, callback, oSettings );
		}
		else
		{
			// Object to extend the base settings
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, ajax ) );
	
			// Restore for next time around
			ajax.data = ajaxData;
		}
	}
	
	
	/**
	 * Update the table using an Ajax call
	 *  @param {object} settings dataTables settings object
	 *  @returns {boolean} Block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdate( settings )
	{
		if ( settings.bAjaxDataGet ) {
			settings.iDraw++;
			_fnProcessingDisplay( settings, true );
	
			_fnBuildAjax(
				settings,
				_fnAjaxParameters( settings ),
				function(json) {
					_fnAjaxUpdateDraw( settings, json );
				}
			);
	
			return false;
		}
		return true;
	}
	
	
	/**
	 * Build up the parameters in an object needed for a server-side processing
	 * request. Note that this is basically done twice, is different ways - a modern
	 * method which is used by default in DataTables 1.10 which uses objects and
	 * arrays, or the 1.9- method with is name / value pairs. 1.9 method is used if
	 * the sAjaxSource option is used in the initialisation, or the legacyAjax
	 * option is set.
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {bool} block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxParameters( settings )
	{
		var
			columns = settings.aoColumns,
			columnCount = columns.length,
			features = settings.oFeatures,
			preSearch = settings.oPreviousSearch,
			preColSearch = settings.aoPreSearchCols,
			i, data = [], dataProp, column, columnSearch,
			sort = _fnSortFlatten( settings ),
			displayStart = settings._iDisplayStart,
			displayLength = features.bPaginate !== false ?
				settings._iDisplayLength :
				-1;
	
		var param = function ( name, value ) {
			data.push( { 'name': name, 'value': value } );
		};
	
		// DataTables 1.9- compatible method
		param( 'sEcho',          settings.iDraw );
		param( 'iColumns',       columnCount );
		param( 'sColumns',       _pluck( columns, 'sName' ).join(',') );
		param( 'iDisplayStart',  displayStart );
		param( 'iDisplayLength', displayLength );
	
		// DataTables 1.10+ method
		var d = {
			draw:    settings.iDraw,
			columns: [],
			order:   [],
			start:   displayStart,
			length:  displayLength,
			search:  {
				value: preSearch.sSearch,
				regex: preSearch.bRegex
			}
		};
	
		for ( i=0 ; i<columnCount ; i++ ) {
			column = columns[i];
			columnSearch = preColSearch[i];
			dataProp = typeof column.mData=="function" ? 'function' : column.mData ;
	
			d.columns.push( {
				data:       dataProp,
				name:       column.sName,
				searchable: column.bSearchable,
				orderable:  column.bSortable,
				search:     {
					value: columnSearch.sSearch,
					regex: columnSearch.bRegex
				}
			} );
	
			param( "mDataProp_"+i, dataProp );
	
			if ( features.bFilter ) {
				param( 'sSearch_'+i,     columnSearch.sSearch );
				param( 'bRegex_'+i,      columnSearch.bRegex );
				param( 'bSearchable_'+i, column.bSearchable );
			}
	
			if ( features.bSort ) {
				param( 'bSortable_'+i, column.bSortable );
			}
		}
	
		if ( features.bFilter ) {
			param( 'sSearch', preSearch.sSearch );
			param( 'bRegex', preSearch.bRegex );
		}
	
		if ( features.bSort ) {
			$.each( sort, function ( i, val ) {
				d.order.push( { column: val.col, dir: val.dir } );
	
				param( 'iSortCol_'+i, val.col );
				param( 'sSortDir_'+i, val.dir );
			} );
	
			param( 'iSortingCols', sort.length );
		}
	
		// If the legacy.ajax parameter is null, then we automatically decide which
		// form to use, based on sAjaxSource
		var legacy = DataTable.ext.legacy.ajax;
		if ( legacy === null ) {
			return settings.sAjaxSource ? data : d;
		}
	
		// Otherwise, if legacy has been specified then we use that to decide on the
		// form
		return legacy ? data : d;
	}
	
	
	/**
	 * Data the data from the server (nuking the old) and redraw the table
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} json json data return from the server.
	 *  @param {string} json.sEcho Tracking flag for DataTables to match requests
	 *  @param {int} json.iTotalRecords Number of records in the data set, not accounting for filtering
	 *  @param {int} json.iTotalDisplayRecords Number of records in the data set, accounting for filtering
	 *  @param {array} json.aaData The data to display on this page
	 *  @param {string} [json.sColumns] Column ordering (sName, comma separated)
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdateDraw ( settings, json )
	{
		// v1.10 uses camelCase variables, while 1.9 uses Hungarian notation.
		// Support both
		var compat = function ( old, modern ) {
			return json[old] !== undefined ? json[old] : json[modern];
		};
	
		var data = _fnAjaxDataSrc( settings, json );
		var draw            = compat( 'sEcho',                'draw' );
		var recordsTotal    = compat( 'iTotalRecords',        'recordsTotal' );
		var recordsFiltered = compat( 'iTotalDisplayRecords', 'recordsFiltered' );
	
		if ( draw ) {
			// Protect against out of sequence returns
			if ( draw*1 < settings.iDraw ) {
				return;
			}
			settings.iDraw = draw * 1;
		}
	
		_fnClearTable( settings );
		settings._iRecordsTotal   = parseInt(recordsTotal, 10);
		settings._iRecordsDisplay = parseInt(recordsFiltered, 10);
	
		for ( var i=0, ien=data.length ; i<ien ; i++ ) {
			_fnAddData( settings, data[i] );
		}
		settings.aiDisplay = settings.aiDisplayMaster.slice();
	
		settings.bAjaxDataGet = false;
		_fnDraw( settings );
	
		if ( ! settings._bInitComplete ) {
			_fnInitComplete( settings, json );
		}
	
		settings.bAjaxDataGet = true;
		_fnProcessingDisplay( settings, false );
	}
	
	
	/**
	 * Get the data from the JSON data source to use for drawing a table. Using
	 * `_fnGetObjectDataFn` allows the data to be sourced from a property of the
	 * source object, or from a processing function.
	 *  @param {object} oSettings dataTables settings object
	 *  @param  {object} json Data source object / array from the server
	 *  @return {array} Array of data to use
	 */
	function _fnAjaxDataSrc ( oSettings, json )
	{
		var dataSrc = $.isPlainObject( oSettings.ajax ) && oSettings.ajax.dataSrc !== undefined ?
			oSettings.ajax.dataSrc :
			oSettings.sAjaxDataProp; // Compatibility with 1.9-.
	
		// Compatibility with 1.9-. In order to read from aaData, check if the
		// default has been changed, if not, check for aaData
		if ( dataSrc === 'data' ) {
			return json.aaData || json[dataSrc];
		}
	
		return dataSrc !== "" ?
			_fnGetObjectDataFn( dataSrc )( json ) :
			json;
	}
	
	/**
	 * Generate the node required for filtering text
	 *  @returns {node} Filter control element
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlFilter ( settings )
	{
		var classes = settings.oClasses;
		var tableId = settings.sTableId;
		var language = settings.oLanguage;
		var previousSearch = settings.oPreviousSearch;
		var features = settings.aanFeatures;
		var input = '<input type="search" class="'+classes.sFilterInput+'"/>';
	
		var str = language.sSearch;
		str = str.match(/_INPUT_/) ?
			str.replace('_INPUT_', input) :
			str+input;
	
		var filter = $('<div/>', {
				'id': ! features.f ? tableId+'_filter' : null,
				'class': classes.sFilter
			} )
			.append( $('<label/>' ).append( str ) );
	
		var searchFn = function() {
			/* Update all other filter input elements for the new display */
			var n = features.f;
			var val = !this.value ? "" : this.value; // mental IE8 fix :-(
	
			/* Now do the filter */
			if ( val != previousSearch.sSearch ) {
				_fnFilterComplete( settings, {
					"sSearch": val,
					"bRegex": previousSearch.bRegex,
					"bSmart": previousSearch.bSmart ,
					"bCaseInsensitive": previousSearch.bCaseInsensitive
				} );
	
				// Need to redraw, without resorting
				settings._iDisplayStart = 0;
				_fnDraw( settings );
			}
		};
	
		var searchDelay = settings.searchDelay !== null ?
			settings.searchDelay :
			_fnDataSource( settings ) === 'ssp' ?
				400 :
				0;
	
		var jqFilter = $('input', filter)
			.val( previousSearch.sSearch )
			.attr( 'placeholder', language.sSearchPlaceholder )
			.on(
				'keyup.DT search.DT input.DT paste.DT cut.DT',
				searchDelay ?
					_fnThrottle( searchFn, searchDelay ) :
					searchFn
			)
			.on( 'keypress.DT', function(e) {
				/* Prevent form submission */
				if ( e.keyCode == 13 ) {
					return false;
				}
			} )
			.attr('aria-controls', tableId);
	
		// Update the input elements whenever the table is filtered
		$(settings.nTable).on( 'search.dt.DT', function ( ev, s ) {
			if ( settings === s ) {
				// IE9 throws an 'unknown error' if document.activeElement is used
				// inside an iframe or frame...
				try {
					if ( jqFilter[0] !== document.activeElement ) {
						jqFilter.val( previousSearch.sSearch );
					}
				}
				catch ( e ) {}
			}
		} );
	
		return filter[0];
	}
	
	
	/**
	 * Filter the table using both the global filter and column based filtering
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oSearch search information
	 *  @param {int} [iForce] force a research of the master array (1) or not (undefined or 0)
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterComplete ( oSettings, oInput, iForce )
	{
		var oPrevSearch = oSettings.oPreviousSearch;
		var aoPrevSearch = oSettings.aoPreSearchCols;
		var fnSaveFilter = function ( oFilter ) {
			/* Save the filtering values */
			oPrevSearch.sSearch = oFilter.sSearch;
			oPrevSearch.bRegex = oFilter.bRegex;
			oPrevSearch.bSmart = oFilter.bSmart;
			oPrevSearch.bCaseInsensitive = oFilter.bCaseInsensitive;
		};
		var fnRegex = function ( o ) {
			// Backwards compatibility with the bEscapeRegex option
			return o.bEscapeRegex !== undefined ? !o.bEscapeRegex : o.bRegex;
		};
	
		// Resolve any column types that are unknown due to addition or invalidation
		// @todo As per sort - can this be moved into an event handler?
		_fnColumnTypes( oSettings );
	
		/* In server-side processing all filtering is done by the server, so no point hanging around here */
		if ( _fnDataSource( oSettings ) != 'ssp' )
		{
			/* Global filter */
			_fnFilter( oSettings, oInput.sSearch, iForce, fnRegex(oInput), oInput.bSmart, oInput.bCaseInsensitive );
			fnSaveFilter( oInput );
	
			/* Now do the individual column filter */
			for ( var i=0 ; i<aoPrevSearch.length ; i++ )
			{
				_fnFilterColumn( oSettings, aoPrevSearch[i].sSearch, i, fnRegex(aoPrevSearch[i]),
					aoPrevSearch[i].bSmart, aoPrevSearch[i].bCaseInsensitive );
			}
	
			/* Custom filtering */
			_fnFilterCustom( oSettings );
		}
		else
		{
			fnSaveFilter( oInput );
		}
	
		/* Tell the draw function we have been filtering */
		oSettings.bFiltered = true;
		_fnCallbackFire( oSettings, null, 'search', [oSettings] );
	}
	
	
	/**
	 * Apply custom filtering functions
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterCustom( settings )
	{
		var filters = DataTable.ext.search;
		var displayRows = settings.aiDisplay;
		var row, rowIdx;
	
		for ( var i=0, ien=filters.length ; i<ien ; i++ ) {
			var rows = [];
	
			// Loop over each row and see if it should be included
			for ( var j=0, jen=displayRows.length ; j<jen ; j++ ) {
				rowIdx = displayRows[ j ];
				row = settings.aoData[ rowIdx ];
	
				if ( filters[i]( settings, row._aFilterData, rowIdx, row._aData, j ) ) {
					rows.push( rowIdx );
				}
			}
	
			// So the array reference doesn't break set the results into the
			// existing array
			displayRows.length = 0;
			$.merge( displayRows, rows );
		}
	}
	
	
	/**
	 * Filter the table on a per-column basis
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sInput string to filter on
	 *  @param {int} iColumn column to filter
	 *  @param {bool} bRegex treat search string as a regular expression or not
	 *  @param {bool} bSmart use smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insenstive matching or not
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterColumn ( settings, searchStr, colIdx, regex, smart, caseInsensitive )
	{
		if ( searchStr === '' ) {
			return;
		}
	
		var data;
		var out = [];
		var display = settings.aiDisplay;
		var rpSearch = _fnFilterCreateSearch( searchStr, regex, smart, caseInsensitive );
	
		for ( var i=0 ; i<display.length ; i++ ) {
			data = settings.aoData[ display[i] ]._aFilterData[ colIdx ];
	
			if ( rpSearch.test( data ) ) {
				out.push( display[i] );
			}
		}
	
		settings.aiDisplay = out;
	}
	
	
	/**
	 * Filter the data table based on user input and draw the table
	 *  @param {object} settings dataTables settings object
	 *  @param {string} input string to filter on
	 *  @param {int} force optional - force a research of the master array (1) or not (undefined or 0)
	 *  @param {bool} regex treat as a regular expression or not
	 *  @param {bool} smart perform smart filtering or not
	 *  @param {bool} caseInsensitive Do case insenstive matching or not
	 *  @memberof DataTable#oApi
	 */
	function _fnFilter( settings, input, force, regex, smart, caseInsensitive )
	{
		var rpSearch = _fnFilterCreateSearch( input, regex, smart, caseInsensitive );
		var prevSearch = settings.oPreviousSearch.sSearch;
		var displayMaster = settings.aiDisplayMaster;
		var display, invalidated, i;
		var filtered = [];
	
		// Need to take account of custom filtering functions - always filter
		if ( DataTable.ext.search.length !== 0 ) {
			force = true;
		}
	
		// Check if any of the rows were invalidated
		invalidated = _fnFilterData( settings );
	
		// If the input is blank - we just want the full data set
		if ( input.length <= 0 ) {
			settings.aiDisplay = displayMaster.slice();
		}
		else {
			// New search - start from the master array
			if ( invalidated ||
				 force ||
				 regex ||
				 prevSearch.length > input.length ||
				 input.indexOf(prevSearch) !== 0 ||
				 settings.bSorted // On resort, the display master needs to be
				                  // re-filtered since indexes will have changed
			) {
				settings.aiDisplay = displayMaster.slice();
			}
	
			// Search the display array
			display = settings.aiDisplay;
	
			for ( i=0 ; i<display.length ; i++ ) {
				if ( rpSearch.test( settings.aoData[ display[i] ]._sFilterRow ) ) {
					filtered.push( display[i] );
				}
			}
	
			settings.aiDisplay = filtered;
		}
	}
	
	
	/**
	 * Build a regular expression object suitable for searching a table
	 *  @param {string} sSearch string to search for
	 *  @param {bool} bRegex treat as a regular expression or not
	 *  @param {bool} bSmart perform smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insensitive matching or not
	 *  @returns {RegExp} constructed object
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterCreateSearch( search, regex, smart, caseInsensitive )
	{
		search = regex ?
			search :
			_fnEscapeRegex( search );
		
		if ( smart ) {
			/* For smart filtering we want to allow the search to work regardless of
			 * word order. We also want double quoted text to be preserved, so word
			 * order is important - a la google. So this is what we want to
			 * generate:
			 * 
			 * ^(?=.*?\bone\b)(?=.*?\btwo three\b)(?=.*?\bfour\b).*$
			 */
			var a = $.map( search.match( /"[^"]+"|[^ ]+/g ) || [''], function ( word ) {
				if ( word.charAt(0) === '"' ) {
					var m = word.match( /^"(.*)"$/ );
					word = m ? m[1] : word;
				}
	
				return word.replace('"', '');
			} );
	
			search = '^(?=.*?'+a.join( ')(?=.*?' )+').*$';
		}
	
		return new RegExp( search, caseInsensitive ? 'i' : '' );
	}
	
	
	/**
	 * Escape a string such that it can be used in a regular expression
	 *  @param {string} sVal string to escape
	 *  @returns {string} escaped string
	 *  @memberof DataTable#oApi
	 */
	var _fnEscapeRegex = DataTable.util.escapeRegex;
	
	var __filter_div = $('<div>')[0];
	var __filter_div_textContent = __filter_div.textContent !== undefined;
	
	// Update the filtering data for each row if needed (by invalidation or first run)
	function _fnFilterData ( settings )
	{
		var columns = settings.aoColumns;
		var column;
		var i, j, ien, jen, filterData, cellData, row;
		var fomatters = DataTable.ext.type.search;
		var wasInvalidated = false;
	
		for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			row = settings.aoData[i];
	
			if ( ! row._aFilterData ) {
				filterData = [];
	
				for ( j=0, jen=columns.length ; j<jen ; j++ ) {
					column = columns[j];
	
					if ( column.bSearchable ) {
						cellData = _fnGetCellData( settings, i, j, 'filter' );
	
						if ( fomatters[ column.sType ] ) {
							cellData = fomatters[ column.sType ]( cellData );
						}
	
						// Search in DataTables 1.10 is string based. In 1.11 this
						// should be altered to also allow strict type checking.
						if ( cellData === null ) {
							cellData = '';
						}
	
						if ( typeof cellData !== 'string' && cellData.toString ) {
							cellData = cellData.toString();
						}
					}
					else {
						cellData = '';
					}
	
					// If it looks like there is an HTML entity in the string,
					// attempt to decode it so sorting works as expected. Note that
					// we could use a single line of jQuery to do this, but the DOM
					// method used here is much faster http://jsperf.com/html-decode
					if ( cellData.indexOf && cellData.indexOf('&') !== -1 ) {
						__filter_div.innerHTML = cellData;
						cellData = __filter_div_textContent ?
							__filter_div.textContent :
							__filter_div.innerText;
					}
	
					if ( cellData.replace ) {
						cellData = cellData.replace(/[\r\n\u2028]/g, '');
					}
	
					filterData.push( cellData );
				}
	
				row._aFilterData = filterData;
				row._sFilterRow = filterData.join('  ');
				wasInvalidated = true;
			}
		}
	
		return wasInvalidated;
	}
	
	
	/**
	 * Convert from the internal Hungarian notation to camelCase for external
	 * interaction
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
	function _fnSearchToCamel ( obj )
	{
		return {
			search:          obj.sSearch,
			smart:           obj.bSmart,
			regex:           obj.bRegex,
			caseInsensitive: obj.bCaseInsensitive
		};
	}
	
	
	
	/**
	 * Convert from camelCase notation to the internal Hungarian. We could use the
	 * Hungarian convert function here, but this is cleaner
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
	function _fnSearchToHung ( obj )
	{
		return {
			sSearch:          obj.search,
			bSmart:           obj.smart,
			bRegex:           obj.regex,
			bCaseInsensitive: obj.caseInsensitive
		};
	}
	
	/**
	 * Generate the node required for the info display
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Information element
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlInfo ( settings )
	{
		var
			tid = settings.sTableId,
			nodes = settings.aanFeatures.i,
			n = $('<div/>', {
				'class': settings.oClasses.sInfo,
				'id': ! nodes ? tid+'_info' : null
			} );
	
		if ( ! nodes ) {
			// Update display on each draw
			settings.aoDrawCallback.push( {
				"fn": _fnUpdateInfo,
				"sName": "information"
			} );
	
			n
				.attr( 'role', 'status' )
				.attr( 'aria-live', 'polite' );
	
			// Table is described by our info div
			$(settings.nTable).attr( 'aria-describedby', tid+'_info' );
		}
	
		return n[0];
	}
	
	
	/**
	 * Update the information elements in the display
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnUpdateInfo ( settings )
	{
		/* Show information about the table */
		var nodes = settings.aanFeatures.i;
		if ( nodes.length === 0 ) {
			return;
		}
	
		var
			lang  = settings.oLanguage,
			start = settings._iDisplayStart+1,
			end   = settings.fnDisplayEnd(),
			max   = settings.fnRecordsTotal(),
			total = settings.fnRecordsDisplay(),
			out   = total ?
				lang.sInfo :
				lang.sInfoEmpty;
	
		if ( total !== max ) {
			/* Record set after filtering */
			out += ' ' + lang.sInfoFiltered;
		}
	
		// Convert the macros
		out += lang.sInfoPostFix;
		out = _fnInfoMacros( settings, out );
	
		var callback = lang.fnInfoCallback;
		if ( callback !== null ) {
			out = callback.call( settings.oInstance,
				settings, start, end, max, total, out
			);
		}
	
		$(nodes).html( out );
	}
	
	
	function _fnInfoMacros ( settings, str )
	{
		// When infinite scrolling, we are always starting at 1. _iDisplayStart is used only
		// internally
		var
			formatter  = settings.fnFormatNumber,
			start      = settings._iDisplayStart+1,
			len        = settings._iDisplayLength,
			vis        = settings.fnRecordsDisplay(),
			all        = len === -1;
	
		return str.
			replace(/_START_/g, formatter.call( settings, start ) ).
			replace(/_END_/g,   formatter.call( settings, settings.fnDisplayEnd() ) ).
			replace(/_MAX_/g,   formatter.call( settings, settings.fnRecordsTotal() ) ).
			replace(/_TOTAL_/g, formatter.call( settings, vis ) ).
			replace(/_PAGE_/g,  formatter.call( settings, all ? 1 : Math.ceil( start / len ) ) ).
			replace(/_PAGES_/g, formatter.call( settings, all ? 1 : Math.ceil( vis / len ) ) );
	}
	
	
	
	/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnInitialise ( settings )
	{
		var i, iLen, iAjaxStart=settings.iInitDisplayStart;
		var columns = settings.aoColumns, column;
		var features = settings.oFeatures;
		var deferLoading = settings.bDeferLoading; // value modified by the draw
	
		/* Ensure that the table data is fully initialised */
		if ( ! settings.bInitialised ) {
			setTimeout( function(){ _fnInitialise( settings ); }, 200 );
			return;
		}
	
		/* Show the display HTML options */
		_fnAddOptionsHtml( settings );
	
		/* Build and draw the header / footer for the table */
		_fnBuildHead( settings );
		_fnDrawHead( settings, settings.aoHeader );
		_fnDrawHead( settings, settings.aoFooter );
	
		/* Okay to show that something is going on now */
		_fnProcessingDisplay( settings, true );
	
		/* Calculate sizes for columns */
		if ( features.bAutoWidth ) {
			_fnCalculateColumnWidths( settings );
		}
	
		for ( i=0, iLen=columns.length ; i<iLen ; i++ ) {
			column = columns[i];
	
			if ( column.sWidth ) {
				column.nTh.style.width = _fnStringToCss( column.sWidth );
			}
		}
	
		_fnCallbackFire( settings, null, 'preInit', [settings] );
	
		// If there is default sorting required - let's do it. The sort function
		// will do the drawing for us. Otherwise we draw the table regardless of the
		// Ajax source - this allows the table to look initialised for Ajax sourcing
		// data (show 'loading' message possibly)
		_fnReDraw( settings );
	
		// Server-side processing init complete is done by _fnAjaxUpdateDraw
		var dataSrc = _fnDataSource( settings );
		if ( dataSrc != 'ssp' || deferLoading ) {
			// if there is an ajax source load the data
			if ( dataSrc == 'ajax' ) {
				_fnBuildAjax( settings, [], function(json) {
					var aData = _fnAjaxDataSrc( settings, json );
	
					// Got the data - add it to the table
					for ( i=0 ; i<aData.length ; i++ ) {
						_fnAddData( settings, aData[i] );
					}
	
					// Reset the init display for cookie saving. We've already done
					// a filter, and therefore cleared it before. So we need to make
					// it appear 'fresh'
					settings.iInitDisplayStart = iAjaxStart;
	
					_fnReDraw( settings );
	
					_fnProcessingDisplay( settings, false );
					_fnInitComplete( settings, json );
				}, settings );
			}
			else {
				_fnProcessingDisplay( settings, false );
				_fnInitComplete( settings );
			}
		}
	}
	
	
	/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} [json] JSON from the server that completed the table, if using Ajax source
	 *    with client-side processing (optional)
	 *  @memberof DataTable#oApi
	 */
	function _fnInitComplete ( settings, json )
	{
		settings._bInitComplete = true;
	
		// When data was added after the initialisation (data or Ajax) we need to
		// calculate the column sizing
		if ( json || settings.oInit.aaData ) {
			_fnAdjustColumnSizing( settings );
		}
	
		_fnCallbackFire( settings, null, 'plugin-init', [settings, json] );
		_fnCallbackFire( settings, 'aoInitComplete', 'init', [settings, json] );
	}
	
	
	function _fnLengthChange ( settings, val )
	{
		var len = parseInt( val, 10 );
		settings._iDisplayLength = len;
	
		_fnLengthOverflow( settings );
	
		// Fire length change event
		_fnCallbackFire( settings, null, 'length', [settings, len] );
	}
	
	
	/**
	 * Generate the node required for user display length changing
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Display length feature node
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlLength ( settings )
	{
		var
			classes  = settings.oClasses,
			tableId  = settings.sTableId,
			menu     = settings.aLengthMenu,
			d2       = $.isArray( menu[0] ),
			lengths  = d2 ? menu[0] : menu,
			language = d2 ? menu[1] : menu;
	
		var select = $('<select/>', {
			'name':          tableId+'_length',
			'aria-controls': tableId,
			'class':         classes.sLengthSelect
		} );
	
		for ( var i=0, ien=lengths.length ; i<ien ; i++ ) {
			select[0][ i ] = new Option(
				typeof language[i] === 'number' ?
					settings.fnFormatNumber( language[i] ) :
					language[i],
				lengths[i]
			);
		}
	
		var div = $('<div><label/></div>').addClass( classes.sLength );
		if ( ! settings.aanFeatures.l ) {
			div[0].id = tableId+'_length';
		}
	
		div.children().append(
			settings.oLanguage.sLengthMenu.replace( '_MENU_', select[0].outerHTML )
		);
	
		// Can't use `select` variable as user might provide their own and the
		// reference is broken by the use of outerHTML
		$('select', div)
			.val( settings._iDisplayLength )
			.on( 'change.DT', function(e) {
				_fnLengthChange( settings, $(this).val() );
				_fnDraw( settings );
			} );
	
		// Update node value whenever anything changes the table's length
		$(settings.nTable).on( 'length.dt.DT', function (e, s, len) {
			if ( settings === s ) {
				$('select', div).val( len );
			}
		} );
	
		return div[0];
	}
	
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Note that most of the paging logic is done in
	 * DataTable.ext.pager
	 */
	
	/**
	 * Generate the node required for default pagination
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Pagination feature node
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlPaginate ( settings )
	{
		var
			type   = settings.sPaginationType,
			plugin = DataTable.ext.pager[ type ],
			modern = typeof plugin === 'function',
			redraw = function( settings ) {
				_fnDraw( settings );
			},
			node = $('<div/>').addClass( settings.oClasses.sPaging + type )[0],
			features = settings.aanFeatures;
	
		if ( ! modern ) {
			plugin.fnInit( settings, node, redraw );
		}
	
		/* Add a draw callback for the pagination on first instance, to update the paging display */
		if ( ! features.p )
		{
			node.id = settings.sTableId+'_paginate';
	
			settings.aoDrawCallback.push( {
				"fn": function( settings ) {
					if ( modern ) {
						var
							start      = settings._iDisplayStart,
							len        = settings._iDisplayLength,
							visRecords = settings.fnRecordsDisplay(),
							all        = len === -1,
							page = all ? 0 : Math.ceil( start / len ),
							pages = all ? 1 : Math.ceil( visRecords / len ),
							buttons = plugin(page, pages),
							i, ien;
	
						for ( i=0, ien=features.p.length ; i<ien ; i++ ) {
							_fnRenderer( settings, 'pageButton' )(
								settings, features.p[i], i, buttons, page, pages
							);
						}
					}
					else {
						plugin.fnUpdate( settings, redraw );
					}
				},
				"sName": "pagination"
			} );
		}
	
		return node;
	}
	
	
	/**
	 * Alter the display settings to change the page
	 *  @param {object} settings DataTables settings object
	 *  @param {string|int} action Paging action to take: "first", "previous",
	 *    "next" or "last" or page number to jump to (integer)
	 *  @param [bool] redraw Automatically draw the update or not
	 *  @returns {bool} true page has changed, false - no change
	 *  @memberof DataTable#oApi
	 */
	function _fnPageChange ( settings, action, redraw )
	{
		var
			start     = settings._iDisplayStart,
			len       = settings._iDisplayLength,
			records   = settings.fnRecordsDisplay();
	
		if ( records === 0 || len === -1 )
		{
			start = 0;
		}
		else if ( typeof action === "number" )
		{
			start = action * len;
	
			if ( start > records )
			{
				start = 0;
			}
		}
		else if ( action == "first" )
		{
			start = 0;
		}
		else if ( action == "previous" )
		{
			start = len >= 0 ?
				start - len :
				0;
	
			if ( start < 0 )
			{
			  start = 0;
			}
		}
		else if ( action == "next" )
		{
			if ( start + len < records )
			{
				start += len;
			}
		}
		else if ( action == "last" )
		{
			start = Math.floor( (records-1) / len) * len;
		}
		else
		{
			_fnLog( settings, 0, "Unknown paging action: "+action, 5 );
		}
	
		var changed = settings._iDisplayStart !== start;
		settings._iDisplayStart = start;
	
		if ( changed ) {
			_fnCallbackFire( settings, null, 'page', [settings] );
	
			if ( redraw ) {
				_fnDraw( settings );
			}
		}
	
		return changed;
	}
	
	
	
	/**
	 * Generate the node required for the processing node
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Processing element
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlProcessing ( settings )
	{
		return $('<div/>', {
				'id': ! settings.aanFeatures.r ? settings.sTableId+'_processing' : null,
				'class': settings.oClasses.sProcessing
			} )
			.html( settings.oLanguage.sProcessing )
			.insertBefore( settings.nTable )[0];
	}
	
	
	/**
	 * Display or hide the processing indicator
	 *  @param {object} settings dataTables settings object
	 *  @param {bool} show Show the processing indicator (true) or not (false)
	 *  @memberof DataTable#oApi
	 */
	function _fnProcessingDisplay ( settings, show )
	{
		if ( settings.oFeatures.bProcessing ) {
			$(settings.aanFeatures.r).css( 'display', show ? 'block' : 'none' );
		}
	
		_fnCallbackFire( settings, null, 'processing', [settings, show] );
	}
	
	/**
	 * Add any control elements for the table - specifically scrolling
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Node to add to the DOM
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlTable ( settings )
	{
		var table = $(settings.nTable);
	
		// Add the ARIA grid role to the table
		table.attr( 'role', 'grid' );
	
		// Scrolling from here on in
		var scroll = settings.oScroll;
	
		if ( scroll.sX === '' && scroll.sY === '' ) {
			return settings.nTable;
		}
	
		var scrollX = scroll.sX;
		var scrollY = scroll.sY;
		var classes = settings.oClasses;
		var caption = table.children('caption');
		var captionSide = caption.length ? caption[0]._captionSide : null;
		var headerClone = $( table[0].cloneNode(false) );
		var footerClone = $( table[0].cloneNode(false) );
		var footer = table.children('tfoot');
		var _div = '<div/>';
		var size = function ( s ) {
			return !s ? null : _fnStringToCss( s );
		};
	
		if ( ! footer.length ) {
			footer = null;
		}
	
		/*
		 * The HTML structure that we want to generate in this function is:
		 *  div - scroller
		 *    div - scroll head
		 *      div - scroll head inner
		 *        table - scroll head table
		 *          thead - thead
		 *    div - scroll body
		 *      table - table (master table)
		 *        thead - thead clone for sizing
		 *        tbody - tbody
		 *    div - scroll foot
		 *      div - scroll foot inner
		 *        table - scroll foot table
		 *          tfoot - tfoot
		 */
		var scroller = $( _div, { 'class': classes.sScrollWrapper } )
			.append(
				$(_div, { 'class': classes.sScrollHead } )
					.css( {
						overflow: 'hidden',
						position: 'relative',
						border: 0,
						width: scrollX ? size(scrollX) : '100%'
					} )
					.append(
						$(_div, { 'class': classes.sScrollHeadInner } )
							.css( {
								'box-sizing': 'content-box',
								width: scroll.sXInner || '100%'
							} )
							.append(
								headerClone
									.removeAttr('id')
									.css( 'margin-left', 0 )
									.append( captionSide === 'top' ? caption : null )
									.append(
										table.children('thead')
									)
							)
					)
			)
			.append(
				$(_div, { 'class': classes.sScrollBody } )
					.css( {
						position: 'relative',
						overflow: 'auto',
						width: size( scrollX )
					} )
					.append( table )
			);
	
		if ( footer ) {
			scroller.append(
				$(_div, { 'class': classes.sScrollFoot } )
					.css( {
						overflow: 'hidden',
						border: 0,
						width: scrollX ? size(scrollX) : '100%'
					} )
					.append(
						$(_div, { 'class': classes.sScrollFootInner } )
							.append(
								footerClone
									.removeAttr('id')
									.css( 'margin-left', 0 )
									.append( captionSide === 'bottom' ? caption : null )
									.append(
										table.children('tfoot')
									)
							)
					)
			);
		}
	
		var children = scroller.children();
		var scrollHead = children[0];
		var scrollBody = children[1];
		var scrollFoot = footer ? children[2] : null;
	
		// When the body is scrolled, then we also want to scroll the headers
		if ( scrollX ) {
			$(scrollBody).on( 'scroll.DT', function (e) {
				var scrollLeft = this.scrollLeft;
	
				scrollHead.scrollLeft = scrollLeft;
	
				if ( footer ) {
					scrollFoot.scrollLeft = scrollLeft;
				}
			} );
		}
	
		$(scrollBody).css(
			scrollY && scroll.bCollapse ? 'max-height' : 'height', 
			scrollY
		);
	
		settings.nScrollHead = scrollHead;
		settings.nScrollBody = scrollBody;
		settings.nScrollFoot = scrollFoot;
	
		// On redraw - align columns
		settings.aoDrawCallback.push( {
			"fn": _fnScrollDraw,
			"sName": "scrolling"
		} );
	
		return scroller[0];
	}
	
	
	
	/**
	 * Update the header, footer and body tables for resizing - i.e. column
	 * alignment.
	 *
	 * Welcome to the most horrible function DataTables. The process that this
	 * function follows is basically:
	 *   1. Re-create the table inside the scrolling div
	 *   2. Take live measurements from the DOM
	 *   3. Apply the measurements to align the columns
	 *   4. Clean up
	 *
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnScrollDraw ( settings )
	{
		// Given that this is such a monster function, a lot of variables are use
		// to try and keep the minimised size as small as possible
		var
			scroll         = settings.oScroll,
			scrollX        = scroll.sX,
			scrollXInner   = scroll.sXInner,
			scrollY        = scroll.sY,
			barWidth       = scroll.iBarWidth,
			divHeader      = $(settings.nScrollHead),
			divHeaderStyle = divHeader[0].style,
			divHeaderInner = divHeader.children('div'),
			divHeaderInnerStyle = divHeaderInner[0].style,
			divHeaderTable = divHeaderInner.children('table'),
			divBodyEl      = settings.nScrollBody,
			divBody        = $(divBodyEl),
			divBodyStyle   = divBodyEl.style,
			divFooter      = $(settings.nScrollFoot),
			divFooterInner = divFooter.children('div'),
			divFooterTable = divFooterInner.children('table'),
			header         = $(settings.nTHead),
			table          = $(settings.nTable),
			tableEl        = table[0],
			tableStyle     = tableEl.style,
			footer         = settings.nTFoot ? $(settings.nTFoot) : null,
			browser        = settings.oBrowser,
			ie67           = browser.bScrollOversize,
			dtHeaderCells  = _pluck( settings.aoColumns, 'nTh' ),
			headerTrgEls, footerTrgEls,
			headerSrcEls, footerSrcEls,
			headerCopy, footerCopy,
			headerWidths=[], footerWidths=[],
			headerContent=[], footerContent=[],
			idx, correction, sanityWidth,
			zeroOut = function(nSizer) {
				var style = nSizer.style;
				style.paddingTop = "0";
				style.paddingBottom = "0";
				style.borderTopWidth = "0";
				style.borderBottomWidth = "0";
				style.height = 0;
			};
	
		// If the scrollbar visibility has changed from the last draw, we need to
		// adjust the column sizes as the table width will have changed to account
		// for the scrollbar
		var scrollBarVis = divBodyEl.scrollHeight > divBodyEl.clientHeight;
		
		if ( settings.scrollBarVis !== scrollBarVis && settings.scrollBarVis !== undefined ) {
			settings.scrollBarVis = scrollBarVis;
			_fnAdjustColumnSizing( settings );
			return; // adjust column sizing will call this function again
		}
		else {
			settings.scrollBarVis = scrollBarVis;
		}
	
		/*
		 * 1. Re-create the table inside the scrolling div
		 */
	
		// Remove the old minimised thead and tfoot elements in the inner table
		table.children('thead, tfoot').remove();
	
		if ( footer ) {
			footerCopy = footer.clone().prependTo( table );
			footerTrgEls = footer.find('tr'); // the original tfoot is in its own table and must be sized
			footerSrcEls = footerCopy.find('tr');
		}
	
		// Clone the current header and footer elements and then place it into the inner table
		headerCopy = header.clone().prependTo( table );
		headerTrgEls = header.find('tr'); // original header is in its own table
		headerSrcEls = headerCopy.find('tr');
		headerCopy.find('th, td').removeAttr('tabindex');
	
	
		/*
		 * 2. Take live measurements from the DOM - do not alter the DOM itself!
		 */
	
		// Remove old sizing and apply the calculated column widths
		// Get the unique column headers in the newly created (cloned) header. We want to apply the
		// calculated sizes to this header
		if ( ! scrollX )
		{
			divBodyStyle.width = '100%';
			divHeader[0].style.width = '100%';
		}
	
		$.each( _fnGetUniqueThs( settings, headerCopy ), function ( i, el ) {
			idx = _fnVisibleToColumnIndex( settings, i );
			el.style.width = settings.aoColumns[idx].sWidth;
		} );
	
		if ( footer ) {
			_fnApplyToChildren( function(n) {
				n.style.width = "";
			}, footerSrcEls );
		}
	
		// Size the table as a whole
		sanityWidth = table.outerWidth();
		if ( scrollX === "" ) {
			// No x scrolling
			tableStyle.width = "100%";
	
			// IE7 will make the width of the table when 100% include the scrollbar
			// - which is shouldn't. When there is a scrollbar we need to take this
			// into account.
			if ( ie67 && (table.find('tbody').height() > divBodyEl.offsetHeight ||
				divBody.css('overflow-y') == "scroll")
			) {
				tableStyle.width = _fnStringToCss( table.outerWidth() - barWidth);
			}
	
			// Recalculate the sanity width
			sanityWidth = table.outerWidth();
		}
		else if ( scrollXInner !== "" ) {
			// legacy x scroll inner has been given - use it
			tableStyle.width = _fnStringToCss(scrollXInner);
	
			// Recalculate the sanity width
			sanityWidth = table.outerWidth();
		}
	
		// Hidden header should have zero height, so remove padding and borders. Then
		// set the width based on the real headers
	
		// Apply all styles in one pass
		_fnApplyToChildren( zeroOut, headerSrcEls );
	
		// Read all widths in next pass
		_fnApplyToChildren( function(nSizer) {
			headerContent.push( nSizer.innerHTML );
			headerWidths.push( _fnStringToCss( $(nSizer).css('width') ) );
		}, headerSrcEls );
	
		// Apply all widths in final pass
		_fnApplyToChildren( function(nToSize, i) {
			// Only apply widths to the DataTables detected header cells - this
			// prevents complex headers from having contradictory sizes applied
			if ( $.inArray( nToSize, dtHeaderCells ) !== -1 ) {
				nToSize.style.width = headerWidths[i];
			}
		}, headerTrgEls );
	
		$(headerSrcEls).height(0);
	
		/* Same again with the footer if we have one */
		if ( footer )
		{
			_fnApplyToChildren( zeroOut, footerSrcEls );
	
			_fnApplyToChildren( function(nSizer) {
				footerContent.push( nSizer.innerHTML );
				footerWidths.push( _fnStringToCss( $(nSizer).css('width') ) );
			}, footerSrcEls );
	
			_fnApplyToChildren( function(nToSize, i) {
				nToSize.style.width = footerWidths[i];
			}, footerTrgEls );
	
			$(footerSrcEls).height(0);
		}
	
	
		/*
		 * 3. Apply the measurements
		 */
	
		// "Hide" the header and footer that we used for the sizing. We need to keep
		// the content of the cell so that the width applied to the header and body
		// both match, but we want to hide it completely. We want to also fix their
		// width to what they currently are
		_fnApplyToChildren( function(nSizer, i) {
			nSizer.innerHTML = '<div class="dataTables_sizing">'+headerContent[i]+'</div>';
			nSizer.childNodes[0].style.height = "0";
			nSizer.childNodes[0].style.overflow = "hidden";
			nSizer.style.width = headerWidths[i];
		}, headerSrcEls );
	
		if ( footer )
		{
			_fnApplyToChildren( function(nSizer, i) {
				nSizer.innerHTML = '<div class="dataTables_sizing">'+footerContent[i]+'</div>';
				nSizer.childNodes[0].style.height = "0";
				nSizer.childNodes[0].style.overflow = "hidden";
				nSizer.style.width = footerWidths[i];
			}, footerSrcEls );
		}
	
		// Sanity check that the table is of a sensible width. If not then we are going to get
		// misalignment - try to prevent this by not allowing the table to shrink below its min width
		if ( table.outerWidth() < sanityWidth )
		{
			// The min width depends upon if we have a vertical scrollbar visible or not */
			correction = ((divBodyEl.scrollHeight > divBodyEl.offsetHeight ||
				divBody.css('overflow-y') == "scroll")) ?
					sanityWidth+barWidth :
					sanityWidth;
	
			// IE6/7 are a law unto themselves...
			if ( ie67 && (divBodyEl.scrollHeight >
				divBodyEl.offsetHeight || divBody.css('overflow-y') == "scroll")
			) {
				tableStyle.width = _fnStringToCss( correction-barWidth );
			}
	
			// And give the user a warning that we've stopped the table getting too small
			if ( scrollX === "" || scrollXInner !== "" ) {
				_fnLog( settings, 1, 'Possible column misalignment', 6 );
			}
		}
		else
		{
			correction = '100%';
		}
	
		// Apply to the container elements
		divBodyStyle.width = _fnStringToCss( correction );
		divHeaderStyle.width = _fnStringToCss( correction );
	
		if ( footer ) {
			settings.nScrollFoot.style.width = _fnStringToCss( correction );
		}
	
	
		/*
		 * 4. Clean up
		 */
		if ( ! scrollY ) {
			/* IE7< puts a vertical scrollbar in place (when it shouldn't be) due to subtracting
			 * the scrollbar height from the visible display, rather than adding it on. We need to
			 * set the height in order to sort this. Don't want to do it in any other browsers.
			 */
			if ( ie67 ) {
				divBodyStyle.height = _fnStringToCss( tableEl.offsetHeight+barWidth );
			}
		}
	
		/* Finally set the width's of the header and footer tables */
		var iOuterWidth = table.outerWidth();
		divHeaderTable[0].style.width = _fnStringToCss( iOuterWidth );
		divHeaderInnerStyle.width = _fnStringToCss( iOuterWidth );
	
		// Figure out if there are scrollbar present - if so then we need a the header and footer to
		// provide a bit more space to allow "overflow" scrolling (i.e. past the scrollbar)
		var bScrolling = table.height() > divBodyEl.clientHeight || divBody.css('overflow-y') == "scroll";
		var padding = 'padding' + (browser.bScrollbarLeft ? 'Left' : 'Right' );
		divHeaderInnerStyle[ padding ] = bScrolling ? barWidth+"px" : "0px";
	
		if ( footer ) {
			divFooterTable[0].style.width = _fnStringToCss( iOuterWidth );
			divFooterInner[0].style.width = _fnStringToCss( iOuterWidth );
			divFooterInner[0].style[padding] = bScrolling ? barWidth+"px" : "0px";
		}
	
		// Correct DOM ordering for colgroup - comes before the thead
		table.children('colgroup').insertBefore( table.children('thead') );
	
		/* Adjust the position of the header in case we loose the y-scrollbar */
		divBody.trigger('scroll');
	
		// If sorting or filtering has occurred, jump the scrolling back to the top
		// only if we aren't holding the position
		if ( (settings.bSorted || settings.bFiltered) && ! settings._drawHold ) {
			divBodyEl.scrollTop = 0;
		}
	}
	
	
	
	/**
	 * Apply a given function to the display child nodes of an element array (typically
	 * TD children of TR rows
	 *  @param {function} fn Method to apply to the objects
	 *  @param array {nodes} an1 List of elements to look through for display children
	 *  @param array {nodes} an2 Another list (identical structure to the first) - optional
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyToChildren( fn, an1, an2 )
	{
		var index=0, i=0, iLen=an1.length;
		var nNode1, nNode2;
	
		while ( i < iLen ) {
			nNode1 = an1[i].firstChild;
			nNode2 = an2 ? an2[i].firstChild : null;
	
			while ( nNode1 ) {
				if ( nNode1.nodeType === 1 ) {
					if ( an2 ) {
						fn( nNode1, nNode2, index );
					}
					else {
						fn( nNode1, index );
					}
	
					index++;
				}
	
				nNode1 = nNode1.nextSibling;
				nNode2 = an2 ? nNode2.nextSibling : null;
			}
	
			i++;
		}
	}
	
	
	
	var __re_html_remove = /<.*?>/g;
	
	
	/**
	 * Calculate the width of columns for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnCalculateColumnWidths ( oSettings )
	{
		var
			table = oSettings.nTable,
			columns = oSettings.aoColumns,
			scroll = oSettings.oScroll,
			scrollY = scroll.sY,
			scrollX = scroll.sX,
			scrollXInner = scroll.sXInner,
			columnCount = columns.length,
			visibleColumns = _fnGetColumns( oSettings, 'bVisible' ),
			headerCells = $('th', oSettings.nTHead),
			tableWidthAttr = table.getAttribute('width'), // from DOM element
			tableContainer = table.parentNode,
			userInputs = false,
			i, column, columnIdx, width, outerWidth,
			browser = oSettings.oBrowser,
			ie67 = browser.bScrollOversize;
	
		var styleWidth = table.style.width;
		if ( styleWidth && styleWidth.indexOf('%') !== -1 ) {
			tableWidthAttr = styleWidth;
		}
	
		/* Convert any user input sizes into pixel sizes */
		for ( i=0 ; i<visibleColumns.length ; i++ ) {
			column = columns[ visibleColumns[i] ];
	
			if ( column.sWidth !== null ) {
				column.sWidth = _fnConvertToWidth( column.sWidthOrig, tableContainer );
	
				userInputs = true;
			}
		}
	
		/* If the number of columns in the DOM equals the number that we have to
		 * process in DataTables, then we can use the offsets that are created by
		 * the web- browser. No custom sizes can be set in order for this to happen,
		 * nor scrolling used
		 */
		if ( ie67 || ! userInputs && ! scrollX && ! scrollY &&
		     columnCount == _fnVisbleColumns( oSettings ) &&
		     columnCount == headerCells.length
		) {
			for ( i=0 ; i<columnCount ; i++ ) {
				var colIdx = _fnVisibleToColumnIndex( oSettings, i );
	
				if ( colIdx !== null ) {
					columns[ colIdx ].sWidth = _fnStringToCss( headerCells.eq(i).width() );
				}
			}
		}
		else
		{
			// Otherwise construct a single row, worst case, table with the widest
			// node in the data, assign any user defined widths, then insert it into
			// the DOM and allow the browser to do all the hard work of calculating
			// table widths
			var tmpTable = $(table).clone() // don't use cloneNode - IE8 will remove events on the main table
				.css( 'visibility', 'hidden' )
				.removeAttr( 'id' );
	
			// Clean up the table body
			tmpTable.find('tbody tr').remove();
			var tr = $('<tr/>').appendTo( tmpTable.find('tbody') );
	
			// Clone the table header and footer - we can't use the header / footer
			// from the cloned table, since if scrolling is active, the table's
			// real header and footer are contained in different table tags
			tmpTable.find('thead, tfoot').remove();
			tmpTable
				.append( $(oSettings.nTHead).clone() )
				.append( $(oSettings.nTFoot).clone() );
	
			// Remove any assigned widths from the footer (from scrolling)
			tmpTable.find('tfoot th, tfoot td').css('width', '');
	
			// Apply custom sizing to the cloned header
			headerCells = _fnGetUniqueThs( oSettings, tmpTable.find('thead')[0] );
	
			for ( i=0 ; i<visibleColumns.length ; i++ ) {
				column = columns[ visibleColumns[i] ];
	
				headerCells[i].style.width = column.sWidthOrig !== null && column.sWidthOrig !== '' ?
					_fnStringToCss( column.sWidthOrig ) :
					'';
	
				// For scrollX we need to force the column width otherwise the
				// browser will collapse it. If this width is smaller than the
				// width the column requires, then it will have no effect
				if ( column.sWidthOrig && scrollX ) {
					$( headerCells[i] ).append( $('<div/>').css( {
						width: column.sWidthOrig,
						margin: 0,
						padding: 0,
						border: 0,
						height: 1
					} ) );
				}
			}
	
			// Find the widest cell for each column and put it into the table
			if ( oSettings.aoData.length ) {
				for ( i=0 ; i<visibleColumns.length ; i++ ) {
					columnIdx = visibleColumns[i];
					column = columns[ columnIdx ];
	
					$( _fnGetWidestNode( oSettings, columnIdx ) )
						.clone( false )
						.append( column.sContentPadding )
						.appendTo( tr );
				}
			}
	
			// Tidy the temporary table - remove name attributes so there aren't
			// duplicated in the dom (radio elements for example)
			$('[name]', tmpTable).removeAttr('name');
	
			// Table has been built, attach to the document so we can work with it.
			// A holding element is used, positioned at the top of the container
			// with minimal height, so it has no effect on if the container scrolls
			// or not. Otherwise it might trigger scrolling when it actually isn't
			// needed
			var holder = $('<div/>').css( scrollX || scrollY ?
					{
						position: 'absolute',
						top: 0,
						left: 0,
						height: 1,
						right: 0,
						overflow: 'hidden'
					} :
					{}
				)
				.append( tmpTable )
				.appendTo( tableContainer );
	
			// When scrolling (X or Y) we want to set the width of the table as 
			// appropriate. However, when not scrolling leave the table width as it
			// is. This results in slightly different, but I think correct behaviour
			if ( scrollX && scrollXInner ) {
				tmpTable.width( scrollXInner );
			}
			else if ( scrollX ) {
				tmpTable.css( 'width', 'auto' );
				tmpTable.removeAttr('width');
	
				// If there is no width attribute or style, then allow the table to
				// collapse
				if ( tmpTable.width() < tableContainer.clientWidth && tableWidthAttr ) {
					tmpTable.width( tableContainer.clientWidth );
				}
			}
			else if ( scrollY ) {
				tmpTable.width( tableContainer.clientWidth );
			}
			else if ( tableWidthAttr ) {
				tmpTable.width( tableWidthAttr );
			}
	
			// Get the width of each column in the constructed table - we need to
			// know the inner width (so it can be assigned to the other table's
			// cells) and the outer width so we can calculate the full width of the
			// table. This is safe since DataTables requires a unique cell for each
			// column, but if ever a header can span multiple columns, this will
			// need to be modified.
			var total = 0;
			for ( i=0 ; i<visibleColumns.length ; i++ ) {
				var cell = $(headerCells[i]);
				var border = cell.outerWidth() - cell.width();
	
				// Use getBounding... where possible (not IE8-) because it can give
				// sub-pixel accuracy, which we then want to round up!
				var bounding = browser.bBounding ?
					Math.ceil( headerCells[i].getBoundingClientRect().width ) :
					cell.outerWidth();
	
				// Total is tracked to remove any sub-pixel errors as the outerWidth
				// of the table might not equal the total given here (IE!).
				total += bounding;
	
				// Width for each column to use
				columns[ visibleColumns[i] ].sWidth = _fnStringToCss( bounding - border );
			}
	
			table.style.width = _fnStringToCss( total );
	
			// Finished with the table - ditch it
			holder.remove();
		}
	
		// If there is a width attr, we want to attach an event listener which
		// allows the table sizing to automatically adjust when the window is
		// resized. Use the width attr rather than CSS, since we can't know if the
		// CSS is a relative value or absolute - DOM read is always px.
		if ( tableWidthAttr ) {
			table.style.width = _fnStringToCss( tableWidthAttr );
		}
	
		if ( (tableWidthAttr || scrollX) && ! oSettings._reszEvt ) {
			var bindResize = function () {
				$(window).on('resize.DT-'+oSettings.sInstance, _fnThrottle( function () {
					_fnAdjustColumnSizing( oSettings );
				} ) );
			};
	
			// IE6/7 will crash if we bind a resize event handler on page load.
			// To be removed in 1.11 which drops IE6/7 support
			if ( ie67 ) {
				setTimeout( bindResize, 1000 );
			}
			else {
				bindResize();
			}
	
			oSettings._reszEvt = true;
		}
	}
	
	
	/**
	 * Throttle the calls to a function. Arguments and context are maintained for
	 * the throttled function
	 *  @param {function} fn Function to be called
	 *  @param {int} [freq=200] call frequency in mS
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#oApi
	 */
	var _fnThrottle = DataTable.util.throttle;
	
	
	/**
	 * Convert a CSS unit width to pixels (e.g. 2em)
	 *  @param {string} width width to be converted
	 *  @param {node} parent parent to get the with for (required for relative widths) - optional
	 *  @returns {int} width in pixels
	 *  @memberof DataTable#oApi
	 */
	function _fnConvertToWidth ( width, parent )
	{
		if ( ! width ) {
			return 0;
		}
	
		var n = $('<div/>')
			.css( 'width', _fnStringToCss( width ) )
			.appendTo( parent || document.body );
	
		var val = n[0].offsetWidth;
		n.remove();
	
		return val;
	}
	
	
	/**
	 * Get the widest node
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {node} widest table node
	 *  @memberof DataTable#oApi
	 */
	function _fnGetWidestNode( settings, colIdx )
	{
		var idx = _fnGetMaxLenString( settings, colIdx );
		if ( idx < 0 ) {
			return null;
		}
	
		var data = settings.aoData[ idx ];
		return ! data.nTr ? // Might not have been created when deferred rendering
			$('<td/>').html( _fnGetCellData( settings, idx, colIdx, 'display' ) )[0] :
			data.anCells[ colIdx ];
	}
	
	
	/**
	 * Get the maximum strlen for each data column
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {string} max string length for each column
	 *  @memberof DataTable#oApi
	 */
	function _fnGetMaxLenString( settings, colIdx )
	{
		var s, max=-1, maxIdx = -1;
	
		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			s = _fnGetCellData( settings, i, colIdx, 'display' )+'';
			s = s.replace( __re_html_remove, '' );
			s = s.replace( /&nbsp;/g, ' ' );
	
			if ( s.length > max ) {
				max = s.length;
				maxIdx = i;
			}
		}
	
		return maxIdx;
	}
	
	
	/**
	 * Append a CSS unit (only if required) to a string
	 *  @param {string} value to css-ify
	 *  @returns {string} value with css unit
	 *  @memberof DataTable#oApi
	 */
	function _fnStringToCss( s )
	{
		if ( s === null ) {
			return '0px';
		}
	
		if ( typeof s == 'number' ) {
			return s < 0 ?
				'0px' :
				s+'px';
		}
	
		// Check it has a unit character already
		return s.match(/\d$/) ?
			s+'px' :
			s;
	}
	
	
	
	function _fnSortFlatten ( settings )
	{
		var
			i, iLen, k, kLen,
			aSort = [],
			aiOrig = [],
			aoColumns = settings.aoColumns,
			aDataSort, iCol, sType, srcCol,
			fixed = settings.aaSortingFixed,
			fixedObj = $.isPlainObject( fixed ),
			nestedSort = [],
			add = function ( a ) {
				if ( a.length && ! $.isArray( a[0] ) ) {
					// 1D array
					nestedSort.push( a );
				}
				else {
					// 2D array
					$.merge( nestedSort, a );
				}
			};
	
		// Build the sort array, with pre-fix and post-fix options if they have been
		// specified
		if ( $.isArray( fixed ) ) {
			add( fixed );
		}
	
		if ( fixedObj && fixed.pre ) {
			add( fixed.pre );
		}
	
		add( settings.aaSorting );
	
		if (fixedObj && fixed.post ) {
			add( fixed.post );
		}
	
		for ( i=0 ; i<nestedSort.length ; i++ )
		{
			srcCol = nestedSort[i][0];
			aDataSort = aoColumns[ srcCol ].aDataSort;
	
			for ( k=0, kLen=aDataSort.length ; k<kLen ; k++ )
			{
				iCol = aDataSort[k];
				sType = aoColumns[ iCol ].sType || 'string';
	
				if ( nestedSort[i]._idx === undefined ) {
					nestedSort[i]._idx = $.inArray( nestedSort[i][1], aoColumns[iCol].asSorting );
				}
	
				aSort.push( {
					src:       srcCol,
					col:       iCol,
					dir:       nestedSort[i][1],
					index:     nestedSort[i]._idx,
					type:      sType,
					formatter: DataTable.ext.type.order[ sType+"-pre" ]
				} );
			}
		}
	
		return aSort;
	}
	
	/**
	 * Change the order of the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 *  @todo This really needs split up!
	 */
	function _fnSort ( oSettings )
	{
		var
			i, ien, iLen, j, jLen, k, kLen,
			sDataType, nTh,
			aiOrig = [],
			oExtSort = DataTable.ext.type.order,
			aoData = oSettings.aoData,
			aoColumns = oSettings.aoColumns,
			aDataSort, data, iCol, sType, oSort,
			formatters = 0,
			sortCol,
			displayMaster = oSettings.aiDisplayMaster,
			aSort;
	
		// Resolve any column types that are unknown due to addition or invalidation
		// @todo Can this be moved into a 'data-ready' handler which is called when
		//   data is going to be used in the table?
		_fnColumnTypes( oSettings );
	
		aSort = _fnSortFlatten( oSettings );
	
		for ( i=0, ien=aSort.length ; i<ien ; i++ ) {
			sortCol = aSort[i];
	
			// Track if we can use the fast sort algorithm
			if ( sortCol.formatter ) {
				formatters++;
			}
	
			// Load the data needed for the sort, for each cell
			_fnSortData( oSettings, sortCol.col );
		}
	
		/* No sorting required if server-side or no sorting array */
		if ( _fnDataSource( oSettings ) != 'ssp' && aSort.length !== 0 )
		{
			// Create a value - key array of the current row positions such that we can use their
			// current position during the sort, if values match, in order to perform stable sorting
			for ( i=0, iLen=displayMaster.length ; i<iLen ; i++ ) {
				aiOrig[ displayMaster[i] ] = i;
			}
	
			/* Do the sort - here we want multi-column sorting based on a given data source (column)
			 * and sorting function (from oSort) in a certain direction. It's reasonably complex to
			 * follow on it's own, but this is what we want (example two column sorting):
			 *  fnLocalSorting = function(a,b){
			 *    var iTest;
			 *    iTest = oSort['string-asc']('data11', 'data12');
			 *      if (iTest !== 0)
			 *        return iTest;
			 *    iTest = oSort['numeric-desc']('data21', 'data22');
			 *    if (iTest !== 0)
			 *      return iTest;
			 *    return oSort['numeric-asc']( aiOrig[a], aiOrig[b] );
			 *  }
			 * Basically we have a test for each sorting column, if the data in that column is equal,
			 * test the next column. If all columns match, then we use a numeric sort on the row
			 * positions in the original data array to provide a stable sort.
			 *
			 * Note - I know it seems excessive to have two sorting methods, but the first is around
			 * 15% faster, so the second is only maintained for backwards compatibility with sorting
			 * methods which do not have a pre-sort formatting function.
			 */
			if ( formatters === aSort.length ) {
				// All sort types have formatting functions
				displayMaster.sort( function ( a, b ) {
					var
						x, y, k, test, sort,
						len=aSort.length,
						dataA = aoData[a]._aSortData,
						dataB = aoData[b]._aSortData;
	
					for ( k=0 ; k<len ; k++ ) {
						sort = aSort[k];
	
						x = dataA[ sort.col ];
						y = dataB[ sort.col ];
	
						test = x<y ? -1 : x>y ? 1 : 0;
						if ( test !== 0 ) {
							return sort.dir === 'asc' ? test : -test;
						}
					}
	
					x = aiOrig[a];
					y = aiOrig[b];
					return x<y ? -1 : x>y ? 1 : 0;
				} );
			}
			else {
				// Depreciated - remove in 1.11 (providing a plug-in option)
				// Not all sort types have formatting methods, so we have to call their sorting
				// methods.
				displayMaster.sort( function ( a, b ) {
					var
						x, y, k, l, test, sort, fn,
						len=aSort.length,
						dataA = aoData[a]._aSortData,
						dataB = aoData[b]._aSortData;
	
					for ( k=0 ; k<len ; k++ ) {
						sort = aSort[k];
	
						x = dataA[ sort.col ];
						y = dataB[ sort.col ];
	
						fn = oExtSort[ sort.type+"-"+sort.dir ] || oExtSort[ "string-"+sort.dir ];
						test = fn( x, y );
						if ( test !== 0 ) {
							return test;
						}
					}
	
					x = aiOrig[a];
					y = aiOrig[b];
					return x<y ? -1 : x>y ? 1 : 0;
				} );
			}
		}
	
		/* Tell the draw function that we have sorted the data */
		oSettings.bSorted = true;
	}
	
	
	function _fnSortAria ( settings )
	{
		var label;
		var nextSort;
		var columns = settings.aoColumns;
		var aSort = _fnSortFlatten( settings );
		var oAria = settings.oLanguage.oAria;
	
		// ARIA attributes - need to loop all columns, to update all (removing old
		// attributes as needed)
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
		{
			var col = columns[i];
			var asSorting = col.asSorting;
			var sTitle = col.sTitle.replace( /<.*?>/g, "" );
			var th = col.nTh;
	
			// IE7 is throwing an error when setting these properties with jQuery's
			// attr() and removeAttr() methods...
			th.removeAttribute('aria-sort');
	
			/* In ARIA only the first sorting column can be marked as sorting - no multi-sort option */
			if ( col.bSortable ) {
				if ( aSort.length > 0 && aSort[0].col == i ) {
					th.setAttribute('aria-sort', aSort[0].dir=="asc" ? "ascending" : "descending" );
					nextSort = asSorting[ aSort[0].index+1 ] || asSorting[0];
				}
				else {
					nextSort = asSorting[0];
				}
	
				label = sTitle + ( nextSort === "asc" ?
					oAria.sSortAscending :
					oAria.sSortDescending
				);
			}
			else {
				label = sTitle;
			}
	
			th.setAttribute('aria-label', label);
		}
	}
	
	
	/**
	 * Function to run on user sort request
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {boolean} [append=false] Append the requested sort to the existing
	 *    sort if true (i.e. multi-column sort)
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
	function _fnSortListener ( settings, colIdx, append, callback )
	{
		var col = settings.aoColumns[ colIdx ];
		var sorting = settings.aaSorting;
		var asSorting = col.asSorting;
		var nextSortIdx;
		var next = function ( a, overflow ) {
			var idx = a._idx;
			if ( idx === undefined ) {
				idx = $.inArray( a[1], asSorting );
			}
	
			return idx+1 < asSorting.length ?
				idx+1 :
				overflow ?
					null :
					0;
		};
	
		// Convert to 2D array if needed
		if ( typeof sorting[0] === 'number' ) {
			sorting = settings.aaSorting = [ sorting ];
		}
	
		// If appending the sort then we are multi-column sorting
		if ( append && settings.oFeatures.bSortMulti ) {
			// Are we already doing some kind of sort on this column?
			var sortIdx = $.inArray( colIdx, _pluck(sorting, '0') );
	
			if ( sortIdx !== -1 ) {
				// Yes, modify the sort
				nextSortIdx = next( sorting[sortIdx], true );
	
				if ( nextSortIdx === null && sorting.length === 1 ) {
					nextSortIdx = 0; // can't remove sorting completely
				}
	
				if ( nextSortIdx === null ) {
					sorting.splice( sortIdx, 1 );
				}
				else {
					sorting[sortIdx][1] = asSorting[ nextSortIdx ];
					sorting[sortIdx]._idx = nextSortIdx;
				}
			}
			else {
				// No sort on this column yet
				sorting.push( [ colIdx, asSorting[0], 0 ] );
				sorting[sorting.length-1]._idx = 0;
			}
		}
		else if ( sorting.length && sorting[0][0] == colIdx ) {
			// Single column - already sorting on this column, modify the sort
			nextSortIdx = next( sorting[0] );
	
			sorting.length = 1;
			sorting[0][1] = asSorting[ nextSortIdx ];
			sorting[0]._idx = nextSortIdx;
		}
		else {
			// Single column - sort only on this column
			sorting.length = 0;
			sorting.push( [ colIdx, asSorting[0] ] );
			sorting[0]._idx = 0;
		}
	
		// Run the sort by calling a full redraw
		_fnReDraw( settings );
	
		// callback used for async user interaction
		if ( typeof callback == 'function' ) {
			callback( settings );
		}
	}
	
	
	/**
	 * Attach a sort handler (click) to a node
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
	function _fnSortAttachListener ( settings, attachTo, colIdx, callback )
	{
		var col = settings.aoColumns[ colIdx ];
	
		_fnBindAction( attachTo, {}, function (e) {
			/* If the column is not sortable - don't to anything */
			if ( col.bSortable === false ) {
				return;
			}
	
			// If processing is enabled use a timeout to allow the processing
			// display to be shown - otherwise to it synchronously
			if ( settings.oFeatures.bProcessing ) {
				_fnProcessingDisplay( settings, true );
	
				setTimeout( function() {
					_fnSortListener( settings, colIdx, e.shiftKey, callback );
	
					// In server-side processing, the draw callback will remove the
					// processing display
					if ( _fnDataSource( settings ) !== 'ssp' ) {
						_fnProcessingDisplay( settings, false );
					}
				}, 0 );
			}
			else {
				_fnSortListener( settings, colIdx, e.shiftKey, callback );
			}
		} );
	}
	
	
	/**
	 * Set the sorting classes on table's body, Note: it is safe to call this function
	 * when bSort and bSortClasses are false
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnSortingClasses( settings )
	{
		var oldSort = settings.aLastSort;
		var sortClass = settings.oClasses.sSortColumn;
		var sort = _fnSortFlatten( settings );
		var features = settings.oFeatures;
		var i, ien, colIdx;
	
		if ( features.bSort && features.bSortClasses ) {
			// Remove old sorting classes
			for ( i=0, ien=oldSort.length ; i<ien ; i++ ) {
				colIdx = oldSort[i].src;
	
				// Remove column sorting
				$( _pluck( settings.aoData, 'anCells', colIdx ) )
					.removeClass( sortClass + (i<2 ? i+1 : 3) );
			}
	
			// Add new column sorting
			for ( i=0, ien=sort.length ; i<ien ; i++ ) {
				colIdx = sort[i].src;
	
				$( _pluck( settings.aoData, 'anCells', colIdx ) )
					.addClass( sortClass + (i<2 ? i+1 : 3) );
			}
		}
	
		settings.aLastSort = sort;
	}
	
	
	// Get the data to sort a column, be it from cache, fresh (populating the
	// cache), or from a sort formatter
	function _fnSortData( settings, idx )
	{
		// Custom sorting function - provided by the sort data type
		var column = settings.aoColumns[ idx ];
		var customSort = DataTable.ext.order[ column.sSortDataType ];
		var customData;
	
		if ( customSort ) {
			customData = customSort.call( settings.oInstance, settings, idx,
				_fnColumnIndexToVisible( settings, idx )
			);
		}
	
		// Use / populate cache
		var row, cellData;
		var formatter = DataTable.ext.type.order[ column.sType+"-pre" ];
	
		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			row = settings.aoData[i];
	
			if ( ! row._aSortData ) {
				row._aSortData = [];
			}
	
			if ( ! row._aSortData[idx] || customSort ) {
				cellData = customSort ?
					customData[i] : // If there was a custom sort function, use data from there
					_fnGetCellData( settings, i, idx, 'sort' );
	
				row._aSortData[ idx ] = formatter ?
					formatter( cellData ) :
					cellData;
			}
		}
	}
	
	
	
	/**
	 * Save the state of a table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnSaveState ( settings )
	{
		if ( !settings.oFeatures.bStateSave || settings.bDestroying )
		{
			return;
		}
	
		/* Store the interesting variables */
		var state = {
			time:    +new Date(),
			start:   settings._iDisplayStart,
			length:  settings._iDisplayLength,
			order:   $.extend( true, [], settings.aaSorting ),
			search:  _fnSearchToCamel( settings.oPreviousSearch ),
			columns: $.map( settings.aoColumns, function ( col, i ) {
				return {
					visible: col.bVisible,
					search: _fnSearchToCamel( settings.aoPreSearchCols[i] )
				};
			} )
		};
	
		_fnCallbackFire( settings, "aoStateSaveParams", 'stateSaveParams', [settings, state] );
	
		settings.oSavedState = state;
		settings.fnStateSaveCallback.call( settings.oInstance, settings, state );
	}
	
	
	/**
	 * Attempt to load a saved table state
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oInit DataTables init object so we can override settings
	 *  @param {function} callback Callback to execute when the state has been loaded
	 *  @memberof DataTable#oApi
	 */
	function _fnLoadState ( settings, oInit, callback )
	{
		var i, ien;
		var columns = settings.aoColumns;
		var loaded = function ( s ) {
			if ( ! s || ! s.time ) {
				callback();
				return;
			}
	
			// Allow custom and plug-in manipulation functions to alter the saved data set and
			// cancelling of loading by returning false
			var abStateLoad = _fnCallbackFire( settings, 'aoStateLoadParams', 'stateLoadParams', [settings, s] );
			if ( $.inArray( false, abStateLoad ) !== -1 ) {
				callback();
				return;
			}
	
			// Reject old data
			var duration = settings.iStateDuration;
			if ( duration > 0 && s.time < +new Date() - (duration*1000) ) {
				callback();
				return;
			}
	
			// Number of columns have changed - all bets are off, no restore of settings
			if ( s.columns && columns.length !== s.columns.length ) {
				callback();
				return;
			}
	
			// Store the saved state so it might be accessed at any time
			settings.oLoadedState = $.extend( true, {}, s );
	
			// Restore key features - todo - for 1.11 this needs to be done by
			// subscribed events
			if ( s.start !== undefined ) {
				settings._iDisplayStart    = s.start;
				settings.iInitDisplayStart = s.start;
			}
			if ( s.length !== undefined ) {
				settings._iDisplayLength   = s.length;
			}
	
			// Order
			if ( s.order !== undefined ) {
				settings.aaSorting = [];
				$.each( s.order, function ( i, col ) {
					settings.aaSorting.push( col[0] >= columns.length ?
						[ 0, col[1] ] :
						col
					);
				} );
			}
	
			// Search
			if ( s.search !== undefined ) {
				$.extend( settings.oPreviousSearch, _fnSearchToHung( s.search ) );
			}
	
			// Columns
			//
			if ( s.columns ) {
				for ( i=0, ien=s.columns.length ; i<ien ; i++ ) {
					var col = s.columns[i];
	
					// Visibility
					if ( col.visible !== undefined ) {
						columns[i].bVisible = col.visible;
					}
	
					// Search
					if ( col.search !== undefined ) {
						$.extend( settings.aoPreSearchCols[i], _fnSearchToHung( col.search ) );
					}
				}
			}
	
			_fnCallbackFire( settings, 'aoStateLoaded', 'stateLoaded', [settings, s] );
			callback();
		};
	
		if ( ! settings.oFeatures.bStateSave ) {
			callback();
			return;
		}
	
		var state = settings.fnStateLoadCallback.call( settings.oInstance, settings, loaded );
	
		if ( state !== undefined ) {
			loaded( state );
		}
		// otherwise, wait for the loaded callback to be executed
	}
	
	
	/**
	 * Return the settings object for a particular table
	 *  @param {node} table table we are using as a dataTable
	 *  @returns {object} Settings object - or null if not found
	 *  @memberof DataTable#oApi
	 */
	function _fnSettingsFromNode ( table )
	{
		var settings = DataTable.settings;
		var idx = $.inArray( table, _pluck( settings, 'nTable' ) );
	
		return idx !== -1 ?
			settings[ idx ] :
			null;
	}
	
	
	/**
	 * Log an error message
	 *  @param {object} settings dataTables settings object
	 *  @param {int} level log error messages, or display them to the user
	 *  @param {string} msg error message
	 *  @param {int} tn Technical note id to get more information about the error.
	 *  @memberof DataTable#oApi
	 */
	function _fnLog( settings, level, msg, tn )
	{
		msg = 'DataTables warning: '+
			(settings ? 'table id='+settings.sTableId+' - ' : '')+msg;
	
		if ( tn ) {
			msg += '. For more information about this error, please see '+
			'http://datatables.net/tn/'+tn;
		}
	
		if ( ! level  ) {
			// Backwards compatibility pre 1.10
			var ext = DataTable.ext;
			var type = ext.sErrMode || ext.errMode;
	
			if ( settings ) {
				_fnCallbackFire( settings, null, 'error', [ settings, tn, msg ] );
			}
	
			if ( type == 'alert' ) {
				alert( msg );
			}
			else if ( type == 'throw' ) {
				throw new Error(msg);
			}
			else if ( typeof type == 'function' ) {
				type( settings, tn, msg );
			}
		}
		else if ( window.console && console.log ) {
			console.log( msg );
		}
	}
	
	
	/**
	 * See if a property is defined on one object, if so assign it to the other object
	 *  @param {object} ret target object
	 *  @param {object} src source object
	 *  @param {string} name property
	 *  @param {string} [mappedName] name to map too - optional, name used if not given
	 *  @memberof DataTable#oApi
	 */
	function _fnMap( ret, src, name, mappedName )
	{
		if ( $.isArray( name ) ) {
			$.each( name, function (i, val) {
				if ( $.isArray( val ) ) {
					_fnMap( ret, src, val[0], val[1] );
				}
				else {
					_fnMap( ret, src, val );
				}
			} );
	
			return;
		}
	
		if ( mappedName === undefined ) {
			mappedName = name;
		}
	
		if ( src[name] !== undefined ) {
			ret[mappedName] = src[name];
		}
	}
	
	
	/**
	 * Extend objects - very similar to jQuery.extend, but deep copy objects, and
	 * shallow copy arrays. The reason we need to do this, is that we don't want to
	 * deep copy array init values (such as aaSorting) since the dev wouldn't be
	 * able to override them, but we do want to deep copy arrays.
	 *  @param {object} out Object to extend
	 *  @param {object} extender Object from which the properties will be applied to
	 *      out
	 *  @param {boolean} breakRefs If true, then arrays will be sliced to take an
	 *      independent copy with the exception of the `data` or `aaData` parameters
	 *      if they are present. This is so you can pass in a collection to
	 *      DataTables and have that used as your data source without breaking the
	 *      references
	 *  @returns {object} out Reference, just for convenience - out === the return.
	 *  @memberof DataTable#oApi
	 *  @todo This doesn't take account of arrays inside the deep copied objects.
	 */
	function _fnExtend( out, extender, breakRefs )
	{
		var val;
	
		for ( var prop in extender ) {
			if ( extender.hasOwnProperty(prop) ) {
				val = extender[prop];
	
				if ( $.isPlainObject( val ) ) {
					if ( ! $.isPlainObject( out[prop] ) ) {
						out[prop] = {};
					}
					$.extend( true, out[prop], val );
				}
				else if ( breakRefs && prop !== 'data' && prop !== 'aaData' && $.isArray(val) ) {
					out[prop] = val.slice();
				}
				else {
					out[prop] = val;
				}
			}
		}
	
		return out;
	}
	
	
	/**
	 * Bind an event handers to allow a click or return key to activate the callback.
	 * This is good for accessibility since a return on the keyboard will have the
	 * same effect as a click, if the element has focus.
	 *  @param {element} n Element to bind the action to
	 *  @param {object} oData Data object to pass to the triggered function
	 *  @param {function} fn Callback function for when the event is triggered
	 *  @memberof DataTable#oApi
	 */
	function _fnBindAction( n, oData, fn )
	{
		$(n)
			.on( 'click.DT', oData, function (e) {
					$(n).blur(); // Remove focus outline for mouse users
					fn(e);
				} )
			.on( 'keypress.DT', oData, function (e){
					if ( e.which === 13 ) {
						e.preventDefault();
						fn(e);
					}
				} )
			.on( 'selectstart.DT', function () {
					/* Take the brutal approach to cancelling text selection */
					return false;
				} );
	}
	
	
	/**
	 * Register a callback function. Easily allows a callback function to be added to
	 * an array store of callback functions that can then all be called together.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sStore Name of the array storage for the callbacks in oSettings
	 *  @param {function} fn Function to be called back
	 *  @param {string} sName Identifying name for the callback (i.e. a label)
	 *  @memberof DataTable#oApi
	 */
	function _fnCallbackReg( oSettings, sStore, fn, sName )
	{
		if ( fn )
		{
			oSettings[sStore].push( {
				"fn": fn,
				"sName": sName
			} );
		}
	}
	
	
	/**
	 * Fire callback functions and trigger events. Note that the loop over the
	 * callback array store is done backwards! Further note that you do not want to
	 * fire off triggers in time sensitive applications (for example cell creation)
	 * as its slow.
	 *  @param {object} settings dataTables settings object
	 *  @param {string} callbackArr Name of the array storage for the callbacks in
	 *      oSettings
	 *  @param {string} eventName Name of the jQuery custom event to trigger. If
	 *      null no trigger is fired
	 *  @param {array} args Array of arguments to pass to the callback function /
	 *      trigger
	 *  @memberof DataTable#oApi
	 */
	function _fnCallbackFire( settings, callbackArr, eventName, args )
	{
		var ret = [];
	
		if ( callbackArr ) {
			ret = $.map( settings[callbackArr].slice().reverse(), function (val, i) {
				return val.fn.apply( settings.oInstance, args );
			} );
		}
	
		if ( eventName !== null ) {
			var e = $.Event( eventName+'.dt' );
	
			$(settings.nTable).trigger( e, args );
	
			ret.push( e.result );
		}
	
		return ret;
	}
	
	
	function _fnLengthOverflow ( settings )
	{
		var
			start = settings._iDisplayStart,
			end = settings.fnDisplayEnd(),
			len = settings._iDisplayLength;
	
		/* If we have space to show extra rows (backing up from the end point - then do so */
		if ( start >= end )
		{
			start = end - len;
		}
	
		// Keep the start record on the current page
		start -= (start % len);
	
		if ( len === -1 || start < 0 )
		{
			start = 0;
		}
	
		settings._iDisplayStart = start;
	}
	
	
	function _fnRenderer( settings, type )
	{
		var renderer = settings.renderer;
		var host = DataTable.ext.renderer[type];
	
		if ( $.isPlainObject( renderer ) && renderer[type] ) {
			// Specific renderer for this type. If available use it, otherwise use
			// the default.
			return host[renderer[type]] || host._;
		}
		else if ( typeof renderer === 'string' ) {
			// Common renderer - if there is one available for this type use it,
			// otherwise use the default
			return host[renderer] || host._;
		}
	
		// Use the default
		return host._;
	}
	
	
	/**
	 * Detect the data source being used for the table. Used to simplify the code
	 * a little (ajax) and to make it compress a little smaller.
	 *
	 *  @param {object} settings dataTables settings object
	 *  @returns {string} Data source
	 *  @memberof DataTable#oApi
	 */
	function _fnDataSource ( settings )
	{
		if ( settings.oFeatures.bServerSide ) {
			return 'ssp';
		}
		else if ( settings.ajax || settings.sAjaxSource ) {
			return 'ajax';
		}
		return 'dom';
	}
	

	
	
	/**
	 * Computed structure of the DataTables API, defined by the options passed to
	 * `DataTable.Api.register()` when building the API.
	 *
	 * The structure is built in order to speed creation and extension of the Api
	 * objects since the extensions are effectively pre-parsed.
	 *
	 * The array is an array of objects with the following structure, where this
	 * base array represents the Api prototype base:
	 *
	 *     [
	 *       {
	 *         name:      'data'                -- string   - Property name
	 *         val:       function () {},       -- function - Api method (or undefined if just an object
	 *         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	 *         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	 *       },
	 *       {
	 *         name:     'row'
	 *         val:       {},
	 *         methodExt: [ ... ],
	 *         propExt:   [
	 *           {
	 *             name:      'data'
	 *             val:       function () {},
	 *             methodExt: [ ... ],
	 *             propExt:   [ ... ]
	 *           },
	 *           ...
	 *         ]
	 *       }
	 *     ]
	 *
	 * @type {Array}
	 * @ignore
	 */
	var __apiStruct = [];
	
	
	/**
	 * `Array.prototype` reference.
	 *
	 * @type object
	 * @ignore
	 */
	var __arrayProto = Array.prototype;
	
	
	/**
	 * Abstraction for `context` parameter of the `Api` constructor to allow it to
	 * take several different forms for ease of use.
	 *
	 * Each of the input parameter types will be converted to a DataTables settings
	 * object where possible.
	 *
	 * @param  {string|node|jQuery|object} mixed DataTable identifier. Can be one
	 *   of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 *   * `DataTables.Api` - API instance
	 * @return {array|null} Matching DataTables settings objects. `null` or
	 *   `undefined` is returned if no matching DataTable is found.
	 * @ignore
	 */
	var _toSettings = function ( mixed )
	{
		var idx, jq;
		var settings = DataTable.settings;
		var tables = $.map( settings, function (el, i) {
			return el.nTable;
		} );
	
		if ( ! mixed ) {
			return [];
		}
		else if ( mixed.nTable && mixed.oApi ) {
			// DataTables settings object
			return [ mixed ];
		}
		else if ( mixed.nodeName && mixed.nodeName.toLowerCase() === 'table' ) {
			// Table node
			idx = $.inArray( mixed, tables );
			return idx !== -1 ? [ settings[idx] ] : null;
		}
		else if ( mixed && typeof mixed.settings === 'function' ) {
			return mixed.settings().toArray();
		}
		else if ( typeof mixed === 'string' ) {
			// jQuery selector
			jq = $(mixed);
		}
		else if ( mixed instanceof $ ) {
			// jQuery object (also DataTables instance)
			jq = mixed;
		}
	
		if ( jq ) {
			return jq.map( function(i) {
				idx = $.inArray( this, tables );
				return idx !== -1 ? settings[idx] : null;
			} ).toArray();
		}
	};
	
	
	/**
	 * DataTables API class - used to control and interface with  one or more
	 * DataTables enhanced tables.
	 *
	 * The API class is heavily based on jQuery, presenting a chainable interface
	 * that you can use to interact with tables. Each instance of the API class has
	 * a "context" - i.e. the tables that it will operate on. This could be a single
	 * table, all tables on a page or a sub-set thereof.
	 *
	 * Additionally the API is designed to allow you to easily work with the data in
	 * the tables, retrieving and manipulating it as required. This is done by
	 * presenting the API class as an array like interface. The contents of the
	 * array depend upon the actions requested by each method (for example
	 * `rows().nodes()` will return an array of nodes, while `rows().data()` will
	 * return an array of objects or arrays depending upon your table's
	 * configuration). The API object has a number of array like methods (`push`,
	 * `pop`, `reverse` etc) as well as additional helper methods (`each`, `pluck`,
	 * `unique` etc) to assist your working with the data held in a table.
	 *
	 * Most methods (those which return an Api instance) are chainable, which means
	 * the return from a method call also has all of the methods available that the
	 * top level object had. For example, these two calls are equivalent:
	 *
	 *     // Not chained
	 *     api.row.add( {...} );
	 *     api.draw();
	 *
	 *     // Chained
	 *     api.row.add( {...} ).draw();
	 *
	 * @class DataTable.Api
	 * @param {array|object|string|jQuery} context DataTable identifier. This is
	 *   used to define which DataTables enhanced tables this API will operate on.
	 *   Can be one of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 * @param {array} [data] Data to initialise the Api instance with.
	 *
	 * @example
	 *   // Direct initialisation during DataTables construction
	 *   var api = $('#example').DataTable();
	 *
	 * @example
	 *   // Initialisation using a DataTables jQuery object
	 *   var api = $('#example').dataTable().api();
	 *
	 * @example
	 *   // Initialisation as a constructor
	 *   var api = new $.fn.DataTable.Api( 'table.dataTable' );
	 */
	_Api = function ( context, data )
	{
		if ( ! (this instanceof _Api) ) {
			return new _Api( context, data );
		}
	
		var settings = [];
		var ctxSettings = function ( o ) {
			var a = _toSettings( o );
			if ( a ) {
				settings.push.apply( settings, a );
			}
		};
	
		if ( $.isArray( context ) ) {
			for ( var i=0, ien=context.length ; i<ien ; i++ ) {
				ctxSettings( context[i] );
			}
		}
		else {
			ctxSettings( context );
		}
	
		// Remove duplicates
		this.context = _unique( settings );
	
		// Initial data
		if ( data ) {
			$.merge( this, data );
		}
	
		// selector
		this.selector = {
			rows: null,
			cols: null,
			opts: null
		};
	
		_Api.extend( this, this, __apiStruct );
	};
	
	DataTable.Api = _Api;
	
	// Don't destroy the existing prototype, just extend it. Required for jQuery 2's
	// isPlainObject.
	$.extend( _Api.prototype, {
		any: function ()
		{
			return this.count() !== 0;
		},
	
	
		concat:  __arrayProto.concat,
	
	
		context: [], // array of table settings objects
	
	
		count: function ()
		{
			return this.flatten().length;
		},
	
	
		each: function ( fn )
		{
			for ( var i=0, ien=this.length ; i<ien; i++ ) {
				fn.call( this, this[i], i, this );
			}
	
			return this;
		},
	
	
		eq: function ( idx )
		{
			var ctx = this.context;
	
			return ctx.length > idx ?
				new _Api( ctx[idx], this[idx] ) :
				null;
		},
	
	
		filter: function ( fn )
		{
			var a = [];
	
			if ( __arrayProto.filter ) {
				a = __arrayProto.filter.call( this, fn, this );
			}
			else {
				// Compatibility for browsers without EMCA-252-5 (JS 1.6)
				for ( var i=0, ien=this.length ; i<ien ; i++ ) {
					if ( fn.call( this, this[i], i, this ) ) {
						a.push( this[i] );
					}
				}
			}
	
			return new _Api( this.context, a );
		},
	
	
		flatten: function ()
		{
			var a = [];
			return new _Api( this.context, a.concat.apply( a, this.toArray() ) );
		},
	
	
		join:    __arrayProto.join,
	
	
		indexOf: __arrayProto.indexOf || function (obj, start)
		{
			for ( var i=(start || 0), ien=this.length ; i<ien ; i++ ) {
				if ( this[i] === obj ) {
					return i;
				}
			}
			return -1;
		},
	
		iterator: function ( flatten, type, fn, alwaysNew ) {
			var
				a = [], ret,
				i, ien, j, jen,
				context = this.context,
				rows, items, item,
				selector = this.selector;
	
			// Argument shifting
			if ( typeof flatten === 'string' ) {
				alwaysNew = fn;
				fn = type;
				type = flatten;
				flatten = false;
			}
	
			for ( i=0, ien=context.length ; i<ien ; i++ ) {
				var apiInst = new _Api( context[i] );
	
				if ( type === 'table' ) {
					ret = fn.call( apiInst, context[i], i );
	
					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
				else if ( type === 'columns' || type === 'rows' ) {
					// this has same length as context - one entry for each table
					ret = fn.call( apiInst, context[i], this[i], i );
	
					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
				else if ( type === 'column' || type === 'column-rows' || type === 'row' || type === 'cell' ) {
					// columns and rows share the same structure.
					// 'this' is an array of column indexes for each context
					items = this[i];
	
					if ( type === 'column-rows' ) {
						rows = _selector_row_indexes( context[i], selector.opts );
					}
	
					for ( j=0, jen=items.length ; j<jen ; j++ ) {
						item = items[j];
	
						if ( type === 'cell' ) {
							ret = fn.call( apiInst, context[i], item.row, item.column, i, j );
						}
						else {
							ret = fn.call( apiInst, context[i], item, i, j, rows );
						}
	
						if ( ret !== undefined ) {
							a.push( ret );
						}
					}
				}
			}
	
			if ( a.length || alwaysNew ) {
				var api = new _Api( context, flatten ? a.concat.apply( [], a ) : a );
				var apiSelector = api.selector;
				apiSelector.rows = selector.rows;
				apiSelector.cols = selector.cols;
				apiSelector.opts = selector.opts;
				return api;
			}
			return this;
		},
	
	
		lastIndexOf: __arrayProto.lastIndexOf || function (obj, start)
		{
			// Bit cheeky...
			return this.indexOf.apply( this.toArray.reverse(), arguments );
		},
	
	
		length:  0,
	
	
		map: function ( fn )
		{
			var a = [];
	
			if ( __arrayProto.map ) {
				a = __arrayProto.map.call( this, fn, this );
			}
			else {
				// Compatibility for browsers without EMCA-252-5 (JS 1.6)
				for ( var i=0, ien=this.length ; i<ien ; i++ ) {
					a.push( fn.call( this, this[i], i ) );
				}
			}
	
			return new _Api( this.context, a );
		},
	
	
		pluck: function ( prop )
		{
			return this.map( function ( el ) {
				return el[ prop ];
			} );
		},
	
		pop:     __arrayProto.pop,
	
	
		push:    __arrayProto.push,
	
	
		// Does not return an API instance
		reduce: __arrayProto.reduce || function ( fn, init )
		{
			return _fnReduce( this, fn, init, 0, this.length, 1 );
		},
	
	
		reduceRight: __arrayProto.reduceRight || function ( fn, init )
		{
			return _fnReduce( this, fn, init, this.length-1, -1, -1 );
		},
	
	
		reverse: __arrayProto.reverse,
	
	
		// Object with rows, columns and opts
		selector: null,
	
	
		shift:   __arrayProto.shift,
	
	
		slice: function () {
			return new _Api( this.context, this );
		},
	
	
		sort:    __arrayProto.sort, // ? name - order?
	
	
		splice:  __arrayProto.splice,
	
	
		toArray: function ()
		{
			return __arrayProto.slice.call( this );
		},
	
	
		to$: function ()
		{
			return $( this );
		},
	
	
		toJQuery: function ()
		{
			return $( this );
		},
	
	
		unique: function ()
		{
			return new _Api( this.context, _unique(this) );
		},
	
	
		unshift: __arrayProto.unshift
	} );
	
	
	_Api.extend = function ( scope, obj, ext )
	{
		// Only extend API instances and static properties of the API
		if ( ! ext.length || ! obj || ( ! (obj instanceof _Api) && ! obj.__dt_wrapper ) ) {
			return;
		}
	
		var
			i, ien,
			struct,
			methodScoping = function ( scope, fn, struc ) {
				return function () {
					var ret = fn.apply( scope, arguments );
	
					// Method extension
					_Api.extend( ret, ret, struc.methodExt );
					return ret;
				};
			};
	
		for ( i=0, ien=ext.length ; i<ien ; i++ ) {
			struct = ext[i];
	
			// Value
			obj[ struct.name ] = struct.type === 'function' ?
				methodScoping( scope, struct.val, struct ) :
				struct.type === 'object' ?
					{} :
					struct.val;
	
			obj[ struct.name ].__dt_wrapper = true;
	
			// Property extension
			_Api.extend( scope, obj[ struct.name ], struct.propExt );
		}
	};
	
	
	// @todo - Is there need for an augment function?
	// _Api.augment = function ( inst, name )
	// {
	// 	// Find src object in the structure from the name
	// 	var parts = name.split('.');
	
	// 	_Api.extend( inst, obj );
	// };
	
	
	//     [
	//       {
	//         name:      'data'                -- string   - Property name
	//         val:       function () {},       -- function - Api method (or undefined if just an object
	//         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	//         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	//       },
	//       {
	//         name:     'row'
	//         val:       {},
	//         methodExt: [ ... ],
	//         propExt:   [
	//           {
	//             name:      'data'
	//             val:       function () {},
	//             methodExt: [ ... ],
	//             propExt:   [ ... ]
	//           },
	//           ...
	//         ]
	//       }
	//     ]
	
	_Api.register = _api_register = function ( name, val )
	{
		if ( $.isArray( name ) ) {
			for ( var j=0, jen=name.length ; j<jen ; j++ ) {
				_Api.register( name[j], val );
			}
			return;
		}
	
		var
			i, ien,
			heir = name.split('.'),
			struct = __apiStruct,
			key, method;
	
		var find = function ( src, name ) {
			for ( var i=0, ien=src.length ; i<ien ; i++ ) {
				if ( src[i].name === name ) {
					return src[i];
				}
			}
			return null;
		};
	
		for ( i=0, ien=heir.length ; i<ien ; i++ ) {
			method = heir[i].indexOf('()') !== -1;
			key = method ?
				heir[i].replace('()', '') :
				heir[i];
	
			var src = find( struct, key );
			if ( ! src ) {
				src = {
					name:      key,
					val:       {},
					methodExt: [],
					propExt:   [],
					type:      'object'
				};
				struct.push( src );
			}
	
			if ( i === ien-1 ) {
				src.val = val;
				src.type = typeof val === 'function' ?
					'function' :
					$.isPlainObject( val ) ?
						'object' :
						'other';
			}
			else {
				struct = method ?
					src.methodExt :
					src.propExt;
			}
		}
	};
	
	_Api.registerPlural = _api_registerPlural = function ( pluralName, singularName, val ) {
		_Api.register( pluralName, val );
	
		_Api.register( singularName, function () {
			var ret = val.apply( this, arguments );
	
			if ( ret === this ) {
				// Returned item is the API instance that was passed in, return it
				return this;
			}
			else if ( ret instanceof _Api ) {
				// New API instance returned, want the value from the first item
				// in the returned array for the singular result.
				return ret.length ?
					$.isArray( ret[0] ) ?
						new _Api( ret.context, ret[0] ) : // Array results are 'enhanced'
						ret[0] :
					undefined;
			}
	
			// Non-API return - just fire it back
			return ret;
		} );
	};
	
	
	/**
	 * Selector for HTML tables. Apply the given selector to the give array of
	 * DataTables settings objects.
	 *
	 * @param {string|integer} [selector] jQuery selector string or integer
	 * @param  {array} Array of DataTables settings objects to be filtered
	 * @return {array}
	 * @ignore
	 */
	var __table_selector = function ( selector, a )
	{
		// Integer is used to pick out a table by index
		if ( typeof selector === 'number' ) {
			return [ a[ selector ] ];
		}
	
		// Perform a jQuery selector on the table nodes
		var nodes = $.map( a, function (el, i) {
			return el.nTable;
		} );
	
		return $(nodes)
			.filter( selector )
			.map( function (i) {
				// Need to translate back from the table node to the settings
				var idx = $.inArray( this, nodes );
				return a[ idx ];
			} )
			.toArray();
	};
	
	
	
	/**
	 * Context selector for the API's context (i.e. the tables the API instance
	 * refers to.
	 *
	 * @name    DataTable.Api#tables
	 * @param {string|integer} [selector] Selector to pick which tables the iterator
	 *   should operate on. If not given, all tables in the current context are
	 *   used. This can be given as a jQuery selector (for example `':gt(0)'`) to
	 *   select multiple tables or as an integer to select a single table.
	 * @returns {DataTable.Api} Returns a new API instance if a selector is given.
	 */
	_api_register( 'tables()', function ( selector ) {
		// A new instance is created if there was a selector specified
		return selector ?
			new _Api( __table_selector( selector, this.context ) ) :
			this;
	} );
	
	
	_api_register( 'table()', function ( selector ) {
		var tables = this.tables( selector );
		var ctx = tables.context;
	
		// Truncate to the first matched table
		return ctx.length ?
			new _Api( ctx[0] ) :
			tables;
	} );
	
	
	_api_registerPlural( 'tables().nodes()', 'table().node()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTable;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().body()', 'table().body()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTBody;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().header()', 'table().header()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTHead;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().footer()', 'table().footer()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTFoot;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().containers()', 'table().container()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTableWrapper;
		}, 1 );
	} );
	
	
	
	/**
	 * Redraw the tables in the current context.
	 */
	_api_register( 'draw()', function ( paging ) {
		return this.iterator( 'table', function ( settings ) {
			if ( paging === 'page' ) {
				_fnDraw( settings );
			}
			else {
				if ( typeof paging === 'string' ) {
					paging = paging === 'full-hold' ?
						false :
						true;
				}
	
				_fnReDraw( settings, paging===false );
			}
		} );
	} );
	
	
	
	/**
	 * Get the current page index.
	 *
	 * @return {integer} Current page index (zero based)
	 *//**
	 * Set the current page.
	 *
	 * Note that if you attempt to show a page which does not exist, DataTables will
	 * not throw an error, but rather reset the paging.
	 *
	 * @param {integer|string} action The paging action to take. This can be one of:
	 *  * `integer` - The page index to jump to
	 *  * `string` - An action to take:
	 *    * `first` - Jump to first page.
	 *    * `next` - Jump to the next page
	 *    * `previous` - Jump to previous page
	 *    * `last` - Jump to the last page.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'page()', function ( action ) {
		if ( action === undefined ) {
			return this.page.info().page; // not an expensive call
		}
	
		// else, have an action to take on all tables
		return this.iterator( 'table', function ( settings ) {
			_fnPageChange( settings, action );
		} );
	} );
	
	
	/**
	 * Paging information for the first table in the current context.
	 *
	 * If you require paging information for another table, use the `table()` method
	 * with a suitable selector.
	 *
	 * @return {object} Object with the following properties set:
	 *  * `page` - Current page index (zero based - i.e. the first page is `0`)
	 *  * `pages` - Total number of pages
	 *  * `start` - Display index for the first record shown on the current page
	 *  * `end` - Display index for the last record shown on the current page
	 *  * `length` - Display length (number of records). Note that generally `start
	 *    + length = end`, but this is not always true, for example if there are
	 *    only 2 records to show on the final page, with a length of 10.
	 *  * `recordsTotal` - Full data set length
	 *  * `recordsDisplay` - Data set length once the current filtering criterion
	 *    are applied.
	 */
	_api_register( 'page.info()', function ( action ) {
		if ( this.context.length === 0 ) {
			return undefined;
		}
	
		var
			settings   = this.context[0],
			start      = settings._iDisplayStart,
			len        = settings.oFeatures.bPaginate ? settings._iDisplayLength : -1,
			visRecords = settings.fnRecordsDisplay(),
			all        = len === -1;
	
		return {
			"page":           all ? 0 : Math.floor( start / len ),
			"pages":          all ? 1 : Math.ceil( visRecords / len ),
			"start":          start,
			"end":            settings.fnDisplayEnd(),
			"length":         len,
			"recordsTotal":   settings.fnRecordsTotal(),
			"recordsDisplay": visRecords,
			"serverSide":     _fnDataSource( settings ) === 'ssp'
		};
	} );
	
	
	/**
	 * Get the current page length.
	 *
	 * @return {integer} Current page length. Note `-1` indicates that all records
	 *   are to be shown.
	 *//**
	 * Set the current page length.
	 *
	 * @param {integer} Page length to set. Use `-1` to show all records.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'page.len()', function ( len ) {
		// Note that we can't call this function 'length()' because `length`
		// is a Javascript property of functions which defines how many arguments
		// the function expects.
		if ( len === undefined ) {
			return this.context.length !== 0 ?
				this.context[0]._iDisplayLength :
				undefined;
		}
	
		// else, set the page length
		return this.iterator( 'table', function ( settings ) {
			_fnLengthChange( settings, len );
		} );
	} );
	
	
	
	var __reload = function ( settings, holdPosition, callback ) {
		// Use the draw event to trigger a callback
		if ( callback ) {
			var api = new _Api( settings );
	
			api.one( 'draw', function () {
				callback( api.ajax.json() );
			} );
		}
	
		if ( _fnDataSource( settings ) == 'ssp' ) {
			_fnReDraw( settings, holdPosition );
		}
		else {
			_fnProcessingDisplay( settings, true );
	
			// Cancel an existing request
			var xhr = settings.jqXHR;
			if ( xhr && xhr.readyState !== 4 ) {
				xhr.abort();
			}
	
			// Trigger xhr
			_fnBuildAjax( settings, [], function( json ) {
				_fnClearTable( settings );
	
				var data = _fnAjaxDataSrc( settings, json );
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					_fnAddData( settings, data[i] );
				}
	
				_fnReDraw( settings, holdPosition );
				_fnProcessingDisplay( settings, false );
			} );
		}
	};
	
	
	/**
	 * Get the JSON response from the last Ajax request that DataTables made to the
	 * server. Note that this returns the JSON from the first table in the current
	 * context.
	 *
	 * @return {object} JSON received from the server.
	 */
	_api_register( 'ajax.json()', function () {
		var ctx = this.context;
	
		if ( ctx.length > 0 ) {
			return ctx[0].json;
		}
	
		// else return undefined;
	} );
	
	
	/**
	 * Get the data submitted in the last Ajax request
	 */
	_api_register( 'ajax.params()', function () {
		var ctx = this.context;
	
		if ( ctx.length > 0 ) {
			return ctx[0].oAjaxData;
		}
	
		// else return undefined;
	} );
	
	
	/**
	 * Reload tables from the Ajax data source. Note that this function will
	 * automatically re-draw the table when the remote data has been loaded.
	 *
	 * @param {boolean} [reset=true] Reset (default) or hold the current paging
	 *   position. A full re-sort and re-filter is performed when this method is
	 *   called, which is why the pagination reset is the default action.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.reload()', function ( callback, resetPaging ) {
		return this.iterator( 'table', function (settings) {
			__reload( settings, resetPaging===false, callback );
		} );
	} );
	
	
	/**
	 * Get the current Ajax URL. Note that this returns the URL from the first
	 * table in the current context.
	 *
	 * @return {string} Current Ajax source URL
	 *//**
	 * Set the Ajax URL. Note that this will set the URL for all tables in the
	 * current context.
	 *
	 * @param {string} url URL to set.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.url()', function ( url ) {
		var ctx = this.context;
	
		if ( url === undefined ) {
			// get
			if ( ctx.length === 0 ) {
				return undefined;
			}
			ctx = ctx[0];
	
			return ctx.ajax ?
				$.isPlainObject( ctx.ajax ) ?
					ctx.ajax.url :
					ctx.ajax :
				ctx.sAjaxSource;
		}
	
		// set
		return this.iterator( 'table', function ( settings ) {
			if ( $.isPlainObject( settings.ajax ) ) {
				settings.ajax.url = url;
			}
			else {
				settings.ajax = url;
			}
			// No need to consider sAjaxSource here since DataTables gives priority
			// to `ajax` over `sAjaxSource`. So setting `ajax` here, renders any
			// value of `sAjaxSource` redundant.
		} );
	} );
	
	
	/**
	 * Load data from the newly set Ajax URL. Note that this method is only
	 * available when `ajax.url()` is used to set a URL. Additionally, this method
	 * has the same effect as calling `ajax.reload()` but is provided for
	 * convenience when setting a new URL. Like `ajax.reload()` it will
	 * automatically redraw the table once the remote data has been loaded.
	 *
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.url().load()', function ( callback, resetPaging ) {
		// Same as a reload, but makes sense to present it for easy access after a
		// url change
		return this.iterator( 'table', function ( ctx ) {
			__reload( ctx, resetPaging===false, callback );
		} );
	} );
	
	
	
	
	var _selector_run = function ( type, selector, selectFn, settings, opts )
	{
		var
			out = [], res,
			a, i, ien, j, jen,
			selectorType = typeof selector;
	
		// Can't just check for isArray here, as an API or jQuery instance might be
		// given with their array like look
		if ( ! selector || selectorType === 'string' || selectorType === 'function' || selector.length === undefined ) {
			selector = [ selector ];
		}
	
		for ( i=0, ien=selector.length ; i<ien ; i++ ) {
			// Only split on simple strings - complex expressions will be jQuery selectors
			a = selector[i] && selector[i].split && ! selector[i].match(/[\[\(:]/) ?
				selector[i].split(',') :
				[ selector[i] ];
	
			for ( j=0, jen=a.length ; j<jen ; j++ ) {
				res = selectFn( typeof a[j] === 'string' ? $.trim(a[j]) : a[j] );
	
				if ( res && res.length ) {
					out = out.concat( res );
				}
			}
		}
	
		// selector extensions
		var ext = _ext.selector[ type ];
		if ( ext.length ) {
			for ( i=0, ien=ext.length ; i<ien ; i++ ) {
				out = ext[i]( settings, opts, out );
			}
		}
	
		return _unique( out );
	};
	
	
	var _selector_opts = function ( opts )
	{
		if ( ! opts ) {
			opts = {};
		}
	
		// Backwards compatibility for 1.9- which used the terminology filter rather
		// than search
		if ( opts.filter && opts.search === undefined ) {
			opts.search = opts.filter;
		}
	
		return $.extend( {
			search: 'none',
			order: 'current',
			page: 'all'
		}, opts );
	};
	
	
	var _selector_first = function ( inst )
	{
		// Reduce the API instance to the first item found
		for ( var i=0, ien=inst.length ; i<ien ; i++ ) {
			if ( inst[i].length > 0 ) {
				// Assign the first element to the first item in the instance
				// and truncate the instance and context
				inst[0] = inst[i];
				inst[0].length = 1;
				inst.length = 1;
				inst.context = [ inst.context[i] ];
	
				return inst;
			}
		}
	
		// Not found - return an empty instance
		inst.length = 0;
		return inst;
	};
	
	
	var _selector_row_indexes = function ( settings, opts )
	{
		var
			i, ien, tmp, a=[],
			displayFiltered = settings.aiDisplay,
			displayMaster = settings.aiDisplayMaster;
	
		var
			search = opts.search,  // none, applied, removed
			order  = opts.order,   // applied, current, index (original - compatibility with 1.9)
			page   = opts.page;    // all, current
	
		if ( _fnDataSource( settings ) == 'ssp' ) {
			// In server-side processing mode, most options are irrelevant since
			// rows not shown don't exist and the index order is the applied order
			// Removed is a special case - for consistency just return an empty
			// array
			return search === 'removed' ?
				[] :
				_range( 0, displayMaster.length );
		}
		else if ( page == 'current' ) {
			// Current page implies that order=current and fitler=applied, since it is
			// fairly senseless otherwise, regardless of what order and search actually
			// are
			for ( i=settings._iDisplayStart, ien=settings.fnDisplayEnd() ; i<ien ; i++ ) {
				a.push( displayFiltered[i] );
			}
		}
		else if ( order == 'current' || order == 'applied' ) {
			if ( search == 'none') {
				a = displayMaster.slice();
			}
			else if ( search == 'applied' ) {
				a = displayFiltered.slice();
			}
			else if ( search == 'removed' ) {
				// O(n+m) solution by creating a hash map
				var displayFilteredMap = {};
	
				for ( var i=0, ien=displayFiltered.length ; i<ien ; i++ ) {
					displayFilteredMap[displayFiltered[i]] = null;
				}
	
				a = $.map( displayMaster, function (el) {
					return ! displayFilteredMap.hasOwnProperty(el) ?
						el :
						null;
				} );
			}
		}
		else if ( order == 'index' || order == 'original' ) {
			for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
				if ( search == 'none' ) {
					a.push( i );
				}
				else { // applied | removed
					tmp = $.inArray( i, displayFiltered );
	
					if ((tmp === -1 && search == 'removed') ||
						(tmp >= 0   && search == 'applied') )
					{
						a.push( i );
					}
				}
			}
		}
	
		return a;
	};
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Rows
	 *
	 * {}          - no selector - use all available rows
	 * {integer}   - row aoData index
	 * {node}      - TR node
	 * {string}    - jQuery selector to apply to the TR elements
	 * {array}     - jQuery array of nodes, or simply an array of TR nodes
	 *
	 */
	var __row_selector = function ( settings, selector, opts )
	{
		var rows;
		var run = function ( sel ) {
			var selInt = _intVal( sel );
			var i, ien;
			var aoData = settings.aoData;
	
			// Short cut - selector is a number and no options provided (default is
			// all records, so no need to check if the index is in there, since it
			// must be - dev error if the index doesn't exist).
			if ( selInt !== null && ! opts ) {
				return [ selInt ];
			}
	
			if ( ! rows ) {
				rows = _selector_row_indexes( settings, opts );
			}
	
			if ( selInt !== null && $.inArray( selInt, rows ) !== -1 ) {
				// Selector - integer
				return [ selInt ];
			}
			else if ( sel === null || sel === undefined || sel === '' ) {
				// Selector - none
				return rows;
			}
	
			// Selector - function
			if ( typeof sel === 'function' ) {
				return $.map( rows, function (idx) {
					var row = aoData[ idx ];
					return sel( idx, row._aData, row.nTr ) ? idx : null;
				} );
			}
	
			// Selector - node
			if ( sel.nodeName ) {
				var rowIdx = sel._DT_RowIndex;  // Property added by DT for fast lookup
				var cellIdx = sel._DT_CellIndex;
	
				if ( rowIdx !== undefined ) {
					// Make sure that the row is actually still present in the table
					return aoData[ rowIdx ] && aoData[ rowIdx ].nTr === sel ?
						[ rowIdx ] :
						[];
				}
				else if ( cellIdx ) {
					return aoData[ cellIdx.row ] && aoData[ cellIdx.row ].nTr === sel.parentNode ?
						[ cellIdx.row ] :
						[];
				}
				else {
					var host = $(sel).closest('*[data-dt-row]');
					return host.length ?
						[ host.data('dt-row') ] :
						[];
				}
			}
	
			// ID selector. Want to always be able to select rows by id, regardless
			// of if the tr element has been created or not, so can't rely upon
			// jQuery here - hence a custom implementation. This does not match
			// Sizzle's fast selector or HTML4 - in HTML5 the ID can be anything,
			// but to select it using a CSS selector engine (like Sizzle or
			// querySelect) it would need to need to be escaped for some characters.
			// DataTables simplifies this for row selectors since you can select
			// only a row. A # indicates an id any anything that follows is the id -
			// unescaped.
			if ( typeof sel === 'string' && sel.charAt(0) === '#' ) {
				// get row index from id
				var rowObj = settings.aIds[ sel.replace( /^#/, '' ) ];
				if ( rowObj !== undefined ) {
					return [ rowObj.idx ];
				}
	
				// need to fall through to jQuery in case there is DOM id that
				// matches
			}
			
			// Get nodes in the order from the `rows` array with null values removed
			var nodes = _removeEmpty(
				_pluck_order( settings.aoData, rows, 'nTr' )
			);
	
			// Selector - jQuery selector string, array of nodes or jQuery object/
			// As jQuery's .filter() allows jQuery objects to be passed in filter,
			// it also allows arrays, so this will cope with all three options
			return $(nodes)
				.filter( sel )
				.map( function () {
					return this._DT_RowIndex;
				} )
				.toArray();
		};
	
		return _selector_run( 'row', selector, run, settings, opts );
	};
	
	
	_api_register( 'rows()', function ( selector, opts ) {
		// argument shifting
		if ( selector === undefined ) {
			selector = '';
		}
		else if ( $.isPlainObject( selector ) ) {
			opts = selector;
			selector = '';
		}
	
		opts = _selector_opts( opts );
	
		var inst = this.iterator( 'table', function ( settings ) {
			return __row_selector( settings, selector, opts );
		}, 1 );
	
		// Want argument shifting here and in __row_selector?
		inst.selector.rows = selector;
		inst.selector.opts = opts;
	
		return inst;
	} );
	
	_api_register( 'rows().nodes()', function () {
		return this.iterator( 'row', function ( settings, row ) {
			return settings.aoData[ row ].nTr || undefined;
		}, 1 );
	} );
	
	_api_register( 'rows().data()', function () {
		return this.iterator( true, 'rows', function ( settings, rows ) {
			return _pluck_order( settings.aoData, rows, '_aData' );
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().cache()', 'row().cache()', function ( type ) {
		return this.iterator( 'row', function ( settings, row ) {
			var r = settings.aoData[ row ];
			return type === 'search' ? r._aFilterData : r._aSortData;
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().invalidate()', 'row().invalidate()', function ( src ) {
		return this.iterator( 'row', function ( settings, row ) {
			_fnInvalidate( settings, row, src );
		} );
	} );
	
	_api_registerPlural( 'rows().indexes()', 'row().index()', function () {
		return this.iterator( 'row', function ( settings, row ) {
			return row;
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().ids()', 'row().id()', function ( hash ) {
		var a = [];
		var context = this.context;
	
		// `iterator` will drop undefined values, but in this case we want them
		for ( var i=0, ien=context.length ; i<ien ; i++ ) {
			for ( var j=0, jen=this[i].length ; j<jen ; j++ ) {
				var id = context[i].rowIdFn( context[i].aoData[ this[i][j] ]._aData );
				a.push( (hash === true ? '#' : '' )+ id );
			}
		}
	
		return new _Api( context, a );
	} );
	
	_api_registerPlural( 'rows().remove()', 'row().remove()', function () {
		var that = this;
	
		this.iterator( 'row', function ( settings, row, thatIdx ) {
			var data = settings.aoData;
			var rowData = data[ row ];
			var i, ien, j, jen;
			var loopRow, loopCells;
	
			data.splice( row, 1 );
	
			// Update the cached indexes
			for ( i=0, ien=data.length ; i<ien ; i++ ) {
				loopRow = data[i];
				loopCells = loopRow.anCells;
	
				// Rows
				if ( loopRow.nTr !== null ) {
					loopRow.nTr._DT_RowIndex = i;
				}
	
				// Cells
				if ( loopCells !== null ) {
					for ( j=0, jen=loopCells.length ; j<jen ; j++ ) {
						loopCells[j]._DT_CellIndex.row = i;
					}
				}
			}
	
			// Delete from the display arrays
			_fnDeleteIndex( settings.aiDisplayMaster, row );
			_fnDeleteIndex( settings.aiDisplay, row );
			_fnDeleteIndex( that[ thatIdx ], row, false ); // maintain local indexes
	
			// For server-side processing tables - subtract the deleted row from the count
			if ( settings._iRecordsDisplay > 0 ) {
				settings._iRecordsDisplay--;
			}
	
			// Check for an 'overflow' they case for displaying the table
			_fnLengthOverflow( settings );
	
			// Remove the row's ID reference if there is one
			var id = settings.rowIdFn( rowData._aData );
			if ( id !== undefined ) {
				delete settings.aIds[ id ];
			}
		} );
	
		this.iterator( 'table', function ( settings ) {
			for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
				settings.aoData[i].idx = i;
			}
		} );
	
		return this;
	} );
	
	
	_api_register( 'rows.add()', function ( rows ) {
		var newRows = this.iterator( 'table', function ( settings ) {
				var row, i, ien;
				var out = [];
	
				for ( i=0, ien=rows.length ; i<ien ; i++ ) {
					row = rows[i];
	
					if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
						out.push( _fnAddTr( settings, row )[0] );
					}
					else {
						out.push( _fnAddData( settings, row ) );
					}
				}
	
				return out;
			}, 1 );
	
		// Return an Api.rows() extended instance, so rows().nodes() etc can be used
		var modRows = this.rows( -1 );
		modRows.pop();
		$.merge( modRows, newRows );
	
		return modRows;
	} );
	
	
	
	
	
	/**
	 *
	 */
	_api_register( 'row()', function ( selector, opts ) {
		return _selector_first( this.rows( selector, opts ) );
	} );
	
	
	_api_register( 'row().data()', function ( data ) {
		var ctx = this.context;
	
		if ( data === undefined ) {
			// Get
			return ctx.length && this.length ?
				ctx[0].aoData[ this[0] ]._aData :
				undefined;
		}
	
		// Set
		var row = ctx[0].aoData[ this[0] ];
		row._aData = data;
	
		// If the DOM has an id, and the data source is an array
		if ( $.isArray( data ) && row.nTr.id ) {
			_fnSetObjectDataFn( ctx[0].rowId )( data, row.nTr.id );
		}
	
		// Automatically invalidate
		_fnInvalidate( ctx[0], this[0], 'data' );
	
		return this;
	} );
	
	
	_api_register( 'row().node()', function () {
		var ctx = this.context;
	
		return ctx.length && this.length ?
			ctx[0].aoData[ this[0] ].nTr || null :
			null;
	} );
	
	
	_api_register( 'row.add()', function ( row ) {
		// Allow a jQuery object to be passed in - only a single row is added from
		// it though - the first element in the set
		if ( row instanceof $ && row.length ) {
			row = row[0];
		}
	
		var rows = this.iterator( 'table', function ( settings ) {
			if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
				return _fnAddTr( settings, row )[0];
			}
			return _fnAddData( settings, row );
		} );
	
		// Return an Api.rows() extended instance, with the newly added row selected
		return this.row( rows[0] );
	} );
	
	
	
	var __details_add = function ( ctx, row, data, klass )
	{
		// Convert to array of TR elements
		var rows = [];
		var addRow = function ( r, k ) {
			// Recursion to allow for arrays of jQuery objects
			if ( $.isArray( r ) || r instanceof $ ) {
				for ( var i=0, ien=r.length ; i<ien ; i++ ) {
					addRow( r[i], k );
				}
				return;
			}
	
			// If we get a TR element, then just add it directly - up to the dev
			// to add the correct number of columns etc
			if ( r.nodeName && r.nodeName.toLowerCase() === 'tr' ) {
				rows.push( r );
			}
			else {
				// Otherwise create a row with a wrapper
				var created = $('<tr><td/></tr>').addClass( k );
				$('td', created)
					.addClass( k )
					.html( r )
					[0].colSpan = _fnVisbleColumns( ctx );
	
				rows.push( created[0] );
			}
		};
	
		addRow( data, klass );
	
		if ( row._details ) {
			row._details.detach();
		}
	
		row._details = $(rows);
	
		// If the children were already shown, that state should be retained
		if ( row._detailsShow ) {
			row._details.insertAfter( row.nTr );
		}
	};
	
	
	var __details_remove = function ( api, idx )
	{
		var ctx = api.context;
	
		if ( ctx.length ) {
			var row = ctx[0].aoData[ idx !== undefined ? idx : api[0] ];
	
			if ( row && row._details ) {
				row._details.remove();
	
				row._detailsShow = undefined;
				row._details = undefined;
			}
		}
	};
	
	
	var __details_display = function ( api, show ) {
		var ctx = api.context;
	
		if ( ctx.length && api.length ) {
			var row = ctx[0].aoData[ api[0] ];
	
			if ( row._details ) {
				row._detailsShow = show;
	
				if ( show ) {
					row._details.insertAfter( row.nTr );
				}
				else {
					row._details.detach();
				}
	
				__details_events( ctx[0] );
			}
		}
	};
	
	
	var __details_events = function ( settings )
	{
		var api = new _Api( settings );
		var namespace = '.dt.DT_details';
		var drawEvent = 'draw'+namespace;
		var colvisEvent = 'column-visibility'+namespace;
		var destroyEvent = 'destroy'+namespace;
		var data = settings.aoData;
	
		api.off( drawEvent +' '+ colvisEvent +' '+ destroyEvent );
	
		if ( _pluck( data, '_details' ).length > 0 ) {
			// On each draw, insert the required elements into the document
			api.on( drawEvent, function ( e, ctx ) {
				if ( settings !== ctx ) {
					return;
				}
	
				api.rows( {page:'current'} ).eq(0).each( function (idx) {
					// Internal data grab
					var row = data[ idx ];
	
					if ( row._detailsShow ) {
						row._details.insertAfter( row.nTr );
					}
				} );
			} );
	
			// Column visibility change - update the colspan
			api.on( colvisEvent, function ( e, ctx, idx, vis ) {
				if ( settings !== ctx ) {
					return;
				}
	
				// Update the colspan for the details rows (note, only if it already has
				// a colspan)
				var row, visible = _fnVisbleColumns( ctx );
	
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					row = data[i];
	
					if ( row._details ) {
						row._details.children('td[colspan]').attr('colspan', visible );
					}
				}
			} );
	
			// Table destroyed - nuke any child rows
			api.on( destroyEvent, function ( e, ctx ) {
				if ( settings !== ctx ) {
					return;
				}
	
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					if ( data[i]._details ) {
						__details_remove( api, i );
					}
				}
			} );
		}
	};
	
	// Strings for the method names to help minification
	var _emp = '';
	var _child_obj = _emp+'row().child';
	var _child_mth = _child_obj+'()';
	
	// data can be:
	//  tr
	//  string
	//  jQuery or array of any of the above
	_api_register( _child_mth, function ( data, klass ) {
		var ctx = this.context;
	
		if ( data === undefined ) {
			// get
			return ctx.length && this.length ?
				ctx[0].aoData[ this[0] ]._details :
				undefined;
		}
		else if ( data === true ) {
			// show
			this.child.show();
		}
		else if ( data === false ) {
			// remove
			__details_remove( this );
		}
		else if ( ctx.length && this.length ) {
			// set
			__details_add( ctx[0], ctx[0].aoData[ this[0] ], data, klass );
		}
	
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.show()',
		_child_mth+'.show()' // only when `child()` was called with parameters (without
	], function ( show ) {   // it returns an object and this method is not executed)
		__details_display( this, true );
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.hide()',
		_child_mth+'.hide()' // only when `child()` was called with parameters (without
	], function () {         // it returns an object and this method is not executed)
		__details_display( this, false );
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.remove()',
		_child_mth+'.remove()' // only when `child()` was called with parameters (without
	], function () {           // it returns an object and this method is not executed)
		__details_remove( this );
		return this;
	} );
	
	
	_api_register( _child_obj+'.isShown()', function () {
		var ctx = this.context;
	
		if ( ctx.length && this.length ) {
			// _detailsShown as false or undefined will fall through to return false
			return ctx[0].aoData[ this[0] ]._detailsShow || false;
		}
		return false;
	} );
	
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Columns
	 *
	 * {integer}           - column index (>=0 count from left, <0 count from right)
	 * "{integer}:visIdx"  - visible column index (i.e. translate to column index)  (>=0 count from left, <0 count from right)
	 * "{integer}:visible" - alias for {integer}:visIdx  (>=0 count from left, <0 count from right)
	 * "{string}:name"     - column name
	 * "{string}"          - jQuery selector on column header nodes
	 *
	 */
	
	// can be an array of these items, comma separated list, or an array of comma
	// separated lists
	
	var __re_column_selector = /^([^:]+):(name|visIdx|visible)$/;
	
	
	// r1 and r2 are redundant - but it means that the parameters match for the
	// iterator callback in columns().data()
	var __columnData = function ( settings, column, r1, r2, rows ) {
		var a = [];
		for ( var row=0, ien=rows.length ; row<ien ; row++ ) {
			a.push( _fnGetCellData( settings, rows[row], column ) );
		}
		return a;
	};
	
	
	var __column_selector = function ( settings, selector, opts )
	{
		var
			columns = settings.aoColumns,
			names = _pluck( columns, 'sName' ),
			nodes = _pluck( columns, 'nTh' );
	
		var run = function ( s ) {
			var selInt = _intVal( s );
	
			// Selector - all
			if ( s === '' ) {
				return _range( columns.length );
			}
	
			// Selector - index
			if ( selInt !== null ) {
				return [ selInt >= 0 ?
					selInt : // Count from left
					columns.length + selInt // Count from right (+ because its a negative value)
				];
			}
	
			// Selector = function
			if ( typeof s === 'function' ) {
				var rows = _selector_row_indexes( settings, opts );
	
				return $.map( columns, function (col, idx) {
					return s(
							idx,
							__columnData( settings, idx, 0, 0, rows ),
							nodes[ idx ]
						) ? idx : null;
				} );
			}
	
			// jQuery or string selector
			var match = typeof s === 'string' ?
				s.match( __re_column_selector ) :
				'';
	
			if ( match ) {
				switch( match[2] ) {
					case 'visIdx':
					case 'visible':
						var idx = parseInt( match[1], 10 );
						// Visible index given, convert to column index
						if ( idx < 0 ) {
							// Counting from the right
							var visColumns = $.map( columns, function (col,i) {
								return col.bVisible ? i : null;
							} );
							return [ visColumns[ visColumns.length + idx ] ];
						}
						// Counting from the left
						return [ _fnVisibleToColumnIndex( settings, idx ) ];
	
					case 'name':
						// match by name. `names` is column index complete and in order
						return $.map( names, function (name, i) {
							return name === match[1] ? i : null;
						} );
	
					default:
						return [];
				}
			}
	
			// Cell in the table body
			if ( s.nodeName && s._DT_CellIndex ) {
				return [ s._DT_CellIndex.column ];
			}
	
			// jQuery selector on the TH elements for the columns
			var jqResult = $( nodes )
				.filter( s )
				.map( function () {
					return $.inArray( this, nodes ); // `nodes` is column index complete and in order
				} )
				.toArray();
	
			if ( jqResult.length || ! s.nodeName ) {
				return jqResult;
			}
	
			// Otherwise a node which might have a `dt-column` data attribute, or be
			// a child or such an element
			var host = $(s).closest('*[data-dt-column]');
			return host.length ?
				[ host.data('dt-column') ] :
				[];
		};
	
		return _selector_run( 'column', selector, run, settings, opts );
	};
	
	
	var __setColumnVis = function ( settings, column, vis ) {
		var
			cols = settings.aoColumns,
			col  = cols[ column ],
			data = settings.aoData,
			row, cells, i, ien, tr;
	
		// Get
		if ( vis === undefined ) {
			return col.bVisible;
		}
	
		// Set
		// No change
		if ( col.bVisible === vis ) {
			return;
		}
	
		if ( vis ) {
			// Insert column
			// Need to decide if we should use appendChild or insertBefore
			var insertBefore = $.inArray( true, _pluck(cols, 'bVisible'), column+1 );
	
			for ( i=0, ien=data.length ; i<ien ; i++ ) {
				tr = data[i].nTr;
				cells = data[i].anCells;
	
				if ( tr ) {
					// insertBefore can act like appendChild if 2nd arg is null
					tr.insertBefore( cells[ column ], cells[ insertBefore ] || null );
				}
			}
		}
		else {
			// Remove column
			$( _pluck( settings.aoData, 'anCells', column ) ).detach();
		}
	
		// Common actions
		col.bVisible = vis;
	};
	
	
	_api_register( 'columns()', function ( selector, opts ) {
		// argument shifting
		if ( selector === undefined ) {
			selector = '';
		}
		else if ( $.isPlainObject( selector ) ) {
			opts = selector;
			selector = '';
		}
	
		opts = _selector_opts( opts );
	
		var inst = this.iterator( 'table', function ( settings ) {
			return __column_selector( settings, selector, opts );
		}, 1 );
	
		// Want argument shifting here and in _row_selector?
		inst.selector.cols = selector;
		inst.selector.opts = opts;
	
		return inst;
	} );
	
	_api_registerPlural( 'columns().header()', 'column().header()', function ( selector, opts ) {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].nTh;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().footer()', 'column().footer()', function ( selector, opts ) {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].nTf;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().data()', 'column().data()', function () {
		return this.iterator( 'column-rows', __columnData, 1 );
	} );
	
	_api_registerPlural( 'columns().dataSrc()', 'column().dataSrc()', function () {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].mData;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().cache()', 'column().cache()', function ( type ) {
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
			return _pluck_order( settings.aoData, rows,
				type === 'search' ? '_aFilterData' : '_aSortData', column
			);
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().nodes()', 'column().nodes()', function () {
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
			return _pluck_order( settings.aoData, rows, 'anCells', column ) ;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().visible()', 'column().visible()', function ( vis, calc ) {
		var that = this;
		var ret = this.iterator( 'column', function ( settings, column ) {
			if ( vis === undefined ) {
				return settings.aoColumns[ column ].bVisible;
			} // else
			__setColumnVis( settings, column, vis );
		} );
	
		// Group the column visibility changes
		if ( vis !== undefined ) {
			this.iterator( 'table', function ( settings ) {
				// Redraw the header after changes
				_fnDrawHead( settings, settings.aoHeader );
				_fnDrawHead( settings, settings.aoFooter );
		
				// Update colspan for no records display. Child rows and extensions will use their own
				// listeners to do this - only need to update the empty table item here
				if ( ! settings.aiDisplay.length ) {
					$(settings.nTBody).find('td[colspan]').attr('colspan', _fnVisbleColumns(settings));
				}
		
				_fnSaveState( settings );
	
				// Second loop once the first is done for events
				that.iterator( 'column', function ( settings, column ) {
					_fnCallbackFire( settings, null, 'column-visibility', [settings, column, vis, calc] );
				} );
	
				if ( calc === undefined || calc ) {
					that.columns.adjust();
				}
			});
		}
	
		return ret;
	} );
	
	_api_registerPlural( 'columns().indexes()', 'column().index()', function ( type ) {
		return this.iterator( 'column', function ( settings, column ) {
			return type === 'visible' ?
				_fnColumnIndexToVisible( settings, column ) :
				column;
		}, 1 );
	} );
	
	_api_register( 'columns.adjust()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnAdjustColumnSizing( settings );
		}, 1 );
	} );
	
	_api_register( 'column.index()', function ( type, idx ) {
		if ( this.context.length !== 0 ) {
			var ctx = this.context[0];
	
			if ( type === 'fromVisible' || type === 'toData' ) {
				return _fnVisibleToColumnIndex( ctx, idx );
			}
			else if ( type === 'fromData' || type === 'toVisible' ) {
				return _fnColumnIndexToVisible( ctx, idx );
			}
		}
	} );
	
	_api_register( 'column()', function ( selector, opts ) {
		return _selector_first( this.columns( selector, opts ) );
	} );
	
	
	
	var __cell_selector = function ( settings, selector, opts )
	{
		var data = settings.aoData;
		var rows = _selector_row_indexes( settings, opts );
		var cells = _removeEmpty( _pluck_order( data, rows, 'anCells' ) );
		var allCells = $( [].concat.apply([], cells) );
		var row;
		var columns = settings.aoColumns.length;
		var a, i, ien, j, o, host;
	
		var run = function ( s ) {
			var fnSelector = typeof s === 'function';
	
			if ( s === null || s === undefined || fnSelector ) {
				// All cells and function selectors
				a = [];
	
				for ( i=0, ien=rows.length ; i<ien ; i++ ) {
					row = rows[i];
	
					for ( j=0 ; j<columns ; j++ ) {
						o = {
							row: row,
							column: j
						};
	
						if ( fnSelector ) {
							// Selector - function
							host = data[ row ];
	
							if ( s( o, _fnGetCellData(settings, row, j), host.anCells ? host.anCells[j] : null ) ) {
								a.push( o );
							}
						}
						else {
							// Selector - all
							a.push( o );
						}
					}
				}
	
				return a;
			}
			
			// Selector - index
			if ( $.isPlainObject( s ) ) {
				// Valid cell index and its in the array of selectable rows
				return s.column !== undefined && s.row !== undefined && $.inArray( s.row, rows ) !== -1 ?
					[s] :
					[];
			}
	
			// Selector - jQuery filtered cells
			var jqResult = allCells
				.filter( s )
				.map( function (i, el) {
					return { // use a new object, in case someone changes the values
						row:    el._DT_CellIndex.row,
						column: el._DT_CellIndex.column
	 				};
				} )
				.toArray();
	
			if ( jqResult.length || ! s.nodeName ) {
				return jqResult;
			}
	
			// Otherwise the selector is a node, and there is one last option - the
			// element might be a child of an element which has dt-row and dt-column
			// data attributes
			host = $(s).closest('*[data-dt-row]');
			return host.length ?
				[ {
					row: host.data('dt-row'),
					column: host.data('dt-column')
				} ] :
				[];
		};
	
		return _selector_run( 'cell', selector, run, settings, opts );
	};
	
	
	
	
	_api_register( 'cells()', function ( rowSelector, columnSelector, opts ) {
		// Argument shifting
		if ( $.isPlainObject( rowSelector ) ) {
			// Indexes
			if ( rowSelector.row === undefined ) {
				// Selector options in first parameter
				opts = rowSelector;
				rowSelector = null;
			}
			else {
				// Cell index objects in first parameter
				opts = columnSelector;
				columnSelector = null;
			}
		}
		if ( $.isPlainObject( columnSelector ) ) {
			opts = columnSelector;
			columnSelector = null;
		}
	
		// Cell selector
		if ( columnSelector === null || columnSelector === undefined ) {
			return this.iterator( 'table', function ( settings ) {
				return __cell_selector( settings, rowSelector, _selector_opts( opts ) );
			} );
		}
	
		// The default built in options need to apply to row and columns
		var internalOpts = opts ? {
			page: opts.page,
			order: opts.order,
			search: opts.search
		} : {};
	
		// Row + column selector
		var columns = this.columns( columnSelector, internalOpts );
		var rows = this.rows( rowSelector, internalOpts );
		var i, ien, j, jen;
	
		var cellsNoOpts = this.iterator( 'table', function ( settings, idx ) {
			var a = [];
	
			for ( i=0, ien=rows[idx].length ; i<ien ; i++ ) {
				for ( j=0, jen=columns[idx].length ; j<jen ; j++ ) {
					a.push( {
						row:    rows[idx][i],
						column: columns[idx][j]
					} );
				}
			}
	
			return a;
		}, 1 );
	
		// There is currently only one extension which uses a cell selector extension
		// It is a _major_ performance drag to run this if it isn't needed, so this is
		// an extension specific check at the moment
		var cells = opts && opts.selected ?
			this.cells( cellsNoOpts, opts ) :
			cellsNoOpts;
	
		$.extend( cells.selector, {
			cols: columnSelector,
			rows: rowSelector,
			opts: opts
		} );
	
		return cells;
	} );
	
	
	_api_registerPlural( 'cells().nodes()', 'cell().node()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			var data = settings.aoData[ row ];
	
			return data && data.anCells ?
				data.anCells[ column ] :
				undefined;
		}, 1 );
	} );
	
	
	_api_register( 'cells().data()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return _fnGetCellData( settings, row, column );
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().cache()', 'cell().cache()', function ( type ) {
		type = type === 'search' ? '_aFilterData' : '_aSortData';
	
		return this.iterator( 'cell', function ( settings, row, column ) {
			return settings.aoData[ row ][ type ][ column ];
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().render()', 'cell().render()', function ( type ) {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return _fnGetCellData( settings, row, column, type );
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().indexes()', 'cell().index()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return {
				row: row,
				column: column,
				columnVisible: _fnColumnIndexToVisible( settings, column )
			};
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().invalidate()', 'cell().invalidate()', function ( src ) {
		return this.iterator( 'cell', function ( settings, row, column ) {
			_fnInvalidate( settings, row, src, column );
		} );
	} );
	
	
	
	_api_register( 'cell()', function ( rowSelector, columnSelector, opts ) {
		return _selector_first( this.cells( rowSelector, columnSelector, opts ) );
	} );
	
	
	_api_register( 'cell().data()', function ( data ) {
		var ctx = this.context;
		var cell = this[0];
	
		if ( data === undefined ) {
			// Get
			return ctx.length && cell.length ?
				_fnGetCellData( ctx[0], cell[0].row, cell[0].column ) :
				undefined;
		}
	
		// Set
		_fnSetCellData( ctx[0], cell[0].row, cell[0].column, data );
		_fnInvalidate( ctx[0], cell[0].row, 'data', cell[0].column );
	
		return this;
	} );
	
	
	
	/**
	 * Get current ordering (sorting) that has been applied to the table.
	 *
	 * @returns {array} 2D array containing the sorting information for the first
	 *   table in the current context. Each element in the parent array represents
	 *   a column being sorted upon (i.e. multi-sorting with two columns would have
	 *   2 inner arrays). The inner arrays may have 2 or 3 elements. The first is
	 *   the column index that the sorting condition applies to, the second is the
	 *   direction of the sort (`desc` or `asc`) and, optionally, the third is the
	 *   index of the sorting order from the `column.sorting` initialisation array.
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {integer} order Column index to sort upon.
	 * @param {string} direction Direction of the sort to be applied (`asc` or `desc`)
	 * @returns {DataTables.Api} this
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 1D array of sorting information to be applied.
	 * @param {array} [...] Optional additional sorting conditions
	 * @returns {DataTables.Api} this
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 2D array of sorting information to be applied.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'order()', function ( order, dir ) {
		var ctx = this.context;
	
		if ( order === undefined ) {
			// get
			return ctx.length !== 0 ?
				ctx[0].aaSorting :
				undefined;
		}
	
		// set
		if ( typeof order === 'number' ) {
			// Simple column / direction passed in
			order = [ [ order, dir ] ];
		}
		else if ( order.length && ! $.isArray( order[0] ) ) {
			// Arguments passed in (list of 1D arrays)
			order = Array.prototype.slice.call( arguments );
		}
		// otherwise a 2D array was passed in
	
		return this.iterator( 'table', function ( settings ) {
			settings.aaSorting = order.slice();
		} );
	} );
	
	
	/**
	 * Attach a sort listener to an element for a given column
	 *
	 * @param {node|jQuery|string} node Identifier for the element(s) to attach the
	 *   listener to. This can take the form of a single DOM node, a jQuery
	 *   collection of nodes or a jQuery selector which will identify the node(s).
	 * @param {integer} column the column that a click on this node will sort on
	 * @param {function} [callback] callback function when sort is run
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'order.listener()', function ( node, column, callback ) {
		return this.iterator( 'table', function ( settings ) {
			_fnSortAttachListener( settings, node, column, callback );
		} );
	} );
	
	
	_api_register( 'order.fixed()', function ( set ) {
		if ( ! set ) {
			var ctx = this.context;
			var fixed = ctx.length ?
				ctx[0].aaSortingFixed :
				undefined;
	
			return $.isArray( fixed ) ?
				{ pre: fixed } :
				fixed;
		}
	
		return this.iterator( 'table', function ( settings ) {
			settings.aaSortingFixed = $.extend( true, {}, set );
		} );
	} );
	
	
	// Order by the selected column(s)
	_api_register( [
		'columns().order()',
		'column().order()'
	], function ( dir ) {
		var that = this;
	
		return this.iterator( 'table', function ( settings, i ) {
			var sort = [];
	
			$.each( that[i], function (j, col) {
				sort.push( [ col, dir ] );
			} );
	
			settings.aaSorting = sort;
		} );
	} );
	
	
	
	_api_register( 'search()', function ( input, regex, smart, caseInsen ) {
		var ctx = this.context;
	
		if ( input === undefined ) {
			// get
			return ctx.length !== 0 ?
				ctx[0].oPreviousSearch.sSearch :
				undefined;
		}
	
		// set
		return this.iterator( 'table', function ( settings ) {
			if ( ! settings.oFeatures.bFilter ) {
				return;
			}
	
			_fnFilterComplete( settings, $.extend( {}, settings.oPreviousSearch, {
				"sSearch": input+"",
				"bRegex":  regex === null ? false : regex,
				"bSmart":  smart === null ? true  : smart,
				"bCaseInsensitive": caseInsen === null ? true : caseInsen
			} ), 1 );
		} );
	} );
	
	
	_api_registerPlural(
		'columns().search()',
		'column().search()',
		function ( input, regex, smart, caseInsen ) {
			return this.iterator( 'column', function ( settings, column ) {
				var preSearch = settings.aoPreSearchCols;
	
				if ( input === undefined ) {
					// get
					return preSearch[ column ].sSearch;
				}
	
				// set
				if ( ! settings.oFeatures.bFilter ) {
					return;
				}
	
				$.extend( preSearch[ column ], {
					"sSearch": input+"",
					"bRegex":  regex === null ? false : regex,
					"bSmart":  smart === null ? true  : smart,
					"bCaseInsensitive": caseInsen === null ? true : caseInsen
				} );
	
				_fnFilterComplete( settings, settings.oPreviousSearch, 1 );
			} );
		}
	);
	
	/*
	 * State API methods
	 */
	
	_api_register( 'state()', function () {
		return this.context.length ?
			this.context[0].oSavedState :
			null;
	} );
	
	
	_api_register( 'state.clear()', function () {
		return this.iterator( 'table', function ( settings ) {
			// Save an empty object
			settings.fnStateSaveCallback.call( settings.oInstance, settings, {} );
		} );
	} );
	
	
	_api_register( 'state.loaded()', function () {
		return this.context.length ?
			this.context[0].oLoadedState :
			null;
	} );
	
	
	_api_register( 'state.save()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnSaveState( settings );
		} );
	} );
	
	
	
	/**
	 * Provide a common method for plug-ins to check the version of DataTables being
	 * used, in order to ensure compatibility.
	 *
	 *  @param {string} version Version string to check for, in the format "X.Y.Z".
	 *    Note that the formats "X" and "X.Y" are also acceptable.
	 *  @returns {boolean} true if this version of DataTables is greater or equal to
	 *    the required version, or false if this version of DataTales is not
	 *    suitable
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    alert( $.fn.dataTable.versionCheck( '1.9.0' ) );
	 */
	DataTable.versionCheck = DataTable.fnVersionCheck = function( version )
	{
		var aThis = DataTable.version.split('.');
		var aThat = version.split('.');
		var iThis, iThat;
	
		for ( var i=0, iLen=aThat.length ; i<iLen ; i++ ) {
			iThis = parseInt( aThis[i], 10 ) || 0;
			iThat = parseInt( aThat[i], 10 ) || 0;
	
			// Parts are the same, keep comparing
			if (iThis === iThat) {
				continue;
			}
	
			// Parts are different, return immediately
			return iThis > iThat;
		}
	
		return true;
	};
	
	
	/**
	 * Check if a `<table>` node is a DataTable table already or not.
	 *
	 *  @param {node|jquery|string} table Table node, jQuery object or jQuery
	 *      selector for the table to test. Note that if more than more than one
	 *      table is passed on, only the first will be checked
	 *  @returns {boolean} true the table given is a DataTable, or false otherwise
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    if ( ! $.fn.DataTable.isDataTable( '#example' ) ) {
	 *      $('#example').dataTable();
	 *    }
	 */
	DataTable.isDataTable = DataTable.fnIsDataTable = function ( table )
	{
		var t = $(table).get(0);
		var is = false;
	
		if ( table instanceof DataTable.Api ) {
			return true;
		}
	
		$.each( DataTable.settings, function (i, o) {
			var head = o.nScrollHead ? $('table', o.nScrollHead)[0] : null;
			var foot = o.nScrollFoot ? $('table', o.nScrollFoot)[0] : null;
	
			if ( o.nTable === t || head === t || foot === t ) {
				is = true;
			}
		} );
	
		return is;
	};
	
	
	/**
	 * Get all DataTable tables that have been initialised - optionally you can
	 * select to get only currently visible tables.
	 *
	 *  @param {boolean} [visible=false] Flag to indicate if you want all (default)
	 *    or visible tables only.
	 *  @returns {array} Array of `table` nodes (not DataTable instances) which are
	 *    DataTables
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    $.each( $.fn.dataTable.tables(true), function () {
	 *      $(table).DataTable().columns.adjust();
	 *    } );
	 */
	DataTable.tables = DataTable.fnTables = function ( visible )
	{
		var api = false;
	
		if ( $.isPlainObject( visible ) ) {
			api = visible.api;
			visible = visible.visible;
		}
	
		var a = $.map( DataTable.settings, function (o) {
			if ( !visible || (visible && $(o.nTable).is(':visible')) ) {
				return o.nTable;
			}
		} );
	
		return api ?
			new _Api( a ) :
			a;
	};
	
	
	/**
	 * Convert from camel case parameters to Hungarian notation. This is made public
	 * for the extensions to provide the same ability as DataTables core to accept
	 * either the 1.9 style Hungarian notation, or the 1.10+ style camelCase
	 * parameters.
	 *
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 */
	DataTable.camelToHungarian = _fnCamelToHungarian;
	
	
	
	/**
	 *
	 */
	_api_register( '$()', function ( selector, opts ) {
		var
			rows   = this.rows( opts ).nodes(), // Get all rows
			jqRows = $(rows);
	
		return $( [].concat(
			jqRows.filter( selector ).toArray(),
			jqRows.find( selector ).toArray()
		) );
	} );
	
	
	// jQuery functions to operate on the tables
	$.each( [ 'on', 'one', 'off' ], function (i, key) {
		_api_register( key+'()', function ( /* event, handler */ ) {
			var args = Array.prototype.slice.call(arguments);
	
			// Add the `dt` namespace automatically if it isn't already present
			args[0] = $.map( args[0].split( /\s/ ), function ( e ) {
				return ! e.match(/\.dt\b/) ?
					e+'.dt' :
					e;
				} ).join( ' ' );
	
			var inst = $( this.tables().nodes() );
			inst[key].apply( inst, args );
			return this;
		} );
	} );
	
	
	_api_register( 'clear()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnClearTable( settings );
		} );
	} );
	
	
	_api_register( 'settings()', function () {
		return new _Api( this.context, this.context );
	} );
	
	
	_api_register( 'init()', function () {
		var ctx = this.context;
		return ctx.length ? ctx[0].oInit : null;
	} );
	
	
	_api_register( 'data()', function () {
		return this.iterator( 'table', function ( settings ) {
			return _pluck( settings.aoData, '_aData' );
		} ).flatten();
	} );
	
	
	_api_register( 'destroy()', function ( remove ) {
		remove = remove || false;
	
		return this.iterator( 'table', function ( settings ) {
			var orig      = settings.nTableWrapper.parentNode;
			var classes   = settings.oClasses;
			var table     = settings.nTable;
			var tbody     = settings.nTBody;
			var thead     = settings.nTHead;
			var tfoot     = settings.nTFoot;
			var jqTable   = $(table);
			var jqTbody   = $(tbody);
			var jqWrapper = $(settings.nTableWrapper);
			var rows      = $.map( settings.aoData, function (r) { return r.nTr; } );
			var i, ien;
	
			// Flag to note that the table is currently being destroyed - no action
			// should be taken
			settings.bDestroying = true;
	
			// Fire off the destroy callbacks for plug-ins etc
			_fnCallbackFire( settings, "aoDestroyCallback", "destroy", [settings] );
	
			// If not being removed from the document, make all columns visible
			if ( ! remove ) {
				new _Api( settings ).columns().visible( true );
			}
	
			// Blitz all `DT` namespaced events (these are internal events, the
			// lowercase, `dt` events are user subscribed and they are responsible
			// for removing them
			jqWrapper.off('.DT').find(':not(tbody *)').off('.DT');
			$(window).off('.DT-'+settings.sInstance);
	
			// When scrolling we had to break the table up - restore it
			if ( table != thead.parentNode ) {
				jqTable.children('thead').detach();
				jqTable.append( thead );
			}
	
			if ( tfoot && table != tfoot.parentNode ) {
				jqTable.children('tfoot').detach();
				jqTable.append( tfoot );
			}
	
			settings.aaSorting = [];
			settings.aaSortingFixed = [];
			_fnSortingClasses( settings );
	
			$( rows ).removeClass( settings.asStripeClasses.join(' ') );
	
			$('th, td', thead).removeClass( classes.sSortable+' '+
				classes.sSortableAsc+' '+classes.sSortableDesc+' '+classes.sSortableNone
			);
	
			// Add the TR elements back into the table in their original order
			jqTbody.children().detach();
			jqTbody.append( rows );
	
			// Remove the DataTables generated nodes, events and classes
			var removedMethod = remove ? 'remove' : 'detach';
			jqTable[ removedMethod ]();
			jqWrapper[ removedMethod ]();
	
			// If we need to reattach the table to the document
			if ( ! remove && orig ) {
				// insertBefore acts like appendChild if !arg[1]
				orig.insertBefore( table, settings.nTableReinsertBefore );
	
				// Restore the width of the original table - was read from the style property,
				// so we can restore directly to that
				jqTable
					.css( 'width', settings.sDestroyWidth )
					.removeClass( classes.sTable );
	
				// If the were originally stripe classes - then we add them back here.
				// Note this is not fool proof (for example if not all rows had stripe
				// classes - but it's a good effort without getting carried away
				ien = settings.asDestroyStripes.length;
	
				if ( ien ) {
					jqTbody.children().each( function (i) {
						$(this).addClass( settings.asDestroyStripes[i % ien] );
					} );
				}
			}
	
			/* Remove the settings object from the settings array */
			var idx = $.inArray( settings, DataTable.settings );
			if ( idx !== -1 ) {
				DataTable.settings.splice( idx, 1 );
			}
		} );
	} );
	
	
	// Add the `every()` method for rows, columns and cells in a compact form
	$.each( [ 'column', 'row', 'cell' ], function ( i, type ) {
		_api_register( type+'s().every()', function ( fn ) {
			var opts = this.selector.opts;
			var api = this;
	
			return this.iterator( type, function ( settings, arg1, arg2, arg3, arg4 ) {
				// Rows and columns:
				//  arg1 - index
				//  arg2 - table counter
				//  arg3 - loop counter
				//  arg4 - undefined
				// Cells:
				//  arg1 - row index
				//  arg2 - column index
				//  arg3 - table counter
				//  arg4 - loop counter
				fn.call(
					api[ type ](
						arg1,
						type==='cell' ? arg2 : opts,
						type==='cell' ? opts : undefined
					),
					arg1, arg2, arg3, arg4
				);
			} );
		} );
	} );
	
	
	// i18n method for extensions to be able to use the language object from the
	// DataTable
	_api_register( 'i18n()', function ( token, def, plural ) {
		var ctx = this.context[0];
		var resolved = _fnGetObjectDataFn( token )( ctx.oLanguage );
	
		if ( resolved === undefined ) {
			resolved = def;
		}
	
		if ( plural !== undefined && $.isPlainObject( resolved ) ) {
			resolved = resolved[ plural ] !== undefined ?
				resolved[ plural ] :
				resolved._;
		}
	
		return resolved.replace( '%d', plural ); // nb: plural might be undefined,
	} );
	/**
	 * Version string for plug-ins to check compatibility. Allowed format is
	 * `a.b.c-d` where: a:int, b:int, c:int, d:string(dev|beta|alpha). `d` is used
	 * only for non-release builds. See http://semver.org/ for more information.
	 *  @member
	 *  @type string
	 *  @default Version number
	 */
	DataTable.version = "1.10.20";

	/**
	 * Private data store, containing all of the settings objects that are
	 * created for the tables on a given page.
	 *
	 * Note that the `DataTable.settings` object is aliased to
	 * `jQuery.fn.dataTableExt` through which it may be accessed and
	 * manipulated, or `jQuery.fn.dataTable.settings`.
	 *  @member
	 *  @type array
	 *  @default []
	 *  @private
	 */
	DataTable.settings = [];

	/**
	 * Object models container, for the various models that DataTables has
	 * available to it. These models define the objects that are used to hold
	 * the active state and configuration of the table.
	 *  @namespace
	 */
	DataTable.models = {};
	
	
	
	/**
	 * Template object for the way in which DataTables holds information about
	 * search information for the global filter and individual column filters.
	 *  @namespace
	 */
	DataTable.models.oSearch = {
		/**
		 * Flag to indicate if the filtering should be case insensitive or not
		 *  @type boolean
		 *  @default true
		 */
		"bCaseInsensitive": true,
	
		/**
		 * Applied search term
		 *  @type string
		 *  @default <i>Empty string</i>
		 */
		"sSearch": "",
	
		/**
		 * Flag to indicate if the search term should be interpreted as a
		 * regular expression (true) or not (false) and therefore and special
		 * regex characters escaped.
		 *  @type boolean
		 *  @default false
		 */
		"bRegex": false,
	
		/**
		 * Flag to indicate if DataTables is to use its smart filtering or not.
		 *  @type boolean
		 *  @default true
		 */
		"bSmart": true
	};
	
	
	
	
	/**
	 * Template object for the way in which DataTables holds information about
	 * each individual row. This is the object format used for the settings
	 * aoData array.
	 *  @namespace
	 */
	DataTable.models.oRow = {
		/**
		 * TR element for the row
		 *  @type node
		 *  @default null
		 */
		"nTr": null,
	
		/**
		 * Array of TD elements for each row. This is null until the row has been
		 * created.
		 *  @type array nodes
		 *  @default []
		 */
		"anCells": null,
	
		/**
		 * Data object from the original data source for the row. This is either
		 * an array if using the traditional form of DataTables, or an object if
		 * using mData options. The exact type will depend on the passed in
		 * data from the data source, or will be an array if using DOM a data
		 * source.
		 *  @type array|object
		 *  @default []
		 */
		"_aData": [],
	
		/**
		 * Sorting data cache - this array is ostensibly the same length as the
		 * number of columns (although each index is generated only as it is
		 * needed), and holds the data that is used for sorting each column in the
		 * row. We do this cache generation at the start of the sort in order that
		 * the formatting of the sort data need be done only once for each cell
		 * per sort. This array should not be read from or written to by anything
		 * other than the master sorting methods.
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_aSortData": null,
	
		/**
		 * Per cell filtering data cache. As per the sort data cache, used to
		 * increase the performance of the filtering in DataTables
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_aFilterData": null,
	
		/**
		 * Filtering data cache. This is the same as the cell filtering cache, but
		 * in this case a string rather than an array. This is easily computed with
		 * a join on `_aFilterData`, but is provided as a cache so the join isn't
		 * needed on every search (memory traded for performance)
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_sFilterRow": null,
	
		/**
		 * Cache of the class name that DataTables has applied to the row, so we
		 * can quickly look at this variable rather than needing to do a DOM check
		 * on className for the nTr property.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *  @private
		 */
		"_sRowStripe": "",
	
		/**
		 * Denote if the original data source was from the DOM, or the data source
		 * object. This is used for invalidating data, so DataTables can
		 * automatically read data from the original source, unless uninstructed
		 * otherwise.
		 *  @type string
		 *  @default null
		 *  @private
		 */
		"src": null,
	
		/**
		 * Index in the aoData array. This saves an indexOf lookup when we have the
		 * object, but want to know the index
		 *  @type integer
		 *  @default -1
		 *  @private
		 */
		"idx": -1
	};
	
	
	/**
	 * Template object for the column information object in DataTables. This object
	 * is held in the settings aoColumns array and contains all the information that
	 * DataTables needs about each individual column.
	 *
	 * Note that this object is related to {@link DataTable.defaults.column}
	 * but this one is the internal data store for DataTables's cache of columns.
	 * It should NOT be manipulated outside of DataTables. Any configuration should
	 * be done through the initialisation options.
	 *  @namespace
	 */
	DataTable.models.oColumn = {
		/**
		 * Column index. This could be worked out on-the-fly with $.inArray, but it
		 * is faster to just hold it as a variable
		 *  @type integer
		 *  @default null
		 */
		"idx": null,
	
		/**
		 * A list of the columns that sorting should occur on when this column
		 * is sorted. That this property is an array allows multi-column sorting
		 * to be defined for a column (for example first name / last name columns
		 * would benefit from this). The values are integers pointing to the
		 * columns to be sorted on (typically it will be a single integer pointing
		 * at itself, but that doesn't need to be the case).
		 *  @type array
		 */
		"aDataSort": null,
	
		/**
		 * Define the sorting directions that are applied to the column, in sequence
		 * as the column is repeatedly sorted upon - i.e. the first value is used
		 * as the sorting direction when the column if first sorted (clicked on).
		 * Sort it again (click again) and it will move on to the next index.
		 * Repeat until loop.
		 *  @type array
		 */
		"asSorting": null,
	
		/**
		 * Flag to indicate if the column is searchable, and thus should be included
		 * in the filtering or not.
		 *  @type boolean
		 */
		"bSearchable": null,
	
		/**
		 * Flag to indicate if the column is sortable or not.
		 *  @type boolean
		 */
		"bSortable": null,
	
		/**
		 * Flag to indicate if the column is currently visible in the table or not
		 *  @type boolean
		 */
		"bVisible": null,
	
		/**
		 * Store for manual type assignment using the `column.type` option. This
		 * is held in store so we can manipulate the column's `sType` property.
		 *  @type string
		 *  @default null
		 *  @private
		 */
		"_sManualType": null,
	
		/**
		 * Flag to indicate if HTML5 data attributes should be used as the data
		 * source for filtering or sorting. True is either are.
		 *  @type boolean
		 *  @default false
		 *  @private
		 */
		"_bAttrSrc": false,
	
		/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} nTd The TD node that has been created
		 *  @param {*} sData The Data for the cell
		 *  @param {array|object} oData The data for the whole row
		 *  @param {int} iRow The row index for the aoData data store
		 *  @default null
		 */
		"fnCreatedCell": null,
	
		/**
		 * Function to get data from a cell in a column. You should <b>never</b>
		 * access data directly through _aData internally in DataTables - always use
		 * the method attached to this property. It allows mData to function as
		 * required. This function is automatically assigned by the column
		 * initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {string} sSpecific The specific data type you want to get -
		 *    'display', 'type' 'filter' 'sort'
		 *  @returns {*} The data for the cell from the given row's data
		 *  @default null
		 */
		"fnGetData": null,
	
		/**
		 * Function to set data for a cell in the column. You should <b>never</b>
		 * set the data directly to _aData internally in DataTables - always use
		 * this method. It allows mData to function as required. This function
		 * is automatically assigned by the column initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {*} sValue Value to set
		 *  @default null
		 */
		"fnSetData": null,
	
		/**
		 * Property to read the value for the cells in the column from the data
		 * source array / object. If null, then the default content is used, if a
		 * function is given then the return from the function is used.
		 *  @type function|int|string|null
		 *  @default null
		 */
		"mData": null,
	
		/**
		 * Partner property to mData which is used (only when defined) to get
		 * the data - i.e. it is basically the same as mData, but without the
		 * 'set' option, and also the data fed to it is the result from mData.
		 * This is the rendering method to match the data method of mData.
		 *  @type function|int|string|null
		 *  @default null
		 */
		"mRender": null,
	
		/**
		 * Unique header TH/TD element for this column - this is what the sorting
		 * listener is attached to (if sorting is enabled.)
		 *  @type node
		 *  @default null
		 */
		"nTh": null,
	
		/**
		 * Unique footer TH/TD element for this column (if there is one). Not used
		 * in DataTables as such, but can be used for plug-ins to reference the
		 * footer for each column.
		 *  @type node
		 *  @default null
		 */
		"nTf": null,
	
		/**
		 * The class to apply to all TD elements in the table's TBODY for the column
		 *  @type string
		 *  @default null
		 */
		"sClass": null,
	
		/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 *  @type string
		 */
		"sContentPadding": null,
	
		/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because mData
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 */
		"sDefaultContent": null,
	
		/**
		 * Name for the column, allowing reference to the column by name as well as
		 * by index (needs a lookup to work by name).
		 *  @type string
		 */
		"sName": null,
	
		/**
		 * Custom sorting data type - defines which of the available plug-ins in
		 * afnSortData the custom sorting will use - if any is defined.
		 *  @type string
		 *  @default std
		 */
		"sSortDataType": 'std',
	
		/**
		 * Class to be applied to the header element when sorting on this column
		 *  @type string
		 *  @default null
		 */
		"sSortingClass": null,
	
		/**
		 * Class to be applied to the header element when sorting on this column -
		 * when jQuery UI theming is used.
		 *  @type string
		 *  @default null
		 */
		"sSortingClassJUI": null,
	
		/**
		 * Title of the column - what is seen in the TH element (nTh).
		 *  @type string
		 */
		"sTitle": null,
	
		/**
		 * Column sorting and filtering type
		 *  @type string
		 *  @default null
		 */
		"sType": null,
	
		/**
		 * Width of the column
		 *  @type string
		 *  @default null
		 */
		"sWidth": null,
	
		/**
		 * Width of the column when it was first "encountered"
		 *  @type string
		 *  @default null
		 */
		"sWidthOrig": null
	};
	
	
	/*
	 * Developer note: The properties of the object below are given in Hungarian
	 * notation, that was used as the interface for DataTables prior to v1.10, however
	 * from v1.10 onwards the primary interface is camel case. In order to avoid
	 * breaking backwards compatibility utterly with this change, the Hungarian
	 * version is still, internally the primary interface, but is is not documented
	 * - hence the @name tags in each doc comment. This allows a Javascript function
	 * to create a map from Hungarian notation to camel case (going the other direction
	 * would require each property to be listed, which would at around 3K to the size
	 * of DataTables, while this method is about a 0.5K hit.
	 *
	 * Ultimately this does pave the way for Hungarian notation to be dropped
	 * completely, but that is a massive amount of work and will break current
	 * installs (therefore is on-hold until v2).
	 */
	
	/**
	 * Initialisation options that can be given to DataTables at initialisation
	 * time.
	 *  @namespace
	 */
	DataTable.defaults = {
		/**
		 * An array of data to use for the table, passed in at initialisation which
		 * will be used in preference to any data which is already in the DOM. This is
		 * particularly useful for constructing tables purely in Javascript, for
		 * example with a custom Ajax call.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.data
		 *
		 *  @example
		 *    // Using a 2D array data source
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          ['Trident', 'Internet Explorer 4.0', 'Win 95+', 4, 'X'],
		 *          ['Trident', 'Internet Explorer 5.0', 'Win 95+', 5, 'C'],
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine" },
		 *          { "title": "Browser" },
		 *          { "title": "Platform" },
		 *          { "title": "Version" },
		 *          { "title": "Grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using an array of objects as a data source (`data`)
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 4.0",
		 *            "platform": "Win 95+",
		 *            "version":  4,
		 *            "grade":    "X"
		 *          },
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 5.0",
		 *            "platform": "Win 95+",
		 *            "version":  5,
		 *            "grade":    "C"
		 *          }
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine",   "data": "engine" },
		 *          { "title": "Browser",  "data": "browser" },
		 *          { "title": "Platform", "data": "platform" },
		 *          { "title": "Version",  "data": "version" },
		 *          { "title": "Grade",    "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"aaData": null,
	
	
		/**
		 * If ordering is enabled, then DataTables will perform a first pass sort on
		 * initialisation. You can define which column(s) the sort is performed
		 * upon, and the sorting direction, with this variable. The `sorting` array
		 * should contain an array for each column to be sorted initially containing
		 * the column's index and a direction string ('asc' or 'desc').
		 *  @type array
		 *  @default [[0,'asc']]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.order
		 *
		 *  @example
		 *    // Sort by 3rd column first, and then 4th column
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": [[2,'asc'], [3,'desc']]
		 *      } );
		 *    } );
		 *
		 *    // No initial sorting
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": []
		 *      } );
		 *    } );
		 */
		"aaSorting": [[0,'asc']],
	
	
		/**
		 * This parameter is basically identical to the `sorting` parameter, but
		 * cannot be overridden by user interaction with the table. What this means
		 * is that you could have a column (visible or hidden) which the sorting
		 * will always be forced on first - any sorting after that (from the user)
		 * will then be performed as required. This can be useful for grouping rows
		 * together.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.orderFixed
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderFixed": [[0,'asc']]
		 *      } );
		 *    } )
		 */
		"aaSortingFixed": [],
	
	
		/**
		 * DataTables can be instructed to load data to display in the table from a
		 * Ajax source. This option defines how that Ajax call is made and where to.
		 *
		 * The `ajax` property has three different modes of operation, depending on
		 * how it is defined. These are:
		 *
		 * * `string` - Set the URL from where the data should be loaded from.
		 * * `object` - Define properties for `jQuery.ajax`.
		 * * `function` - Custom data get function
		 *
		 * `string`
		 * --------
		 *
		 * As a string, the `ajax` property simply defines the URL from which
		 * DataTables will load data.
		 *
		 * `object`
		 * --------
		 *
		 * As an object, the parameters in the object are passed to
		 * [jQuery.ajax](http://api.jquery.com/jQuery.ajax/) allowing fine control
		 * of the Ajax request. DataTables has a number of default parameters which
		 * you can override using this option. Please refer to the jQuery
		 * documentation for a full description of the options available, although
		 * the following parameters provide additional options in DataTables or
		 * require special consideration:
		 *
		 * * `data` - As with jQuery, `data` can be provided as an object, but it
		 *   can also be used as a function to manipulate the data DataTables sends
		 *   to the server. The function takes a single parameter, an object of
		 *   parameters with the values that DataTables has readied for sending. An
		 *   object may be returned which will be merged into the DataTables
		 *   defaults, or you can add the items to the object that was passed in and
		 *   not return anything from the function. This supersedes `fnServerParams`
		 *   from DataTables 1.9-.
		 *
		 * * `dataSrc` - By default DataTables will look for the property `data` (or
		 *   `aaData` for compatibility with DataTables 1.9-) when obtaining data
		 *   from an Ajax source or for server-side processing - this parameter
		 *   allows that property to be changed. You can use Javascript dotted
		 *   object notation to get a data source for multiple levels of nesting, or
		 *   it my be used as a function. As a function it takes a single parameter,
		 *   the JSON returned from the server, which can be manipulated as
		 *   required, with the returned value being that used by DataTables as the
		 *   data source for the table. This supersedes `sAjaxDataProp` from
		 *   DataTables 1.9-.
		 *
		 * * `success` - Should not be overridden it is used internally in
		 *   DataTables. To manipulate / transform the data returned by the server
		 *   use `ajax.dataSrc`, or use `ajax` as a function (see below).
		 *
		 * `function`
		 * ----------
		 *
		 * As a function, making the Ajax call is left up to yourself allowing
		 * complete control of the Ajax request. Indeed, if desired, a method other
		 * than Ajax could be used to obtain the required data, such as Web storage
		 * or an AIR database.
		 *
		 * The function is given four parameters and no return is required. The
		 * parameters are:
		 *
		 * 1. _object_ - Data to send to the server
		 * 2. _function_ - Callback function that must be executed when the required
		 *    data has been obtained. That data should be passed into the callback
		 *    as the only parameter
		 * 3. _object_ - DataTables settings object for the table
		 *
		 * Note that this supersedes `fnServerData` from DataTables 1.9-.
		 *
		 *  @type string|object|function
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.ajax
		 *  @since 1.10.0
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax.
		 *   // Note DataTables expects data in the form `{ data: [ ...data... ] }` by default).
		 *   $('#example').dataTable( {
		 *     "ajax": "data.json"
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to change
		 *   // `data` to `tableData` (i.e. `{ tableData: [ ...data... ] }`)
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": "tableData"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to read data
		 *   // from a plain array rather than an array in an object
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": ""
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Manipulate the data returned from the server - add a link to data
		 *   // (note this can, should, be done using `render` for the column - this
		 *   // is just a simple example of how the data can be manipulated).
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": function ( json ) {
		 *         for ( var i=0, ien=json.length ; i<ien ; i++ ) {
		 *           json[i][0] = '<a href="/message/'+json[i][0]+'>View message</a>';
		 *         }
		 *         return json;
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Add data to the request
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "data": function ( d ) {
		 *         return {
		 *           "extra_search": $('#extra').val()
		 *         };
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Send request as POST
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "type": "POST"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get the data from localStorage (could interface with a form for
		 *   // adding, editing and removing rows).
		 *   $('#example').dataTable( {
		 *     "ajax": function (data, callback, settings) {
		 *       callback(
		 *         JSON.parse( localStorage.getItem('dataTablesData') )
		 *       );
		 *     }
		 *   } );
		 */
		"ajax": null,
	
	
		/**
		 * This parameter allows you to readily specify the entries in the length drop
		 * down menu that DataTables shows when pagination is enabled. It can be
		 * either a 1D array of options which will be used for both the displayed
		 * option and the value, or a 2D array which will use the array in the first
		 * position as the value, and the array in the second position as the
		 * displayed options (useful for language strings such as 'All').
		 *
		 * Note that the `pageLength` property will be automatically set to the
		 * first value given in this array, unless `pageLength` is also provided.
		 *  @type array
		 *  @default [ 10, 25, 50, 100 ]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.lengthMenu
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
		 *      } );
		 *    } );
		 */
		"aLengthMenu": [ 10, 25, 50, 100 ],
	
	
		/**
		 * The `columns` option in the initialisation parameter allows you to define
		 * details about the way individual columns behave. For a full list of
		 * column options that can be set, please see
		 * {@link DataTable.defaults.column}. Note that if you use `columns` to
		 * define your columns, you must have an entry in the array for every single
		 * column that you have in your table (these can be null if you don't which
		 * to specify any options).
		 *  @member
		 *
		 *  @name DataTable.defaults.column
		 */
		"aoColumns": null,
	
		/**
		 * Very similar to `columns`, `columnDefs` allows you to target a specific
		 * column, multiple columns, or all columns, using the `targets` property of
		 * each object in the array. This allows great flexibility when creating
		 * tables, as the `columnDefs` arrays can be of any length, targeting the
		 * columns you specifically want. `columnDefs` may use any of the column
		 * options available: {@link DataTable.defaults.column}, but it _must_
		 * have `targets` defined in each object in the array. Values in the `targets`
		 * array may be:
		 *   <ul>
		 *     <li>a string - class name will be matched on the TH for the column</li>
		 *     <li>0 or a positive integer - column index counting from the left</li>
		 *     <li>a negative integer - column index counting from the right</li>
		 *     <li>the string "_all" - all columns (i.e. assign a default)</li>
		 *   </ul>
		 *  @member
		 *
		 *  @name DataTable.defaults.columnDefs
		 */
		"aoColumnDefs": null,
	
	
		/**
		 * Basically the same as `search`, this parameter defines the individual column
		 * filtering state at initialisation time. The array must be of the same size
		 * as the number of columns, and each element be an object with the parameters
		 * `search` and `escapeRegex` (the latter is optional). 'null' is also
		 * accepted and the default will be used.
		 *  @type array
		 *  @default []
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.searchCols
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchCols": [
		 *          null,
		 *          { "search": "My filter" },
		 *          null,
		 *          { "search": "^[0-9]", "escapeRegex": false }
		 *        ]
		 *      } );
		 *    } )
		 */
		"aoSearchCols": [],
	
	
		/**
		 * An array of CSS classes that should be applied to displayed rows. This
		 * array may be of any length, and DataTables will apply each class
		 * sequentially, looping when required.
		 *  @type array
		 *  @default null <i>Will take the values determined by the `oClasses.stripe*`
		 *    options</i>
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.stripeClasses
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stripeClasses": [ 'strip1', 'strip2', 'strip3' ]
		 *      } );
		 *    } )
		 */
		"asStripeClasses": null,
	
	
		/**
		 * Enable or disable automatic column width calculation. This can be disabled
		 * as an optimisation (it takes some time to calculate the widths) if the
		 * tables widths are passed in using `columns`.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.autoWidth
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "autoWidth": false
		 *      } );
		 *    } );
		 */
		"bAutoWidth": true,
	
	
		/**
		 * Deferred rendering can provide DataTables with a huge speed boost when you
		 * are using an Ajax or JS data source for the table. This option, when set to
		 * true, will cause DataTables to defer the creation of the table elements for
		 * each row until they are needed for a draw - saving a significant amount of
		 * time.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.deferRender
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajax": "sources/arrays.txt",
		 *        "deferRender": true
		 *      } );
		 *    } );
		 */
		"bDeferRender": false,
	
	
		/**
		 * Replace a DataTable which matches the given selector and replace it with
		 * one which has the properties of the new initialisation object passed. If no
		 * table matches the selector, then the new DataTable will be constructed as
		 * per normal.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.destroy
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "srollY": "200px",
		 *        "paginate": false
		 *      } );
		 *
		 *      // Some time later....
		 *      $('#example').dataTable( {
		 *        "filter": false,
		 *        "destroy": true
		 *      } );
		 *    } );
		 */
		"bDestroy": false,
	
	
		/**
		 * Enable or disable filtering of data. Filtering in DataTables is "smart" in
		 * that it allows the end user to input multiple words (space separated) and
		 * will match a row containing those words, even if not in the order that was
		 * specified (this allow matching across multiple columns). Note that if you
		 * wish to use filtering in DataTables this must remain 'true' - to remove the
		 * default filtering input box and retain filtering abilities, please use
		 * {@link DataTable.defaults.dom}.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.searching
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "searching": false
		 *      } );
		 *    } );
		 */
		"bFilter": true,
	
	
		/**
		 * Enable or disable the table information display. This shows information
		 * about the data that is currently visible on the page, including information
		 * about filtered data if that action is being performed.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.info
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "info": false
		 *      } );
		 *    } );
		 */
		"bInfo": true,
	
	
		/**
		 * Allows the end user to select the size of a formatted page from a select
		 * menu (sizes are 10, 25, 50 and 100). Requires pagination (`paginate`).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.lengthChange
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "lengthChange": false
		 *      } );
		 *    } );
		 */
		"bLengthChange": true,
	
	
		/**
		 * Enable or disable pagination.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.paging
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "paging": false
		 *      } );
		 *    } );
		 */
		"bPaginate": true,
	
	
		/**
		 * Enable or disable the display of a 'processing' indicator when the table is
		 * being processed (e.g. a sort). This is particularly useful for tables with
		 * large amounts of data where it can take a noticeable amount of time to sort
		 * the entries.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.processing
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "processing": true
		 *      } );
		 *    } );
		 */
		"bProcessing": false,
	
	
		/**
		 * Retrieve the DataTables object for the given selector. Note that if the
		 * table has already been initialised, this parameter will cause DataTables
		 * to simply return the object that has already been set up - it will not take
		 * account of any changes you might have made to the initialisation object
		 * passed to DataTables (setting this parameter to true is an acknowledgement
		 * that you understand this). `destroy` can be used to reinitialise a table if
		 * you need.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.retrieve
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      initTable();
		 *      tableActions();
		 *    } );
		 *
		 *    function initTable ()
		 *    {
		 *      return $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false,
		 *        "retrieve": true
		 *      } );
		 *    }
		 *
		 *    function tableActions ()
		 *    {
		 *      var table = initTable();
		 *      // perform API operations with oTable
		 *    }
		 */
		"bRetrieve": false,
	
	
		/**
		 * When vertical (y) scrolling is enabled, DataTables will force the height of
		 * the table's viewport to the given height at all times (useful for layout).
		 * However, this can look odd when filtering data down to a small data set,
		 * and the footer is left "floating" further down. This parameter (when
		 * enabled) will cause DataTables to collapse the table's viewport down when
		 * the result set will fit within the given Y height.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollCollapse
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200",
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */
		"bScrollCollapse": false,
	
	
		/**
		 * Configure DataTables to use server-side processing. Note that the
		 * `ajax` parameter must also be given in order to give DataTables a
		 * source to obtain the required data for each draw.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverSide
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "xhr.php"
		 *      } );
		 *    } );
		 */
		"bServerSide": false,
	
	
		/**
		 * Enable or disable sorting of columns. Sorting of individual columns can be
		 * disabled by the `sortable` option for each column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.ordering
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "ordering": false
		 *      } );
		 *    } );
		 */
		"bSort": true,
	
	
		/**
		 * Enable or display DataTables' ability to sort multiple columns at the
		 * same time (activated by shift-click by the user).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderMulti
		 *
		 *  @example
		 *    // Disable multiple column sorting ability
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderMulti": false
		 *      } );
		 *    } );
		 */
		"bSortMulti": true,
	
	
		/**
		 * Allows control over whether DataTables should use the top (true) unique
		 * cell that is found for a single column, or the bottom (false - default).
		 * This is useful when using complex headers.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderCellsTop
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderCellsTop": true
		 *      } );
		 *    } );
		 */
		"bSortCellsTop": false,
	
	
		/**
		 * Enable or disable the addition of the classes `sorting\_1`, `sorting\_2` and
		 * `sorting\_3` to the columns which are currently being sorted on. This is
		 * presented as a feature switch as it can increase processing time (while
		 * classes are removed and added) so for large data sets you might want to
		 * turn this off.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.orderClasses
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderClasses": false
		 *      } );
		 *    } );
		 */
		"bSortClasses": true,
	
	
		/**
		 * Enable or disable state saving. When enabled HTML5 `localStorage` will be
		 * used to save table display information such as pagination information,
		 * display length, filtering and sorting. As such when the end user reloads
		 * the page the display display will match what thy had previously set up.
		 *
		 * Due to the use of `localStorage` the default state saving is not supported
		 * in IE6 or 7. If state saving is required in those browsers, use
		 * `stateSaveCallback` to provide a storage solution such as cookies.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.stateSave
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "stateSave": true
		 *      } );
		 *    } );
		 */
		"bStateSave": false,
	
	
		/**
		 * This function is called when a TR element is created (and all TD child
		 * elements have been inserted), or registered if using a DOM source, allowing
		 * manipulation of the TR element (adding classes etc).
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} dataIndex The index of this row in the internal aoData array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.createdRow
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "createdRow": function( row, data, dataIndex ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" )
		 *          {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnCreatedRow": null,
	
	
		/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify any aspect you want about the created DOM.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.drawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "drawCallback": function( settings ) {
		 *          alert( 'DataTables has redrawn the table' );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnDrawCallback": null,
	
	
		/**
		 * Identical to fnHeaderCallback() but for the table footer this function
		 * allows you to modify the table footer on every 'draw' event.
		 *  @type function
		 *  @param {node} foot "TR" element for the footer
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.footerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "footerCallback": function( tfoot, data, start, end, display ) {
		 *          tfoot.getElementsByTagName('th')[0].innerHTML = "Starting index is "+start;
		 *        }
		 *      } );
		 *    } )
		 */
		"fnFooterCallback": null,
	
	
		/**
		 * When rendering large numbers in the information element for the table
		 * (i.e. "Showing 1 to 10 of 57 entries") DataTables will render large numbers
		 * to have a comma separator for the 'thousands' units (e.g. 1 million is
		 * rendered as "1,000,000") to help readability for the end user. This
		 * function will override the default method DataTables uses.
		 *  @type function
		 *  @member
		 *  @param {int} toFormat number to be formatted
		 *  @returns {string} formatted string for DataTables to show the number
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.formatNumber
		 *
		 *  @example
		 *    // Format a number using a single quote for the separator (note that
		 *    // this can also be done with the language.thousands option)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "formatNumber": function ( toFormat ) {
		 *          return toFormat.toString().replace(
		 *            /\B(?=(\d{3})+(?!\d))/g, "'"
		 *          );
		 *        };
		 *      } );
		 *    } );
		 */
		"fnFormatNumber": function ( toFormat ) {
			return toFormat.toString().replace(
				/\B(?=(\d{3})+(?!\d))/g,
				this.oLanguage.sThousands
			);
		},
	
	
		/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify the header row. This can be used to calculate and
		 * display useful information about the table.
		 *  @type function
		 *  @param {node} head "TR" element for the header
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.headerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "fheaderCallback": function( head, data, start, end, display ) {
		 *          head.getElementsByTagName('th')[0].innerHTML = "Displaying "+(end-start)+" records";
		 *        }
		 *      } );
		 *    } )
		 */
		"fnHeaderCallback": null,
	
	
		/**
		 * The information element can be used to convey information about the current
		 * state of the table. Although the internationalisation options presented by
		 * DataTables are quite capable of dealing with most customisations, there may
		 * be times where you wish to customise the string further. This callback
		 * allows you to do exactly that.
		 *  @type function
		 *  @param {object} oSettings DataTables settings object
		 *  @param {int} start Starting position in data for the draw
		 *  @param {int} end End position in data for the draw
		 *  @param {int} max Total number of rows in the table (regardless of
		 *    filtering)
		 *  @param {int} total Total number of rows in the data set, after filtering
		 *  @param {string} pre The string that DataTables has formatted using it's
		 *    own rules
		 *  @returns {string} The string to be displayed in the information element.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.infoCallback
		 *
		 *  @example
		 *    $('#example').dataTable( {
		 *      "infoCallback": function( settings, start, end, max, total, pre ) {
		 *        return start +" to "+ end;
		 *      }
		 *    } );
		 */
		"fnInfoCallback": null,
	
	
		/**
		 * Called when the table has been initialised. Normally DataTables will
		 * initialise sequentially and there will be no need for this function,
		 * however, this does not hold true when using external language information
		 * since that is obtained using an async XHR call.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} json The JSON object request from the server - only
		 *    present if client-side Ajax sourced data is used
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.initComplete
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "initComplete": function(settings, json) {
		 *          alert( 'DataTables has finished its initialisation.' );
		 *        }
		 *      } );
		 *    } )
		 */
		"fnInitComplete": null,
	
	
		/**
		 * Called at the very start of each table draw and can be used to cancel the
		 * draw by returning false, any other return (including undefined) results in
		 * the full draw occurring).
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @returns {boolean} False will cancel the draw, anything else (including no
		 *    return) will allow it to complete.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.preDrawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "preDrawCallback": function( settings ) {
		 *          if ( $('#test').val() == 1 ) {
		 *            return false;
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnPreDrawCallback": null,
	
	
		/**
		 * This function allows you to 'post process' each row after it have been
		 * generated for each table draw, but before it is rendered on screen. This
		 * function might be used for setting the row class name etc.
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} displayIndex The display index for the current table draw
		 *  @param {int} displayIndexFull The index of the data in the full list of
		 *    rows (after filtering)
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.rowCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "rowCallback": function( row, data, displayIndex, displayIndexFull ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" ) {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnRowCallback": null,
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * This parameter allows you to override the default function which obtains
		 * the data from the server so something more suitable for your application.
		 * For example you could use POST data, or pull information from a Gears or
		 * AIR database.
		 *  @type function
		 *  @member
		 *  @param {string} source HTTP source to obtain the data from (`ajax`)
		 *  @param {array} data A key/value pair object containing the data to send
		 *    to the server
		 *  @param {function} callback to be called on completion of the data get
		 *    process that will draw the data on the page.
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverData
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"fnServerData": null,
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 *  It is often useful to send extra data to the server when making an Ajax
		 * request - for example custom filtering information, and this callback
		 * function makes it trivial to send extra information to the server. The
		 * passed in parameter is the data set that has been constructed by
		 * DataTables, and you can add to this or modify it as you require.
		 *  @type function
		 *  @param {array} data Data array (array of objects which are name/value
		 *    pairs) that has been constructed by DataTables and will be sent to the
		 *    server. In the case of Ajax sourced data with server-side processing
		 *    this will be an empty array, for server-side processing there will be a
		 *    significant number of parameters!
		 *  @returns {undefined} Ensure that you modify the data array passed in,
		 *    as this is passed by reference.
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverParams
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"fnServerParams": null,
	
	
		/**
		 * Load the table state. With this function you can define from where, and how, the
		 * state of a table is loaded. By default DataTables will load from `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} callback Callback that can be executed when done. It
		 *    should be passed the loaded state object.
		 *  @return {object} The DataTables state object to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadCallback": function (settings, callback) {
		 *          $.ajax( {
		 *            "url": "/state_load",
		 *            "dataType": "json",
		 *            "success": function (json) {
		 *              callback( json );
		 *            }
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoadCallback": function ( settings ) {
			try {
				return JSON.parse(
					(settings.iStateDuration === -1 ? sessionStorage : localStorage).getItem(
						'DataTables_'+settings.sInstance+'_'+location.pathname
					)
				);
			} catch (e) {}
		},
	
	
		/**
		 * Callback which allows modification of the saved state prior to loading that state.
		 * This callback is called when the table is loading state from the stored data, but
		 * prior to the settings object being modified by the saved state. Note that for
		 * plug-in authors, you should use the `stateLoadParams` event to load parameters for
		 * a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that is to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never loaded
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Disallow state loading by returning false
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          return false;
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoadParams": null,
	
	
		/**
		 * Callback that is called when the state has been loaded from the state saving method
		 * and the DataTables settings object has been modified as a result of the loaded state.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that was loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoaded
		 *
		 *  @example
		 *    // Show an alert with the filtering value that was saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoaded": function (settings, data) {
		 *          alert( 'Saved filter was: '+data.oSearch.sSearch );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoaded": null,
	
	
		/**
		 * Save the table state. This function allows you to define where and how the state
		 * information for the table is stored By default DataTables will use `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveCallback": function (settings, data) {
		 *          // Send an Ajax request to the server with the state object
		 *          $.ajax( {
		 *            "url": "/state_save",
		 *            "data": data,
		 *            "dataType": "json",
		 *            "method": "POST"
		 *            "success": function () {}
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateSaveCallback": function ( settings, data ) {
			try {
				(settings.iStateDuration === -1 ? sessionStorage : localStorage).setItem(
					'DataTables_'+settings.sInstance+'_'+location.pathname,
					JSON.stringify( data )
				);
			} catch (e) {}
		},
	
	
		/**
		 * Callback which allows modification of the state to be saved. Called when the table
		 * has changed state a new state save is required. This method allows modification of
		 * the state saving object prior to actually doing the save, including addition or
		 * other state properties or modification. Note that for plug-in authors, you should
		 * use the `stateSaveParams` event to save parameters for a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateSaveParams": null,
	
	
		/**
		 * Duration for which the saved state information is considered valid. After this period
		 * has elapsed the state will be returned to the default.
		 * Value is given in seconds.
		 *  @type int
		 *  @default 7200 <i>(2 hours)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.stateDuration
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateDuration": 60*60*24; // 1 day
		 *      } );
		 *    } )
		 */
		"iStateDuration": 7200,
	
	
		/**
		 * When enabled DataTables will not make a request to the server for the first
		 * page draw - rather it will use the data already on the page (no sorting etc
		 * will be applied to it), thus saving on an XHR at load time. `deferLoading`
		 * is used to indicate that deferred loading is required, but it is also used
		 * to tell DataTables how many records there are in the full table (allowing
		 * the information element and pagination to be displayed correctly). In the case
		 * where a filtering is applied to the table on initial load, this can be
		 * indicated by giving the parameter as an array, where the first element is
		 * the number of records available after filtering and the second element is the
		 * number of records without filtering (allowing the table information element
		 * to be shown correctly).
		 *  @type int | array
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.deferLoading
		 *
		 *  @example
		 *    // 57 records available in the table, no filtering applied
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": 57
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // 57 records after filtering, 100 without filtering (an initial filter applied)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": [ 57, 100 ],
		 *        "search": {
		 *          "search": "my_filter"
		 *        }
		 *      } );
		 *    } );
		 */
		"iDeferLoading": null,
	
	
		/**
		 * Number of rows to display on a single page when using pagination. If
		 * feature enabled (`lengthChange`) then the end user will be able to override
		 * this to a custom setting using a pop-up menu.
		 *  @type int
		 *  @default 10
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pageLength
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pageLength": 50
		 *      } );
		 *    } )
		 */
		"iDisplayLength": 10,
	
	
		/**
		 * Define the starting point for data display when using DataTables with
		 * pagination. Note that this parameter is the number of records, rather than
		 * the page number, so if you have 10 records per page and want to start on
		 * the third page, it should be "20".
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.displayStart
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "displayStart": 20
		 *      } );
		 *    } )
		 */
		"iDisplayStart": 0,
	
	
		/**
		 * By default DataTables allows keyboard navigation of the table (sorting, paging,
		 * and filtering) by adding a `tabindex` attribute to the required elements. This
		 * allows you to tab through the controls and press the enter key to activate them.
		 * The tabindex is default 0, meaning that the tab follows the flow of the document.
		 * You can overrule this using this parameter if you wish. Use a value of -1 to
		 * disable built-in keyboard navigation.
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.tabIndex
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "tabIndex": 1
		 *      } );
		 *    } );
		 */
		"iTabIndex": 0,
	
	
		/**
		 * Classes that DataTables assigns to the various components and features
		 * that it adds to the HTML table. This allows classes to be configured
		 * during initialisation in addition to through the static
		 * {@link DataTable.ext.oStdClasses} object).
		 *  @namespace
		 *  @name DataTable.defaults.classes
		 */
		"oClasses": {},
	
	
		/**
		 * All strings that DataTables uses in the user interface that it creates
		 * are defined in this object, allowing you to modified them individually or
		 * completely replace them all as required.
		 *  @namespace
		 *  @name DataTable.defaults.language
		 */
		"oLanguage": {
			/**
			 * Strings that are used for WAI-ARIA labels and controls only (these are not
			 * actually visible on the page, but will be read by screenreaders, and thus
			 * must be internationalised as well).
			 *  @namespace
			 *  @name DataTable.defaults.language.aria
			 */
			"oAria": {
				/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted ascending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortAscending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortAscending": " - click/return to sort ascending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sSortAscending": ": activate to sort column ascending",
	
				/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted descending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortDescending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortDescending": " - click/return to sort descending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sSortDescending": ": activate to sort column descending"
			},
	
			/**
			 * Pagination string used by DataTables for the built-in pagination
			 * control types.
			 *  @namespace
			 *  @name DataTable.defaults.language.paginate
			 */
			"oPaginate": {
				/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the first page.
				 *  @type string
				 *  @default First
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.first
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "first": "First page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sFirst": "First",
	
	
				/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the last page.
				 *  @type string
				 *  @default Last
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.last
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "last": "Last page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sLast": "Last",
	
	
				/**
				 * Text to use for the 'next' pagination button (to take the user to the
				 * next page).
				 *  @type string
				 *  @default Next
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.next
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "next": "Next page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sNext": "Next",
	
	
				/**
				 * Text to use for the 'previous' pagination button (to take the user to
				 * the previous page).
				 *  @type string
				 *  @default Previous
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.previous
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "previous": "Previous page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sPrevious": "Previous"
			},
	
			/**
			 * This string is shown in preference to `zeroRecords` when the table is
			 * empty of data (regardless of filtering). Note that this is an optional
			 * parameter - if it is not given, the value of `zeroRecords` will be used
			 * instead (either the default or given value).
			 *  @type string
			 *  @default No data available in table
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.emptyTable
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "emptyTable": "No data available in table"
			 *        }
			 *      } );
			 *    } );
			 */
			"sEmptyTable": "No data available in table",
	
	
			/**
			 * This string gives information to the end user about the information
			 * that is current on display on the page. The following tokens can be
			 * used in the string and will be dynamically replaced as the table
			 * display updates. This tokens can be placed anywhere in the string, or
			 * removed as needed by the language requires:
			 *
			 * * `\_START\_` - Display index of the first record on the current page
			 * * `\_END\_` - Display index of the last record on the current page
			 * * `\_TOTAL\_` - Number of records in the table after filtering
			 * * `\_MAX\_` - Number of records in the table without filtering
			 * * `\_PAGE\_` - Current page number
			 * * `\_PAGES\_` - Total number of pages of data in the table
			 *
			 *  @type string
			 *  @default Showing _START_ to _END_ of _TOTAL_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.info
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "info": "Showing page _PAGE_ of _PAGES_"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfo": "Showing _START_ to _END_ of _TOTAL_ entries",
	
	
			/**
			 * Display information string for when the table is empty. Typically the
			 * format of this string should match `info`.
			 *  @type string
			 *  @default Showing 0 to 0 of 0 entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoEmpty
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoEmpty": "No entries to show"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoEmpty": "Showing 0 to 0 of 0 entries",
	
	
			/**
			 * When a user filters the information in a table, this string is appended
			 * to the information (`info`) to give an idea of how strong the filtering
			 * is. The variable _MAX_ is dynamically updated.
			 *  @type string
			 *  @default (filtered from _MAX_ total entries)
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoFiltered
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoFiltered": " - filtering from _MAX_ records"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoFiltered": "(filtered from _MAX_ total entries)",
	
	
			/**
			 * If can be useful to append extra information to the info string at times,
			 * and this variable does exactly that. This information will be appended to
			 * the `info` (`infoEmpty` and `infoFiltered` in whatever combination they are
			 * being used) at all times.
			 *  @type string
			 *  @default <i>Empty string</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoPostFix
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoPostFix": "All records shown are derived from real information."
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoPostFix": "",
	
	
			/**
			 * This decimal place operator is a little different from the other
			 * language options since DataTables doesn't output floating point
			 * numbers, so it won't ever use this for display of a number. Rather,
			 * what this parameter does is modify the sort methods of the table so
			 * that numbers which are in a format which has a character other than
			 * a period (`.`) as a decimal place will be sorted numerically.
			 *
			 * Note that numbers with different decimal places cannot be shown in
			 * the same table and still be sortable, the table must be consistent.
			 * However, multiple different tables on the page can use different
			 * decimal place characters.
			 *  @type string
			 *  @default 
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.decimal
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "decimal": ","
			 *          "thousands": "."
			 *        }
			 *      } );
			 *    } );
			 */
			"sDecimal": "",
	
	
			/**
			 * DataTables has a build in number formatter (`formatNumber`) which is
			 * used to format large numbers that are used in the table information.
			 * By default a comma is used, but this can be trivially changed to any
			 * character you wish with this parameter.
			 *  @type string
			 *  @default ,
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.thousands
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "thousands": "'"
			 *        }
			 *      } );
			 *    } );
			 */
			"sThousands": ",",
	
	
			/**
			 * Detail the action that will be taken when the drop down menu for the
			 * pagination length option is changed. The '_MENU_' variable is replaced
			 * with a default select list of 10, 25, 50 and 100, and can be replaced
			 * with a custom select box if required.
			 *  @type string
			 *  @default Show _MENU_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.lengthMenu
			 *
			 *  @example
			 *    // Language change only
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": "Display _MENU_ records"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Language and options change
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": 'Display <select>'+
			 *            '<option value="10">10</option>'+
			 *            '<option value="20">20</option>'+
			 *            '<option value="30">30</option>'+
			 *            '<option value="40">40</option>'+
			 *            '<option value="50">50</option>'+
			 *            '<option value="-1">All</option>'+
			 *            '</select> records'
			 *        }
			 *      } );
			 *    } );
			 */
			"sLengthMenu": "Show _MENU_ entries",
	
	
			/**
			 * When using Ajax sourced data and during the first draw when DataTables is
			 * gathering the data, this message is shown in an empty row in the table to
			 * indicate to the end user the the data is being loaded. Note that this
			 * parameter is not used when loading data by server-side processing, just
			 * Ajax sourced data with client-side processing.
			 *  @type string
			 *  @default Loading...
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.loadingRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "loadingRecords": "Please wait - loading..."
			 *        }
			 *      } );
			 *    } );
			 */
			"sLoadingRecords": "Loading...",
	
	
			/**
			 * Text which is displayed when the table is processing a user action
			 * (usually a sort command or similar).
			 *  @type string
			 *  @default Processing...
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.processing
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "processing": "DataTables is currently busy"
			 *        }
			 *      } );
			 *    } );
			 */
			"sProcessing": "Processing...",
	
	
			/**
			 * Details the actions that will be taken when the user types into the
			 * filtering input text box. The variable "_INPUT_", if used in the string,
			 * is replaced with the HTML text box for the filtering input allowing
			 * control over where it appears in the string. If "_INPUT_" is not given
			 * then the input box is appended to the string automatically.
			 *  @type string
			 *  @default Search:
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.search
			 *
			 *  @example
			 *    // Input text box will be appended at the end automatically
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Filter records:"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Specify where the filter should appear
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Apply filter _INPUT_ to table"
			 *        }
			 *      } );
			 *    } );
			 */
			"sSearch": "Search:",
	
	
			/**
			 * Assign a `placeholder` attribute to the search `input` element
			 *  @type string
			 *  @default 
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.searchPlaceholder
			 */
			"sSearchPlaceholder": "",
	
	
			/**
			 * All of the language information can be stored in a file on the
			 * server-side, which DataTables will look up if this parameter is passed.
			 * It must store the URL of the language file, which is in a JSON format,
			 * and the object has the same properties as the oLanguage object in the
			 * initialiser object (i.e. the above parameters). Please refer to one of
			 * the example language files to see how this works in action.
			 *  @type string
			 *  @default <i>Empty string - i.e. disabled</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.url
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "url": "http://www.sprymedia.co.uk/dataTables/lang.txt"
			 *        }
			 *      } );
			 *    } );
			 */
			"sUrl": "",
	
	
			/**
			 * Text shown inside the table records when the is no information to be
			 * displayed after filtering. `emptyTable` is shown when there is simply no
			 * information in the table at all (regardless of filtering).
			 *  @type string
			 *  @default No matching records found
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.zeroRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "zeroRecords": "No records to display"
			 *        }
			 *      } );
			 *    } );
			 */
			"sZeroRecords": "No matching records found"
		},
	
	
		/**
		 * This parameter allows you to have define the global filtering state at
		 * initialisation time. As an object the `search` parameter must be
		 * defined, but all other parameters are optional. When `regex` is true,
		 * the search string will be treated as a regular expression, when false
		 * (default) it will be treated as a straight string. When `smart`
		 * DataTables will use it's smart filtering methods (to word match at
		 * any point in the data), when false this will not be done.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.search
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "search": {"search": "Initial search"}
		 *      } );
		 *    } )
		 */
		"oSearch": $.extend( {}, DataTable.models.oSearch ),
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * By default DataTables will look for the property `data` (or `aaData` for
		 * compatibility with DataTables 1.9-) when obtaining data from an Ajax
		 * source or for server-side processing - this parameter allows that
		 * property to be changed. You can use Javascript dotted object notation to
		 * get a data source for multiple levels of nesting.
		 *  @type string
		 *  @default data
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxDataProp
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sAjaxDataProp": "data",
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * You can instruct DataTables to load data from an external
		 * source using this parameter (use aData if you want to pass data in you
		 * already have). Simply provide a url a JSON object can be obtained from.
		 *  @type string
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxSource
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sAjaxSource": null,
	
	
		/**
		 * This initialisation variable allows you to specify exactly where in the
		 * DOM you want DataTables to inject the various controls it adds to the page
		 * (for example you might want the pagination controls at the top of the
		 * table). DIV elements (with or without a custom class) can also be added to
		 * aid styling. The follow syntax is used:
		 *   <ul>
		 *     <li>The following options are allowed:
		 *       <ul>
		 *         <li>'l' - Length changing</li>
		 *         <li>'f' - Filtering input</li>
		 *         <li>'t' - The table!</li>
		 *         <li>'i' - Information</li>
		 *         <li>'p' - Pagination</li>
		 *         <li>'r' - pRocessing</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following constants are allowed:
		 *       <ul>
		 *         <li>'H' - jQueryUI theme "header" classes ('fg-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix')</li>
		 *         <li>'F' - jQueryUI theme "footer" classes ('fg-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix')</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following syntax is expected:
		 *       <ul>
		 *         <li>'&lt;' and '&gt;' - div elements</li>
		 *         <li>'&lt;"class" and '&gt;' - div with a class</li>
		 *         <li>'&lt;"#id" and '&gt;' - div with an ID</li>
		 *       </ul>
		 *     </li>
		 *     <li>Examples:
		 *       <ul>
		 *         <li>'&lt;"wrapper"flipt&gt;'</li>
		 *         <li>'&lt;lf&lt;t&gt;ip&gt;'</li>
		 *       </ul>
		 *     </li>
		 *   </ul>
		 *  @type string
		 *  @default lfrtip <i>(when `jQueryUI` is false)</i> <b>or</b>
		 *    <"H"lfr>t<"F"ip> <i>(when `jQueryUI` is true)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.dom
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "dom": '&lt;"top"i&gt;rt&lt;"bottom"flp&gt;&lt;"clear"&gt;'
		 *      } );
		 *    } );
		 */
		"sDom": "lfrtip",
	
	
		/**
		 * Search delay option. This will throttle full table searches that use the
		 * DataTables provided search input element (it does not effect calls to
		 * `dt-api search()`, providing a delay before the search is made.
		 *  @type integer
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.searchDelay
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchDelay": 200
		 *      } );
		 *    } )
		 */
		"searchDelay": null,
	
	
		/**
		 * DataTables features six different built-in options for the buttons to
		 * display for pagination control:
		 *
		 * * `numbers` - Page number buttons only
		 * * `simple` - 'Previous' and 'Next' buttons only
		 * * 'simple_numbers` - 'Previous' and 'Next' buttons, plus page numbers
		 * * `full` - 'First', 'Previous', 'Next' and 'Last' buttons
		 * * `full_numbers` - 'First', 'Previous', 'Next' and 'Last' buttons, plus page numbers
		 * * `first_last_numbers` - 'First' and 'Last' buttons, plus page numbers
		 *  
		 * Further methods can be added using {@link DataTable.ext.oPagination}.
		 *  @type string
		 *  @default simple_numbers
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pagingType
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pagingType": "full_numbers"
		 *      } );
		 *    } )
		 */
		"sPaginationType": "simple_numbers",
	
	
		/**
		 * Enable horizontal scrolling. When a table is too wide to fit into a
		 * certain layout, or you have a large number of columns in the table, you
		 * can enable x-scrolling to show the table in a viewport, which can be
		 * scrolled. This property can be `true` which will allow the table to
		 * scroll horizontally when needed, or any CSS unit, or a number (in which
		 * case it will be treated as a pixel measurement). Setting as simply `true`
		 * is recommended.
		 *  @type boolean|string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollX
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": true,
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */
		"sScrollX": "",
	
	
		/**
		 * This property can be used to force a DataTable to use more width than it
		 * might otherwise do when x-scrolling is enabled. For example if you have a
		 * table which requires to be well spaced, this parameter is useful for
		 * "over-sizing" the table, and thus forcing scrolling. This property can by
		 * any CSS unit, or a number (in which case it will be treated as a pixel
		 * measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollXInner
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": "100%",
		 *        "scrollXInner": "110%"
		 *      } );
		 *    } );
		 */
		"sScrollXInner": "",
	
	
		/**
		 * Enable vertical scrolling. Vertical scrolling will constrain the DataTable
		 * to the given height, and enable scrolling for any data which overflows the
		 * current viewport. This can be used as an alternative to paging to display
		 * a lot of data in a small area (although paging and scrolling can both be
		 * enabled at the same time). This property can be any CSS unit, or a number
		 * (in which case it will be treated as a pixel measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollY
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false
		 *      } );
		 *    } );
		 */
		"sScrollY": "",
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * Set the HTTP method that is used to make the Ajax call for server-side
		 * processing or Ajax sourced data.
		 *  @type string
		 *  @default GET
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverMethod
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sServerMethod": "GET",
	
	
		/**
		 * DataTables makes use of renderers when displaying HTML elements for
		 * a table. These renderers can be added or modified by plug-ins to
		 * generate suitable mark-up for a site. For example the Bootstrap
		 * integration plug-in for DataTables uses a paging button renderer to
		 * display pagination buttons in the mark-up required by Bootstrap.
		 *
		 * For further information about the renderers available see
		 * DataTable.ext.renderer
		 *  @type string|object
		 *  @default null
		 *
		 *  @name DataTable.defaults.renderer
		 *
		 */
		"renderer": null,
	
	
		/**
		 * Set the data property name that DataTables should use to get a row's id
		 * to set as the `id` property in the node.
		 *  @type string
		 *  @default DT_RowId
		 *
		 *  @name DataTable.defaults.rowId
		 */
		"rowId": "DT_RowId"
	};
	
	_fnHungarianMap( DataTable.defaults );
	
	
	
	/*
	 * Developer note - See note in model.defaults.js about the use of Hungarian
	 * notation and camel case.
	 */
	
	/**
	 * Column options that can be given to DataTables at initialisation time.
	 *  @namespace
	 */
	DataTable.defaults.column = {
		/**
		 * Define which column(s) an order will occur on for this column. This
		 * allows a column's ordering to take multiple columns into account when
		 * doing a sort or use the data from a different column. For example first
		 * name / last name columns make sense to do a multi-column sort over the
		 * two columns.
		 *  @type array|int
		 *  @default null <i>Takes the value of the column index automatically</i>
		 *
		 *  @name DataTable.defaults.column.orderData
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderData": [ 0, 1 ], "targets": [ 0 ] },
		 *          { "orderData": [ 1, 0 ], "targets": [ 1 ] },
		 *          { "orderData": 2, "targets": [ 2 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderData": [ 0, 1 ] },
		 *          { "orderData": [ 1, 0 ] },
		 *          { "orderData": 2 },
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"aDataSort": null,
		"iDataSort": -1,
	
	
		/**
		 * You can control the default ordering direction, and even alter the
		 * behaviour of the sort handler (i.e. only allow ascending ordering etc)
		 * using this parameter.
		 *  @type array
		 *  @default [ 'asc', 'desc' ]
		 *
		 *  @name DataTable.defaults.column.orderSequence
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderSequence": [ "asc" ], "targets": [ 1 ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ], "targets": [ 2 ] },
		 *          { "orderSequence": [ "desc" ], "targets": [ 3 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          { "orderSequence": [ "asc" ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ] },
		 *          { "orderSequence": [ "desc" ] },
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"asSorting": [ 'asc', 'desc' ],
	
	
		/**
		 * Enable or disable filtering on the data in this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.searchable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "searchable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "searchable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bSearchable": true,
	
	
		/**
		 * Enable or disable ordering on this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.orderable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bSortable": true,
	
	
		/**
		 * Enable or disable the display of this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.visible
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "visible": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "visible": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bVisible": true,
	
	
		/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} td The TD node that has been created
		 *  @param {*} cellData The Data for the cell
		 *  @param {array|object} rowData The data for the whole row
		 *  @param {int} row The row index for the aoData data store
		 *  @param {int} col The column index for aoColumns
		 *
		 *  @name DataTable.defaults.column.createdCell
		 *  @dtopt Columns
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [3],
		 *          "createdCell": function (td, cellData, rowData, row, col) {
		 *            if ( cellData == "1.7" ) {
		 *              $(td).css('color', 'blue')
		 *            }
		 *          }
		 *        } ]
		 *      });
		 *    } );
		 */
		"fnCreatedCell": null,
	
	
		/**
		 * This parameter has been replaced by `data` in DataTables to ensure naming
		 * consistency. `dataProp` can still be used, as there is backwards
		 * compatibility in DataTables for this option, but it is strongly
		 * recommended that you use `data` in preference to `dataProp`.
		 *  @name DataTable.defaults.column.dataProp
		 */
	
	
		/**
		 * This property can be used to read data from any data source property,
		 * including deeply nested objects / properties. `data` can be given in a
		 * number of different ways which effect its behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object. Note that
		 *      function notation is recommended for use in `render` rather than
		 *      `data` as it is much simpler to use as a renderer.
		 * * `null` - use the original data source for the row rather than plucking
		 *   data directly from it. This action has effects on two other
		 *   initialisation options:
		 *    * `defaultContent` - When null is given as the `data` option and
		 *      `defaultContent` is specified for the column, the value defined by
		 *      `defaultContent` will be used for the cell.
		 *    * `render` - When null is used for the `data` option and the `render`
		 *      option is specified for the column, the whole data source for the
		 *      row is used for the renderer.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * `{array|object}` The data source for the row
		 *      * `{string}` The type call data requested - this will be 'set' when
		 *        setting data or 'filter', 'display', 'type', 'sort' or undefined
		 *        when gathering data. Note that when `undefined` is given for the
		 *        type DataTables expects to get the raw data for the object back<
		 *      * `{*}` Data to set when the second parameter is 'set'.
		 *    * Return:
		 *      * The return value from the function is not required when 'set' is
		 *        the type of call, but otherwise the return is what will be used
		 *        for the data requested.
		 *
		 * Note that `data` is a getter and setter option. If you just require
		 * formatting of data for output, you will likely want to use `render` which
		 * is simply a getter and thus simpler to use.
		 *
		 * Note that prior to DataTables 1.9.2 `data` was called `mDataProp`. The
		 * name change reflects the flexibility of this property and is consistent
		 * with the naming of mRender. If 'mDataProp' is given, then it will still
		 * be used by DataTables, as it automatically maps the old name to the new
		 * if required.
		 *
		 *  @type string|int|function|null
		 *  @default null <i>Use automatically calculated column index</i>
		 *
		 *  @name DataTable.defaults.column.data
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Read table data from objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {value},
		 *    //      "version": {value},
		 *    //      "grade": {value}
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/objects.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform" },
		 *          { "data": "version" },
		 *          { "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Read information from deeply nested objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {
		 *    //         "inner": {value}
		 *    //      },
		 *    //      "details": [
		 *    //         {value}, {value}
		 *    //      ]
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform.inner" },
		 *          { "data": "details.0" },
		 *          { "data": "details.1" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `data` as a function to provide different information for
		 *    // sorting, filtering and display. In this case, currency (price)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": function ( source, type, val ) {
		 *            if (type === 'set') {
		 *              source.price = val;
		 *              // Store the computed dislay and filter values for efficiency
		 *              source.price_display = val=="" ? "" : "$"+numberFormat(val);
		 *              source.price_filter  = val=="" ? "" : "$"+numberFormat(val)+" "+val;
		 *              return;
		 *            }
		 *            else if (type === 'display') {
		 *              return source.price_display;
		 *            }
		 *            else if (type === 'filter') {
		 *              return source.price_filter;
		 *            }
		 *            // 'sort', 'type' and undefined all just use the integer
		 *            return source.price;
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using default content
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null,
		 *          "defaultContent": "Click to edit"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using array notation - outputting a list from an array
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "name[, ]"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 */
		"mData": null,
	
	
		/**
		 * This property is the rendering partner to `data` and it is suggested that
		 * when you want to manipulate data for display (including filtering,
		 * sorting etc) without altering the underlying data for the table, use this
		 * property. `render` can be considered to be the the read only companion to
		 * `data` which is read / write (then as such more complex). Like `data`
		 * this option can be given in a number of different ways to effect its
		 * behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object.
		 * * `object` - use different data for the different data types requested by
		 *   DataTables ('filter', 'display', 'type' or 'sort'). The property names
		 *   of the object is the data type the property refers to and the value can
		 *   defined using an integer, string or function using the same rules as
		 *   `render` normally does. Note that an `_` option _must_ be specified.
		 *   This is the default value to use if you haven't specified a value for
		 *   the data type requested by DataTables.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * {array|object} The data source for the row (based on `data`)
		 *      * {string} The type call data requested - this will be 'filter',
		 *        'display', 'type' or 'sort'.
		 *      * {array|object} The full data source for the row (not based on
		 *        `data`)
		 *    * Return:
		 *      * The return value from the function is what will be used for the
		 *        data requested.
		 *
		 *  @type string|int|function|object|null
		 *  @default null Use the data source value.
		 *
		 *  @name DataTable.defaults.column.render
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Create a comma separated list from an array of objects
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          {
		 *            "data": "platform",
		 *            "render": "[, ].name"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Execute a function to obtain data
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": "browserName()"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // As an object, extracting different data for the different types
		 *    // This would be used with a data source such as:
		 *    //   { "phone": 5552368, "phone_filter": "5552368 555-2368", "phone_display": "555-2368" }
		 *    // Here the `phone` integer is used for sorting and type detection, while `phone_filter`
		 *    // (which has both forms) is used for filtering for if a user inputs either format, while
		 *    // the formatted phone number is the one that is shown in the table.
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": {
		 *            "_": "phone",
		 *            "filter": "phone_filter",
		 *            "display": "phone_display"
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Use as a function to create a link from the data source
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "download_link",
		 *          "render": function ( data, type, full ) {
		 *            return '<a href="'+data+'">Download</a>';
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 */
		"mRender": null,
	
	
		/**
		 * Change the cell type created for the column - either TD cells or TH cells. This
		 * can be useful as TH cells have semantic meaning in the table body, allowing them
		 * to act as a header for a row (you may wish to add scope='row' to the TH elements).
		 *  @type string
		 *  @default td
		 *
		 *  @name DataTable.defaults.column.cellType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Make the first column use TH cells
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "cellType": "th"
		 *        } ]
		 *      } );
		 *    } );
		 */
		"sCellType": "td",
	
	
		/**
		 * Class to give to each cell in this column.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.class
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "class": "my_class", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "class": "my_class" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sClass": "",
	
		/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 * Generally you shouldn't need this!
		 *  @type string
		 *  @default <i>Empty string<i>
		 *
		 *  @name DataTable.defaults.column.contentPadding
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "contentPadding": "mmm"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sContentPadding": "",
	
	
		/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because `data`
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 *
		 *  @name DataTable.defaults.column.defaultContent
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit",
		 *            "targets": [ -1 ]
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sDefaultContent": null,
	
	
		/**
		 * This parameter is only used in DataTables' server-side processing. It can
		 * be exceptionally useful to know what columns are being displayed on the
		 * client side, and to map these to database fields. When defined, the names
		 * also allow DataTables to reorder information from the server if it comes
		 * back in an unexpected order (i.e. if you switch your columns around on the
		 * client-side, your server-side code does not also need updating).
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.name
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "name": "engine", "targets": [ 0 ] },
		 *          { "name": "browser", "targets": [ 1 ] },
		 *          { "name": "platform", "targets": [ 2 ] },
		 *          { "name": "version", "targets": [ 3 ] },
		 *          { "name": "grade", "targets": [ 4 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "name": "engine" },
		 *          { "name": "browser" },
		 *          { "name": "platform" },
		 *          { "name": "version" },
		 *          { "name": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sName": "",
	
	
		/**
		 * Defines a data source type for the ordering which can be used to read
		 * real-time information from the table (updating the internally cached
		 * version) prior to ordering. This allows ordering to occur on user
		 * editable elements such as form inputs.
		 *  @type string
		 *  @default std
		 *
		 *  @name DataTable.defaults.column.orderDataType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderDataType": "dom-text", "targets": [ 2, 3 ] },
		 *          { "type": "numeric", "targets": [ 3 ] },
		 *          { "orderDataType": "dom-select", "targets": [ 4 ] },
		 *          { "orderDataType": "dom-checkbox", "targets": [ 5 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          { "orderDataType": "dom-text" },
		 *          { "orderDataType": "dom-text", "type": "numeric" },
		 *          { "orderDataType": "dom-select" },
		 *          { "orderDataType": "dom-checkbox" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sSortDataType": "std",
	
	
		/**
		 * The title of this column.
		 *  @type string
		 *  @default null <i>Derived from the 'TH' value for this column in the
		 *    original HTML table.</i>
		 *
		 *  @name DataTable.defaults.column.title
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "title": "My column title", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "title": "My column title" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sTitle": null,
	
	
		/**
		 * The type allows you to specify how the data for this column will be
		 * ordered. Four types (string, numeric, date and html (which will strip
		 * HTML tags before ordering)) are currently available. Note that only date
		 * formats understood by Javascript's Date() object will be accepted as type
		 * date. For example: "Mar 26, 2008 5:03 PM". May take the values: 'string',
		 * 'numeric', 'date' or 'html' (by default). Further types can be adding
		 * through plug-ins.
		 *  @type string
		 *  @default null <i>Auto-detected from raw data</i>
		 *
		 *  @name DataTable.defaults.column.type
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "type": "html", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "type": "html" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sType": null,
	
	
		/**
		 * Defining the width of the column, this parameter may take any CSS value
		 * (3em, 20px etc). DataTables applies 'smart' widths to columns which have not
		 * been given a specific width through this interface ensuring that the table
		 * remains readable.
		 *  @type string
		 *  @default null <i>Automatic</i>
		 *
		 *  @name DataTable.defaults.column.width
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "width": "20%", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "width": "20%" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sWidth": null
	};
	
	_fnHungarianMap( DataTable.defaults.column );
	
	
	
	/**
	 * DataTables settings object - this holds all the information needed for a
	 * given table, including configuration, data and current application of the
	 * table options. DataTables does not have a single instance for each DataTable
	 * with the settings attached to that instance, but rather instances of the
	 * DataTable "class" are created on-the-fly as needed (typically by a
	 * $().dataTable() call) and the settings object is then applied to that
	 * instance.
	 *
	 * Note that this object is related to {@link DataTable.defaults} but this
	 * one is the internal data store for DataTables's cache of columns. It should
	 * NOT be manipulated outside of DataTables. Any configuration should be done
	 * through the initialisation options.
	 *  @namespace
	 *  @todo Really should attach the settings object to individual instances so we
	 *    don't need to create new instances on each $().dataTable() call (if the
	 *    table already exists). It would also save passing oSettings around and
	 *    into every single function. However, this is a very significant
	 *    architecture change for DataTables and will almost certainly break
	 *    backwards compatibility with older installations. This is something that
	 *    will be done in 2.0.
	 */
	DataTable.models.oSettings = {
		/**
		 * Primary features of DataTables and their enablement state.
		 *  @namespace
		 */
		"oFeatures": {
	
			/**
			 * Flag to say if DataTables should automatically try to calculate the
			 * optimum table and columns widths (true) or not (false).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bAutoWidth": null,
	
			/**
			 * Delay the creation of TR and TD elements until they are actually
			 * needed by a driven page draw. This can give a significant speed
			 * increase for Ajax source and Javascript source data, but makes no
			 * difference at all fro DOM and server-side processing tables.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bDeferRender": null,
	
			/**
			 * Enable filtering on the table or not. Note that if this is disabled
			 * then there is no filtering at all on the table, including fnFilter.
			 * To just remove the filtering input use sDom and remove the 'f' option.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bFilter": null,
	
			/**
			 * Table information element (the 'Showing x of y records' div) enable
			 * flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bInfo": null,
	
			/**
			 * Present a user control allowing the end user to change the page size
			 * when pagination is enabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bLengthChange": null,
	
			/**
			 * Pagination enabled or not. Note that if this is disabled then length
			 * changing must also be disabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bPaginate": null,
	
			/**
			 * Processing indicator enable flag whenever DataTables is enacting a
			 * user request - typically an Ajax request for server-side processing.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bProcessing": null,
	
			/**
			 * Server-side processing enabled flag - when enabled DataTables will
			 * get all data from the server for every draw - there is no filtering,
			 * sorting or paging done on the client-side.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bServerSide": null,
	
			/**
			 * Sorting enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSort": null,
	
			/**
			 * Multi-column sorting
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSortMulti": null,
	
			/**
			 * Apply a class to the columns which are being sorted to provide a
			 * visual highlight or not. This can slow things down when enabled since
			 * there is a lot of DOM interaction.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSortClasses": null,
	
			/**
			 * State saving enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bStateSave": null
		},
	
	
		/**
		 * Scrolling settings for a table.
		 *  @namespace
		 */
		"oScroll": {
			/**
			 * When the table is shorter in height than sScrollY, collapse the
			 * table container down to the height of the table (when true).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bCollapse": null,
	
			/**
			 * Width of the scrollbar for the web-browser's platform. Calculated
			 * during table initialisation.
			 *  @type int
			 *  @default 0
			 */
			"iBarWidth": 0,
	
			/**
			 * Viewport width for horizontal scrolling. Horizontal scrolling is
			 * disabled if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */
			"sX": null,
	
			/**
			 * Width to expand the table to when using x-scrolling. Typically you
			 * should not need to use this.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 *  @deprecated
			 */
			"sXInner": null,
	
			/**
			 * Viewport height for vertical scrolling. Vertical scrolling is disabled
			 * if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */
			"sY": null
		},
	
		/**
		 * Language information for the table.
		 *  @namespace
		 *  @extends DataTable.defaults.oLanguage
		 */
		"oLanguage": {
			/**
			 * Information callback function. See
			 * {@link DataTable.defaults.fnInfoCallback}
			 *  @type function
			 *  @default null
			 */
			"fnInfoCallback": null
		},
	
		/**
		 * Browser support parameters
		 *  @namespace
		 */
		"oBrowser": {
			/**
			 * Indicate if the browser incorrectly calculates width:100% inside a
			 * scrolling element (IE6/7)
			 *  @type boolean
			 *  @default false
			 */
			"bScrollOversize": false,
	
			/**
			 * Determine if the vertical scrollbar is on the right or left of the
			 * scrolling container - needed for rtl language layout, although not
			 * all browsers move the scrollbar (Safari).
			 *  @type boolean
			 *  @default false
			 */
			"bScrollbarLeft": false,
	
			/**
			 * Flag for if `getBoundingClientRect` is fully supported or not
			 *  @type boolean
			 *  @default false
			 */
			"bBounding": false,
	
			/**
			 * Browser scrollbar width
			 *  @type integer
			 *  @default 0
			 */
			"barWidth": 0
		},
	
	
		"ajax": null,
	
	
		/**
		 * Array referencing the nodes which are used for the features. The
		 * parameters of this object match what is allowed by sDom - i.e.
		 *   <ul>
		 *     <li>'l' - Length changing</li>
		 *     <li>'f' - Filtering input</li>
		 *     <li>'t' - The table!</li>
		 *     <li>'i' - Information</li>
		 *     <li>'p' - Pagination</li>
		 *     <li>'r' - pRocessing</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aanFeatures": [],
	
		/**
		 * Store data information - see {@link DataTable.models.oRow} for detailed
		 * information.
		 *  @type array
		 *  @default []
		 */
		"aoData": [],
	
		/**
		 * Array of indexes which are in the current display (after filtering etc)
		 *  @type array
		 *  @default []
		 */
		"aiDisplay": [],
	
		/**
		 * Array of indexes for display - no filtering
		 *  @type array
		 *  @default []
		 */
		"aiDisplayMaster": [],
	
		/**
		 * Map of row ids to data indexes
		 *  @type object
		 *  @default {}
		 */
		"aIds": {},
	
		/**
		 * Store information about each column that is in use
		 *  @type array
		 *  @default []
		 */
		"aoColumns": [],
	
		/**
		 * Store information about the table's header
		 *  @type array
		 *  @default []
		 */
		"aoHeader": [],
	
		/**
		 * Store information about the table's footer
		 *  @type array
		 *  @default []
		 */
		"aoFooter": [],
	
		/**
		 * Store the applied global search information in case we want to force a
		 * research or compare the old search to a new one.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 */
		"oPreviousSearch": {},
	
		/**
		 * Store the applied search for each column - see
		 * {@link DataTable.models.oSearch} for the format that is used for the
		 * filtering information for each column.
		 *  @type array
		 *  @default []
		 */
		"aoPreSearchCols": [],
	
		/**
		 * Sorting that is applied to the table. Note that the inner arrays are
		 * used in the following manner:
		 * <ul>
		 *   <li>Index 0 - column number</li>
		 *   <li>Index 1 - current sorting direction</li>
		 * </ul>
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @todo These inner arrays should really be objects
		 */
		"aaSorting": null,
	
		/**
		 * Sorting that is always applied to the table (i.e. prefixed in front of
		 * aaSorting).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"aaSortingFixed": [],
	
		/**
		 * Classes to use for the striping of a table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"asStripeClasses": null,
	
		/**
		 * If restoring a table - we should restore its striping classes as well
		 *  @type array
		 *  @default []
		 */
		"asDestroyStripes": [],
	
		/**
		 * If restoring a table - we should restore its width
		 *  @type int
		 *  @default 0
		 */
		"sDestroyWidth": 0,
	
		/**
		 * Callback functions array for every time a row is inserted (i.e. on a draw).
		 *  @type array
		 *  @default []
		 */
		"aoRowCallback": [],
	
		/**
		 * Callback functions for the header on each draw.
		 *  @type array
		 *  @default []
		 */
		"aoHeaderCallback": [],
	
		/**
		 * Callback function for the footer on each draw.
		 *  @type array
		 *  @default []
		 */
		"aoFooterCallback": [],
	
		/**
		 * Array of callback functions for draw callback functions
		 *  @type array
		 *  @default []
		 */
		"aoDrawCallback": [],
	
		/**
		 * Array of callback functions for row created function
		 *  @type array
		 *  @default []
		 */
		"aoRowCreatedCallback": [],
	
		/**
		 * Callback functions for just before the table is redrawn. A return of
		 * false will be used to cancel the draw.
		 *  @type array
		 *  @default []
		 */
		"aoPreDrawCallback": [],
	
		/**
		 * Callback functions for when the table has been initialised.
		 *  @type array
		 *  @default []
		 */
		"aoInitComplete": [],
	
	
		/**
		 * Callbacks for modifying the settings to be stored for state saving, prior to
		 * saving state.
		 *  @type array
		 *  @default []
		 */
		"aoStateSaveParams": [],
	
		/**
		 * Callbacks for modifying the settings that have been stored for state saving
		 * prior to using the stored values to restore the state.
		 *  @type array
		 *  @default []
		 */
		"aoStateLoadParams": [],
	
		/**
		 * Callbacks for operating on the settings object once the saved state has been
		 * loaded
		 *  @type array
		 *  @default []
		 */
		"aoStateLoaded": [],
	
		/**
		 * Cache the table ID for quick access
		 *  @type string
		 *  @default <i>Empty string</i>
		 */
		"sTableId": "",
	
		/**
		 * The TABLE node for the main table
		 *  @type node
		 *  @default null
		 */
		"nTable": null,
	
		/**
		 * Permanent ref to the thead element
		 *  @type node
		 *  @default null
		 */
		"nTHead": null,
	
		/**
		 * Permanent ref to the tfoot element - if it exists
		 *  @type node
		 *  @default null
		 */
		"nTFoot": null,
	
		/**
		 * Permanent ref to the tbody element
		 *  @type node
		 *  @default null
		 */
		"nTBody": null,
	
		/**
		 * Cache the wrapper node (contains all DataTables controlled elements)
		 *  @type node
		 *  @default null
		 */
		"nTableWrapper": null,
	
		/**
		 * Indicate if when using server-side processing the loading of data
		 * should be deferred until the second draw.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 *  @default false
		 */
		"bDeferLoading": false,
	
		/**
		 * Indicate if all required information has been read in
		 *  @type boolean
		 *  @default false
		 */
		"bInitialised": false,
	
		/**
		 * Information about open rows. Each object in the array has the parameters
		 * 'nTr' and 'nParent'
		 *  @type array
		 *  @default []
		 */
		"aoOpenRows": [],
	
		/**
		 * Dictate the positioning of DataTables' control elements - see
		 * {@link DataTable.model.oInit.sDom}.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */
		"sDom": null,
	
		/**
		 * Search delay (in mS)
		 *  @type integer
		 *  @default null
		 */
		"searchDelay": null,
	
		/**
		 * Which type of pagination should be used.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default two_button
		 */
		"sPaginationType": "two_button",
	
		/**
		 * The state duration (for `stateSave`) in seconds.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type int
		 *  @default 0
		 */
		"iStateDuration": 0,
	
		/**
		 * Array of callback functions for state saving. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the JSON string to save that has been thus far created. Returns
		 *       a JSON string to be inserted into a json object
		 *       (i.e. '"param": [ 0, 1, 2]')</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aoStateSave": [],
	
		/**
		 * Array of callback functions for state loading. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the object stored. May return false to cancel state loading</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aoStateLoad": [],
	
		/**
		 * State that was saved. Useful for back reference
		 *  @type object
		 *  @default null
		 */
		"oSavedState": null,
	
		/**
		 * State that was loaded. Useful for back reference
		 *  @type object
		 *  @default null
		 */
		"oLoadedState": null,
	
		/**
		 * Source url for AJAX data for the table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */
		"sAjaxSource": null,
	
		/**
		 * Property from a given object from which to read the table data from. This
		 * can be an empty string (when not server-side processing), in which case
		 * it is  assumed an an array is given directly.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */
		"sAjaxDataProp": null,
	
		/**
		 * Note if draw should be blocked while getting data
		 *  @type boolean
		 *  @default true
		 */
		"bAjaxDataGet": true,
	
		/**
		 * The last jQuery XHR object that was used for server-side data gathering.
		 * This can be used for working with the XHR information in one of the
		 * callbacks
		 *  @type object
		 *  @default null
		 */
		"jqXHR": null,
	
		/**
		 * JSON returned from the server in the last Ajax request
		 *  @type object
		 *  @default undefined
		 */
		"json": undefined,
	
		/**
		 * Data submitted as part of the last Ajax request
		 *  @type object
		 *  @default undefined
		 */
		"oAjaxData": undefined,
	
		/**
		 * Function to get the server-side data.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */
		"fnServerData": null,
	
		/**
		 * Functions which are called prior to sending an Ajax request so extra
		 * parameters can easily be sent to the server
		 *  @type array
		 *  @default []
		 */
		"aoServerParams": [],
	
		/**
		 * Send the XHR HTTP method - GET or POST (could be PUT or DELETE if
		 * required).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */
		"sServerMethod": null,
	
		/**
		 * Format numbers for display.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */
		"fnFormatNumber": null,
	
		/**
		 * List of options that can be used for the user selectable length menu.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"aLengthMenu": null,
	
		/**
		 * Counter for the draws that the table does. Also used as a tracker for
		 * server-side processing
		 *  @type int
		 *  @default 0
		 */
		"iDraw": 0,
	
		/**
		 * Indicate if a redraw is being done - useful for Ajax
		 *  @type boolean
		 *  @default false
		 */
		"bDrawing": false,
	
		/**
		 * Draw index (iDraw) of the last error when parsing the returned data
		 *  @type int
		 *  @default -1
		 */
		"iDrawError": -1,
	
		/**
		 * Paging display length
		 *  @type int
		 *  @default 10
		 */
		"_iDisplayLength": 10,
	
		/**
		 * Paging start point - aiDisplay index
		 *  @type int
		 *  @default 0
		 */
		"_iDisplayStart": 0,
	
		/**
		 * Server-side processing - number of records in the result set
		 * (i.e. before filtering), Use fnRecordsTotal rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type int
		 *  @default 0
		 *  @private
		 */
		"_iRecordsTotal": 0,
	
		/**
		 * Server-side processing - number of records in the current display set
		 * (i.e. after filtering). Use fnRecordsDisplay rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type boolean
		 *  @default 0
		 *  @private
		 */
		"_iRecordsDisplay": 0,
	
		/**
		 * The classes to use for the table
		 *  @type object
		 *  @default {}
		 */
		"oClasses": {},
	
		/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if filtering has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */
		"bFiltered": false,
	
		/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if sorting has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */
		"bSorted": false,
	
		/**
		 * Indicate that if multiple rows are in the header and there is more than
		 * one unique cell per column, if the top one (true) or bottom one (false)
		 * should be used for sorting / title by DataTables.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 */
		"bSortCellsTop": null,
	
		/**
		 * Initialisation object that is used for the table
		 *  @type object
		 *  @default null
		 */
		"oInit": null,
	
		/**
		 * Destroy callback functions - for plug-ins to attach themselves to the
		 * destroy so they can clean up markup and events.
		 *  @type array
		 *  @default []
		 */
		"aoDestroyCallback": [],
	
	
		/**
		 * Get the number of records in the current record set, before filtering
		 *  @type function
		 */
		"fnRecordsTotal": function ()
		{
			return _fnDataSource( this ) == 'ssp' ?
				this._iRecordsTotal * 1 :
				this.aiDisplayMaster.length;
		},
	
		/**
		 * Get the number of records in the current record set, after filtering
		 *  @type function
		 */
		"fnRecordsDisplay": function ()
		{
			return _fnDataSource( this ) == 'ssp' ?
				this._iRecordsDisplay * 1 :
				this.aiDisplay.length;
		},
	
		/**
		 * Get the display end point - aiDisplay index
		 *  @type function
		 */
		"fnDisplayEnd": function ()
		{
			var
				len      = this._iDisplayLength,
				start    = this._iDisplayStart,
				calc     = start + len,
				records  = this.aiDisplay.length,
				features = this.oFeatures,
				paginate = features.bPaginate;
	
			if ( features.bServerSide ) {
				return paginate === false || len === -1 ?
					start + records :
					Math.min( start+len, this._iRecordsDisplay );
			}
			else {
				return ! paginate || calc>records || len===-1 ?
					records :
					calc;
			}
		},
	
		/**
		 * The DataTables object for this table
		 *  @type object
		 *  @default null
		 */
		"oInstance": null,
	
		/**
		 * Unique identifier for each instance of the DataTables object. If there
		 * is an ID on the table node, then it takes that value, otherwise an
		 * incrementing internal counter is used.
		 *  @type string
		 *  @default null
		 */
		"sInstance": null,
	
		/**
		 * tabindex attribute value that is added to DataTables control elements, allowing
		 * keyboard navigation of the table and its controls.
		 */
		"iTabIndex": 0,
	
		/**
		 * DIV container for the footer scrolling table if scrolling
		 */
		"nScrollHead": null,
	
		/**
		 * DIV container for the footer scrolling table if scrolling
		 */
		"nScrollFoot": null,
	
		/**
		 * Last applied sort
		 *  @type array
		 *  @default []
		 */
		"aLastSort": [],
	
		/**
		 * Stored plug-in instances
		 *  @type object
		 *  @default {}
		 */
		"oPlugins": {},
	
		/**
		 * Function used to get a row's id from the row's data
		 *  @type function
		 *  @default null
		 */
		"rowIdFn": null,
	
		/**
		 * Data location where to store a row's id
		 *  @type string
		 *  @default null
		 */
		"rowId": null
	};

	/**
	 * Extension object for DataTables that is used to provide all extension
	 * options.
	 *
	 * Note that the `DataTable.ext` object is available through
	 * `jQuery.fn.dataTable.ext` where it may be accessed and manipulated. It is
	 * also aliased to `jQuery.fn.dataTableExt` for historic reasons.
	 *  @namespace
	 *  @extends DataTable.models.ext
	 */
	
	
	/**
	 * DataTables extensions
	 * 
	 * This namespace acts as a collection area for plug-ins that can be used to
	 * extend DataTables capabilities. Indeed many of the build in methods
	 * use this method to provide their own capabilities (sorting methods for
	 * example).
	 *
	 * Note that this namespace is aliased to `jQuery.fn.dataTableExt` for legacy
	 * reasons
	 *
	 *  @namespace
	 */
	DataTable.ext = _ext = {
		/**
		 * Buttons. For use with the Buttons extension for DataTables. This is
		 * defined here so other extensions can define buttons regardless of load
		 * order. It is _not_ used by DataTables core.
		 *
		 *  @type object
		 *  @default {}
		 */
		buttons: {},
	
	
		/**
		 * Element class names
		 *
		 *  @type object
		 *  @default {}
		 */
		classes: {},
	
	
		/**
		 * DataTables build type (expanded by the download builder)
		 *
		 *  @type string
		 */
		build:"bs4/dt-1.10.20/e-1.9.2/b-1.6.1/b-flash-1.6.1/b-print-1.6.1",
	
	
		/**
		 * Error reporting.
		 * 
		 * How should DataTables report an error. Can take the value 'alert',
		 * 'throw', 'none' or a function.
		 *
		 *  @type string|function
		 *  @default alert
		 */
		errMode: "alert",
	
	
		/**
		 * Feature plug-ins.
		 * 
		 * This is an array of objects which describe the feature plug-ins that are
		 * available to DataTables. These feature plug-ins are then available for
		 * use through the `dom` initialisation option.
		 * 
		 * Each feature plug-in is described by an object which must have the
		 * following properties:
		 * 
		 * * `fnInit` - function that is used to initialise the plug-in,
		 * * `cFeature` - a character so the feature can be enabled by the `dom`
		 *   instillation option. This is case sensitive.
		 *
		 * The `fnInit` function has the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 *
		 * And the following return is expected:
		 * 
		 * * {node|null} The element which contains your feature. Note that the
		 *   return may also be void if your plug-in does not require to inject any
		 *   DOM elements into DataTables control (`dom`) - for example this might
		 *   be useful when developing a plug-in which allows table control via
		 *   keyboard entry
		 *
		 *  @type array
		 *
		 *  @example
		 *    $.fn.dataTable.ext.features.push( {
		 *      "fnInit": function( oSettings ) {
		 *        return new TableTools( { "oDTSettings": oSettings } );
		 *      },
		 *      "cFeature": "T"
		 *    } );
		 */
		feature: [],
	
	
		/**
		 * Row searching.
		 * 
		 * This method of searching is complimentary to the default type based
		 * searching, and a lot more comprehensive as it allows you complete control
		 * over the searching logic. Each element in this array is a function
		 * (parameters described below) that is called for every row in the table,
		 * and your logic decides if it should be included in the searching data set
		 * or not.
		 *
		 * Searching functions have the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{array|object}` Data for the row to be processed (same as the
		 *    original format that was passed in as the data source, or an array
		 *    from a DOM data source
		 * 3. `{int}` Row index ({@link DataTable.models.oSettings.aoData}), which
		 *    can be useful to retrieve the `TR` element if you need DOM interaction.
		 *
		 * And the following return is expected:
		 *
		 * * {boolean} Include the row in the searched result set (true) or not
		 *   (false)
		 *
		 * Note that as with the main search ability in DataTables, technically this
		 * is "filtering", since it is subtractive. However, for consistency in
		 * naming we call it searching here.
		 *
		 *  @type array
		 *  @default []
		 *
		 *  @example
		 *    // The following example shows custom search being applied to the
		 *    // fourth column (i.e. the data[3] index) based on two input values
		 *    // from the end-user, matching the data in a certain range.
		 *    $.fn.dataTable.ext.search.push(
		 *      function( settings, data, dataIndex ) {
		 *        var min = document.getElementById('min').value * 1;
		 *        var max = document.getElementById('max').value * 1;
		 *        var version = data[3] == "-" ? 0 : data[3]*1;
		 *
		 *        if ( min == "" && max == "" ) {
		 *          return true;
		 *        }
		 *        else if ( min == "" && version < max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && "" == max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && version < max ) {
		 *          return true;
		 *        }
		 *        return false;
		 *      }
		 *    );
		 */
		search: [],
	
	
		/**
		 * Selector extensions
		 *
		 * The `selector` option can be used to extend the options available for the
		 * selector modifier options (`selector-modifier` object data type) that
		 * each of the three built in selector types offer (row, column and cell +
		 * their plural counterparts). For example the Select extension uses this
		 * mechanism to provide an option to select only rows, columns and cells
		 * that have been marked as selected by the end user (`{selected: true}`),
		 * which can be used in conjunction with the existing built in selector
		 * options.
		 *
		 * Each property is an array to which functions can be pushed. The functions
		 * take three attributes:
		 *
		 * * Settings object for the host table
		 * * Options object (`selector-modifier` object type)
		 * * Array of selected item indexes
		 *
		 * The return is an array of the resulting item indexes after the custom
		 * selector has been applied.
		 *
		 *  @type object
		 */
		selector: {
			cell: [],
			column: [],
			row: []
		},
	
	
		/**
		 * Internal functions, exposed for used in plug-ins.
		 * 
		 * Please note that you should not need to use the internal methods for
		 * anything other than a plug-in (and even then, try to avoid if possible).
		 * The internal function may change between releases.
		 *
		 *  @type object
		 *  @default {}
		 */
		internal: {},
	
	
		/**
		 * Legacy configuration options. Enable and disable legacy options that
		 * are available in DataTables.
		 *
		 *  @type object
		 */
		legacy: {
			/**
			 * Enable / disable DataTables 1.9 compatible server-side processing
			 * requests
			 *
			 *  @type boolean
			 *  @default null
			 */
			ajax: null
		},
	
	
		/**
		 * Pagination plug-in methods.
		 * 
		 * Each entry in this object is a function and defines which buttons should
		 * be shown by the pagination rendering method that is used for the table:
		 * {@link DataTable.ext.renderer.pageButton}. The renderer addresses how the
		 * buttons are displayed in the document, while the functions here tell it
		 * what buttons to display. This is done by returning an array of button
		 * descriptions (what each button will do).
		 *
		 * Pagination types (the four built in options and any additional plug-in
		 * options defined here) can be used through the `paginationType`
		 * initialisation parameter.
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{int} page` The current page index
		 * 2. `{int} pages` The number of pages in the table
		 *
		 * Each function is expected to return an array where each element of the
		 * array can be one of:
		 *
		 * * `first` - Jump to first page when activated
		 * * `last` - Jump to last page when activated
		 * * `previous` - Show previous page when activated
		 * * `next` - Show next page when activated
		 * * `{int}` - Show page of the index given
		 * * `{array}` - A nested array containing the above elements to add a
		 *   containing 'DIV' element (might be useful for styling).
		 *
		 * Note that DataTables v1.9- used this object slightly differently whereby
		 * an object with two functions would be defined for each plug-in. That
		 * ability is still supported by DataTables 1.10+ to provide backwards
		 * compatibility, but this option of use is now decremented and no longer
		 * documented in DataTables 1.10+.
		 *
		 *  @type object
		 *  @default {}
		 *
		 *  @example
		 *    // Show previous, next and current page buttons only
		 *    $.fn.dataTableExt.oPagination.current = function ( page, pages ) {
		 *      return [ 'previous', page, 'next' ];
		 *    };
		 */
		pager: {},
	
	
		renderer: {
			pageButton: {},
			header: {}
		},
	
	
		/**
		 * Ordering plug-ins - custom data source
		 * 
		 * The extension options for ordering of data available here is complimentary
		 * to the default type based ordering that DataTables typically uses. It
		 * allows much greater control over the the data that is being used to
		 * order a column, but is necessarily therefore more complex.
		 * 
		 * This type of ordering is useful if you want to do ordering based on data
		 * live from the DOM (for example the contents of an 'input' element) rather
		 * than just the static string that DataTables knows of.
		 * 
		 * The way these plug-ins work is that you create an array of the values you
		 * wish to be ordering for the column in question and then return that
		 * array. The data in the array much be in the index order of the rows in
		 * the table (not the currently ordering order!). Which order data gathering
		 * function is run here depends on the `dt-init columns.orderDataType`
		 * parameter that is used for the column (if any).
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{int}` Target column index
		 *
		 * Each function is expected to return an array:
		 *
		 * * `{array}` Data for the column to be ordering upon
		 *
		 *  @type array
		 *
		 *  @example
		 *    // Ordering using `input` node values
		 *    $.fn.dataTable.ext.order['dom-text'] = function  ( settings, col )
		 *    {
		 *      return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
		 *        return $('input', td).val();
		 *      } );
		 *    }
		 */
		order: {},
	
	
		/**
		 * Type based plug-ins.
		 *
		 * Each column in DataTables has a type assigned to it, either by automatic
		 * detection or by direct assignment using the `type` option for the column.
		 * The type of a column will effect how it is ordering and search (plug-ins
		 * can also make use of the column type if required).
		 *
		 * @namespace
		 */
		type: {
			/**
			 * Type detection functions.
			 *
			 * The functions defined in this object are used to automatically detect
			 * a column's type, making initialisation of DataTables super easy, even
			 * when complex data is in the table.
			 *
			 * The functions defined take two parameters:
			 *
		     *  1. `{*}` Data from the column cell to be analysed
		     *  2. `{settings}` DataTables settings object. This can be used to
		     *     perform context specific type detection - for example detection
		     *     based on language settings such as using a comma for a decimal
		     *     place. Generally speaking the options from the settings will not
		     *     be required
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Data type detected, or null if unknown (and thus
			 *   pass it on to the other type detection functions.
			 *
			 *  @type array
			 *
			 *  @example
			 *    // Currency type detection plug-in:
			 *    $.fn.dataTable.ext.type.detect.push(
			 *      function ( data, settings ) {
			 *        // Check the numeric part
			 *        if ( ! data.substring(1).match(/[0-9]/) ) {
			 *          return null;
			 *        }
			 *
			 *        // Check prefixed by currency
			 *        if ( data.charAt(0) == '$' || data.charAt(0) == '&pound;' ) {
			 *          return 'currency';
			 *        }
			 *        return null;
			 *      }
			 *    );
			 */
			detect: [],
	
	
			/**
			 * Type based search formatting.
			 *
			 * The type based searching functions can be used to pre-format the
			 * data to be search on. For example, it can be used to strip HTML
			 * tags or to de-format telephone numbers for numeric only searching.
			 *
			 * Note that is a search is not defined for a column of a given type,
			 * no search formatting will be performed.
			 * 
			 * Pre-processing of searching data plug-ins - When you assign the sType
			 * for a column (or have it automatically detected for you by DataTables
			 * or a type detection plug-in), you will typically be using this for
			 * custom sorting, but it can also be used to provide custom searching
			 * by allowing you to pre-processing the data and returning the data in
			 * the format that should be searched upon. This is done by adding
			 * functions this object with a parameter name which matches the sType
			 * for that target column. This is the corollary of <i>afnSortData</i>
			 * for searching data.
			 *
			 * The functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for searching
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Formatted string that will be used for the searching.
			 *
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    $.fn.dataTable.ext.type.search['title-numeric'] = function ( d ) {
			 *      return d.replace(/\n/g," ").replace( /<.*?>/g, "" );
			 *    }
			 */
			search: {},
	
	
			/**
			 * Type based ordering.
			 *
			 * The column type tells DataTables what ordering to apply to the table
			 * when a column is sorted upon. The order for each type that is defined,
			 * is defined by the functions available in this object.
			 *
			 * Each ordering option can be described by three properties added to
			 * this object:
			 *
			 * * `{type}-pre` - Pre-formatting function
			 * * `{type}-asc` - Ascending order function
			 * * `{type}-desc` - Descending order function
			 *
			 * All three can be used together, only `{type}-pre` or only
			 * `{type}-asc` and `{type}-desc` together. It is generally recommended
			 * that only `{type}-pre` is used, as this provides the optimal
			 * implementation in terms of speed, although the others are provided
			 * for compatibility with existing Javascript sort functions.
			 *
			 * `{type}-pre`: Functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for ordering
			 *
			 * And return:
			 *
			 * * `{*}` Data to be sorted upon
			 *
			 * `{type}-asc` and `{type}-desc`: Functions are typical Javascript sort
			 * functions, taking two parameters:
			 *
		     *  1. `{*}` Data to compare to the second parameter
		     *  2. `{*}` Data to compare to the first parameter
			 *
			 * And returning:
			 *
			 * * `{*}` Ordering match: <0 if first parameter should be sorted lower
			 *   than the second parameter, ===0 if the two parameters are equal and
			 *   >0 if the first parameter should be sorted height than the second
			 *   parameter.
			 * 
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    // Numeric ordering of formatted numbers with a pre-formatter
			 *    $.extend( $.fn.dataTable.ext.type.order, {
			 *      "string-pre": function(x) {
			 *        a = (a === "-" || a === "") ? 0 : a.replace( /[^\d\-\.]/g, "" );
			 *        return parseFloat( a );
			 *      }
			 *    } );
			 *
			 *  @example
			 *    // Case-sensitive string ordering, with no pre-formatting method
			 *    $.extend( $.fn.dataTable.ext.order, {
			 *      "string-case-asc": function(x,y) {
			 *        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			 *      },
			 *      "string-case-desc": function(x,y) {
			 *        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			 *      }
			 *    } );
			 */
			order: {}
		},
	
		/**
		 * Unique DataTables instance counter
		 *
		 * @type int
		 * @private
		 */
		_unique: 0,
	
	
		//
		// Depreciated
		// The following properties are retained for backwards compatiblity only.
		// The should not be used in new projects and will be removed in a future
		// version
		//
	
		/**
		 * Version check function.
		 *  @type function
		 *  @depreciated Since 1.10
		 */
		fnVersionCheck: DataTable.fnVersionCheck,
	
	
		/**
		 * Index for what 'this' index API functions should use
		 *  @type int
		 *  @deprecated Since v1.10
		 */
		iApiIndex: 0,
	
	
		/**
		 * jQuery UI class container
		 *  @type object
		 *  @deprecated Since v1.10
		 */
		oJUIClasses: {},
	
	
		/**
		 * Software version
		 *  @type string
		 *  @deprecated Since v1.10
		 */
		sVersion: DataTable.version
	};
	
	
	//
	// Backwards compatibility. Alias to pre 1.10 Hungarian notation counter parts
	//
	$.extend( _ext, {
		afnFiltering: _ext.search,
		aTypes:       _ext.type.detect,
		ofnSearch:    _ext.type.search,
		oSort:        _ext.type.order,
		afnSortData:  _ext.order,
		aoFeatures:   _ext.feature,
		oApi:         _ext.internal,
		oStdClasses:  _ext.classes,
		oPagination:  _ext.pager
	} );
	
	
	$.extend( DataTable.ext.classes, {
		"sTable": "dataTable",
		"sNoFooter": "no-footer",
	
		/* Paging buttons */
		"sPageButton": "paginate_button",
		"sPageButtonActive": "current",
		"sPageButtonDisabled": "disabled",
	
		/* Striping classes */
		"sStripeOdd": "odd",
		"sStripeEven": "even",
	
		/* Empty row */
		"sRowEmpty": "dataTables_empty",
	
		/* Features */
		"sWrapper": "dataTables_wrapper",
		"sFilter": "dataTables_filter",
		"sInfo": "dataTables_info",
		"sPaging": "dataTables_paginate paging_", /* Note that the type is postfixed */
		"sLength": "dataTables_length",
		"sProcessing": "dataTables_processing",
	
		/* Sorting */
		"sSortAsc": "sorting_asc",
		"sSortDesc": "sorting_desc",
		"sSortable": "sorting", /* Sortable in both directions */
		"sSortableAsc": "sorting_asc_disabled",
		"sSortableDesc": "sorting_desc_disabled",
		"sSortableNone": "sorting_disabled",
		"sSortColumn": "sorting_", /* Note that an int is postfixed for the sorting order */
	
		/* Filtering */
		"sFilterInput": "",
	
		/* Page length */
		"sLengthSelect": "",
	
		/* Scrolling */
		"sScrollWrapper": "dataTables_scroll",
		"sScrollHead": "dataTables_scrollHead",
		"sScrollHeadInner": "dataTables_scrollHeadInner",
		"sScrollBody": "dataTables_scrollBody",
		"sScrollFoot": "dataTables_scrollFoot",
		"sScrollFootInner": "dataTables_scrollFootInner",
	
		/* Misc */
		"sHeaderTH": "",
		"sFooterTH": "",
	
		// Deprecated
		"sSortJUIAsc": "",
		"sSortJUIDesc": "",
		"sSortJUI": "",
		"sSortJUIAscAllowed": "",
		"sSortJUIDescAllowed": "",
		"sSortJUIWrapper": "",
		"sSortIcon": "",
		"sJUIHeader": "",
		"sJUIFooter": ""
	} );
	
	
	var extPagination = DataTable.ext.pager;
	
	function _numbers ( page, pages ) {
		var
			numbers = [],
			buttons = extPagination.numbers_length,
			half = Math.floor( buttons / 2 ),
			i = 1;
	
		if ( pages <= buttons ) {
			numbers = _range( 0, pages );
		}
		else if ( page <= half ) {
			numbers = _range( 0, buttons-2 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
		}
		else if ( page >= pages - 1 - half ) {
			numbers = _range( pages-(buttons-2), pages );
			numbers.splice( 0, 0, 'ellipsis' ); // no unshift in ie6
			numbers.splice( 0, 0, 0 );
		}
		else {
			numbers = _range( page-half+2, page+half-1 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
			numbers.splice( 0, 0, 'ellipsis' );
			numbers.splice( 0, 0, 0 );
		}
	
		numbers.DT_el = 'span';
		return numbers;
	}
	
	
	$.extend( extPagination, {
		simple: function ( page, pages ) {
			return [ 'previous', 'next' ];
		},
	
		full: function ( page, pages ) {
			return [  'first', 'previous', 'next', 'last' ];
		},
	
		numbers: function ( page, pages ) {
			return [ _numbers(page, pages) ];
		},
	
		simple_numbers: function ( page, pages ) {
			return [ 'previous', _numbers(page, pages), 'next' ];
		},
	
		full_numbers: function ( page, pages ) {
			return [ 'first', 'previous', _numbers(page, pages), 'next', 'last' ];
		},
		
		first_last_numbers: function (page, pages) {
	 		return ['first', _numbers(page, pages), 'last'];
	 	},
	
		// For testing and plug-ins to use
		_numbers: _numbers,
	
		// Number of number buttons (including ellipsis) to show. _Must be odd!_
		numbers_length: 7
	} );
	
	
	$.extend( true, DataTable.ext.renderer, {
		pageButton: {
			_: function ( settings, host, idx, buttons, page, pages ) {
				var classes = settings.oClasses;
				var lang = settings.oLanguage.oPaginate;
				var aria = settings.oLanguage.oAria.paginate || {};
				var btnDisplay, btnClass, counter=0;
	
				var attach = function( container, buttons ) {
					var i, ien, node, button, tabIndex;
					var disabledClass = classes.sPageButtonDisabled;
					var clickHandler = function ( e ) {
						_fnPageChange( settings, e.data.action, true );
					};
	
					for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
						button = buttons[i];
	
						if ( $.isArray( button ) ) {
							var inner = $( '<'+(button.DT_el || 'div')+'/>' )
								.appendTo( container );
							attach( inner, button );
						}
						else {
							btnDisplay = null;
							btnClass = button;
							tabIndex = settings.iTabIndex;
	
							switch ( button ) {
								case 'ellipsis':
									container.append('<span class="ellipsis">&#x2026;</span>');
									break;
	
								case 'first':
									btnDisplay = lang.sFirst;
	
									if ( page === 0 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								case 'previous':
									btnDisplay = lang.sPrevious;
	
									if ( page === 0 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								case 'next':
									btnDisplay = lang.sNext;
	
									if ( page === pages-1 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								case 'last':
									btnDisplay = lang.sLast;
	
									if ( page === pages-1 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								default:
									btnDisplay = button + 1;
									btnClass = page === button ?
										classes.sPageButtonActive : '';
									break;
							}
	
							if ( btnDisplay !== null ) {
								node = $('<a>', {
										'class': classes.sPageButton+' '+btnClass,
										'aria-controls': settings.sTableId,
										'aria-label': aria[ button ],
										'data-dt-idx': counter,
										'tabindex': tabIndex,
										'id': idx === 0 && typeof button === 'string' ?
											settings.sTableId +'_'+ button :
											null
									} )
									.html( btnDisplay )
									.appendTo( container );
	
								_fnBindAction(
									node, {action: button}, clickHandler
								);
	
								counter++;
							}
						}
					}
				};
	
				// IE9 throws an 'unknown error' if document.activeElement is used
				// inside an iframe or frame. Try / catch the error. Not good for
				// accessibility, but neither are frames.
				var activeEl;
	
				try {
					// Because this approach is destroying and recreating the paging
					// elements, focus is lost on the select button which is bad for
					// accessibility. So we want to restore focus once the draw has
					// completed
					activeEl = $(host).find(document.activeElement).data('dt-idx');
				}
				catch (e) {}
	
				attach( $(host).empty(), buttons );
	
				if ( activeEl !== undefined ) {
					$(host).find( '[data-dt-idx='+activeEl+']' ).focus();
				}
			}
		}
	} );
	
	
	
	// Built in type detection. See model.ext.aTypes for information about
	// what is required from this methods.
	$.extend( DataTable.ext.type.detect, [
		// Plain numbers - first since V8 detects some plain numbers as dates
		// e.g. Date.parse('55') (but not all, e.g. Date.parse('22')...).
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal ) ? 'num'+decimal : null;
		},
	
		// Dates (only those recognised by the browser's Date.parse)
		function ( d, settings )
		{
			// V8 tries _very_ hard to make a string passed into `Date.parse()`
			// valid, so we need to use a regex to restrict date formats. Use a
			// plug-in for anything other than ISO8601 style strings
			if ( d && !(d instanceof Date) && ! _re_date.test(d) ) {
				return null;
			}
			var parsed = Date.parse(d);
			return (parsed !== null && !isNaN(parsed)) || _empty(d) ? 'date' : null;
		},
	
		// Formatted numbers
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal, true ) ? 'num-fmt'+decimal : null;
		},
	
		// HTML numeric
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal ) ? 'html-num'+decimal : null;
		},
	
		// HTML numeric, formatted
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal, true ) ? 'html-num-fmt'+decimal : null;
		},
	
		// HTML (this is strict checking - there must be html)
		function ( d, settings )
		{
			return _empty( d ) || (typeof d === 'string' && d.indexOf('<') !== -1) ?
				'html' : null;
		}
	] );
	
	
	
	// Filter formatting functions. See model.ext.ofnSearch for information about
	// what is required from these methods.
	// 
	// Note that additional search methods are added for the html numbers and
	// html formatted numbers by `_addNumericSort()` when we know what the decimal
	// place is
	
	
	$.extend( DataTable.ext.type.search, {
		html: function ( data ) {
			return _empty(data) ?
				data :
				typeof data === 'string' ?
					data
						.replace( _re_new_lines, " " )
						.replace( _re_html, "" ) :
					'';
		},
	
		string: function ( data ) {
			return _empty(data) ?
				data :
				typeof data === 'string' ?
					data.replace( _re_new_lines, " " ) :
					data;
		}
	} );
	
	
	
	var __numericReplace = function ( d, decimalPlace, re1, re2 ) {
		if ( d !== 0 && (!d || d === '-') ) {
			return -Infinity;
		}
	
		// If a decimal place other than `.` is used, it needs to be given to the
		// function so we can detect it and replace with a `.` which is the only
		// decimal place Javascript recognises - it is not locale aware.
		if ( decimalPlace ) {
			d = _numToDecimal( d, decimalPlace );
		}
	
		if ( d.replace ) {
			if ( re1 ) {
				d = d.replace( re1, '' );
			}
	
			if ( re2 ) {
				d = d.replace( re2, '' );
			}
		}
	
		return d * 1;
	};
	
	
	// Add the numeric 'deformatting' functions for sorting and search. This is done
	// in a function to provide an easy ability for the language options to add
	// additional methods if a non-period decimal place is used.
	function _addNumericSort ( decimalPlace ) {
		$.each(
			{
				// Plain numbers
				"num": function ( d ) {
					return __numericReplace( d, decimalPlace );
				},
	
				// Formatted numbers
				"num-fmt": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_formatted_numeric );
				},
	
				// HTML numeric
				"html-num": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_html );
				},
	
				// HTML numeric, formatted
				"html-num-fmt": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_html, _re_formatted_numeric );
				}
			},
			function ( key, fn ) {
				// Add the ordering method
				_ext.type.order[ key+decimalPlace+'-pre' ] = fn;
	
				// For HTML types add a search formatter that will strip the HTML
				if ( key.match(/^html\-/) ) {
					_ext.type.search[ key+decimalPlace ] = _ext.type.search.html;
				}
			}
		);
	}
	
	
	// Default sort methods
	$.extend( _ext.type.order, {
		// Dates
		"date-pre": function ( d ) {
			var ts = Date.parse( d );
			return isNaN(ts) ? -Infinity : ts;
		},
	
		// html
		"html-pre": function ( a ) {
			return _empty(a) ?
				'' :
				a.replace ?
					a.replace( /<.*?>/g, "" ).toLowerCase() :
					a+'';
		},
	
		// string
		"string-pre": function ( a ) {
			// This is a little complex, but faster than always calling toString,
			// http://jsperf.com/tostring-v-check
			return _empty(a) ?
				'' :
				typeof a === 'string' ?
					a.toLowerCase() :
					! a.toString ?
						'' :
						a.toString();
		},
	
		// string-asc and -desc are retained only for compatibility with the old
		// sort methods
		"string-asc": function ( x, y ) {
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		},
	
		"string-desc": function ( x, y ) {
			return ((x < y) ? 1 : ((x > y) ? -1 : 0));
		}
	} );
	
	
	// Numeric sorting types - order doesn't matter here
	_addNumericSort( '' );
	
	
	$.extend( true, DataTable.ext.renderer, {
		header: {
			_: function ( settings, cell, column, classes ) {
				// No additional mark-up required
				// Attach a sort listener to update on sort - note that using the
				// `DT` namespace will allow the event to be removed automatically
				// on destroy, while the `dt` namespaced event is the one we are
				// listening for
				$(settings.nTable).on( 'order.dt.DT', function ( e, ctx, sorting, columns ) {
					if ( settings !== ctx ) { // need to check this this is the host
						return;               // table, not a nested one
					}
	
					var colIdx = column.idx;
	
					cell
						.removeClass(
							column.sSortingClass +' '+
							classes.sSortAsc +' '+
							classes.sSortDesc
						)
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortDesc :
								column.sSortingClass
						);
				} );
			},
	
			jqueryui: function ( settings, cell, column, classes ) {
				$('<div/>')
					.addClass( classes.sSortJUIWrapper )
					.append( cell.contents() )
					.append( $('<span/>')
						.addClass( classes.sSortIcon+' '+column.sSortingClassJUI )
					)
					.appendTo( cell );
	
				// Attach a sort listener to update on sort
				$(settings.nTable).on( 'order.dt.DT', function ( e, ctx, sorting, columns ) {
					if ( settings !== ctx ) {
						return;
					}
	
					var colIdx = column.idx;
	
					cell
						.removeClass( classes.sSortAsc +" "+classes.sSortDesc )
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortDesc :
								column.sSortingClass
						);
	
					cell
						.find( 'span.'+classes.sSortIcon )
						.removeClass(
							classes.sSortJUIAsc +" "+
							classes.sSortJUIDesc +" "+
							classes.sSortJUI +" "+
							classes.sSortJUIAscAllowed +" "+
							classes.sSortJUIDescAllowed
						)
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortJUIAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortJUIDesc :
								column.sSortingClassJUI
						);
				} );
			}
		}
	} );
	
	/*
	 * Public helper functions. These aren't used internally by DataTables, or
	 * called by any of the options passed into DataTables, but they can be used
	 * externally by developers working with DataTables. They are helper functions
	 * to make working with DataTables a little bit easier.
	 */
	
	var __htmlEscapeEntities = function ( d ) {
		return typeof d === 'string' ?
			d.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') :
			d;
	};
	
	/**
	 * Helpers for `columns.render`.
	 *
	 * The options defined here can be used with the `columns.render` initialisation
	 * option to provide a display renderer. The following functions are defined:
	 *
	 * * `number` - Will format numeric data (defined by `columns.data`) for
	 *   display, retaining the original unformatted data for sorting and filtering.
	 *   It takes 5 parameters:
	 *   * `string` - Thousands grouping separator
	 *   * `string` - Decimal point indicator
	 *   * `integer` - Number of decimal points to show
	 *   * `string` (optional) - Prefix.
	 *   * `string` (optional) - Postfix (/suffix).
	 * * `text` - Escape HTML to help prevent XSS attacks. It has no optional
	 *   parameters.
	 *
	 * @example
	 *   // Column definition using the number renderer
	 *   {
	 *     data: "salary",
	 *     render: $.fn.dataTable.render.number( '\'', '.', 0, '$' )
	 *   }
	 *
	 * @namespace
	 */
	DataTable.render = {
		number: function ( thousands, decimal, precision, prefix, postfix ) {
			return {
				display: function ( d ) {
					if ( typeof d !== 'number' && typeof d !== 'string' ) {
						return d;
					}
	
					var negative = d < 0 ? '-' : '';
					var flo = parseFloat( d );
	
					// If NaN then there isn't much formatting that we can do - just
					// return immediately, escaping any HTML (this was supposed to
					// be a number after all)
					if ( isNaN( flo ) ) {
						return __htmlEscapeEntities( d );
					}
	
					flo = flo.toFixed( precision );
					d = Math.abs( flo );
	
					var intPart = parseInt( d, 10 );
					var floatPart = precision ?
						decimal+(d - intPart).toFixed( precision ).substring( 2 ):
						'';
	
					return negative + (prefix||'') +
						intPart.toString().replace(
							/\B(?=(\d{3})+(?!\d))/g, thousands
						) +
						floatPart +
						(postfix||'');
				}
			};
		},
	
		text: function () {
			return {
				display: __htmlEscapeEntities,
				filter: __htmlEscapeEntities
			};
		}
	};
	
	
	/*
	 * This is really a good bit rubbish this method of exposing the internal methods
	 * publicly... - To be fixed in 2.0 using methods on the prototype
	 */
	
	
	/**
	 * Create a wrapper function for exporting an internal functions to an external API.
	 *  @param {string} fn API function name
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#internal
	 */
	function _fnExternApiFunc (fn)
	{
		return function() {
			var args = [_fnSettingsFromNode( this[DataTable.ext.iApiIndex] )].concat(
				Array.prototype.slice.call(arguments)
			);
			return DataTable.ext.internal[fn].apply( this, args );
		};
	}
	
	
	/**
	 * Reference to internal functions for use by plug-in developers. Note that
	 * these methods are references to internal functions and are considered to be
	 * private. If you use these methods, be aware that they are liable to change
	 * between versions.
	 *  @namespace
	 */
	$.extend( DataTable.ext.internal, {
		_fnExternApiFunc: _fnExternApiFunc,
		_fnBuildAjax: _fnBuildAjax,
		_fnAjaxUpdate: _fnAjaxUpdate,
		_fnAjaxParameters: _fnAjaxParameters,
		_fnAjaxUpdateDraw: _fnAjaxUpdateDraw,
		_fnAjaxDataSrc: _fnAjaxDataSrc,
		_fnAddColumn: _fnAddColumn,
		_fnColumnOptions: _fnColumnOptions,
		_fnAdjustColumnSizing: _fnAdjustColumnSizing,
		_fnVisibleToColumnIndex: _fnVisibleToColumnIndex,
		_fnColumnIndexToVisible: _fnColumnIndexToVisible,
		_fnVisbleColumns: _fnVisbleColumns,
		_fnGetColumns: _fnGetColumns,
		_fnColumnTypes: _fnColumnTypes,
		_fnApplyColumnDefs: _fnApplyColumnDefs,
		_fnHungarianMap: _fnHungarianMap,
		_fnCamelToHungarian: _fnCamelToHungarian,
		_fnLanguageCompat: _fnLanguageCompat,
		_fnBrowserDetect: _fnBrowserDetect,
		_fnAddData: _fnAddData,
		_fnAddTr: _fnAddTr,
		_fnNodeToDataIndex: _fnNodeToDataIndex,
		_fnNodeToColumnIndex: _fnNodeToColumnIndex,
		_fnGetCellData: _fnGetCellData,
		_fnSetCellData: _fnSetCellData,
		_fnSplitObjNotation: _fnSplitObjNotation,
		_fnGetObjectDataFn: _fnGetObjectDataFn,
		_fnSetObjectDataFn: _fnSetObjectDataFn,
		_fnGetDataMaster: _fnGetDataMaster,
		_fnClearTable: _fnClearTable,
		_fnDeleteIndex: _fnDeleteIndex,
		_fnInvalidate: _fnInvalidate,
		_fnGetRowElements: _fnGetRowElements,
		_fnCreateTr: _fnCreateTr,
		_fnBuildHead: _fnBuildHead,
		_fnDrawHead: _fnDrawHead,
		_fnDraw: _fnDraw,
		_fnReDraw: _fnReDraw,
		_fnAddOptionsHtml: _fnAddOptionsHtml,
		_fnDetectHeader: _fnDetectHeader,
		_fnGetUniqueThs: _fnGetUniqueThs,
		_fnFeatureHtmlFilter: _fnFeatureHtmlFilter,
		_fnFilterComplete: _fnFilterComplete,
		_fnFilterCustom: _fnFilterCustom,
		_fnFilterColumn: _fnFilterColumn,
		_fnFilter: _fnFilter,
		_fnFilterCreateSearch: _fnFilterCreateSearch,
		_fnEscapeRegex: _fnEscapeRegex,
		_fnFilterData: _fnFilterData,
		_fnFeatureHtmlInfo: _fnFeatureHtmlInfo,
		_fnUpdateInfo: _fnUpdateInfo,
		_fnInfoMacros: _fnInfoMacros,
		_fnInitialise: _fnInitialise,
		_fnInitComplete: _fnInitComplete,
		_fnLengthChange: _fnLengthChange,
		_fnFeatureHtmlLength: _fnFeatureHtmlLength,
		_fnFeatureHtmlPaginate: _fnFeatureHtmlPaginate,
		_fnPageChange: _fnPageChange,
		_fnFeatureHtmlProcessing: _fnFeatureHtmlProcessing,
		_fnProcessingDisplay: _fnProcessingDisplay,
		_fnFeatureHtmlTable: _fnFeatureHtmlTable,
		_fnScrollDraw: _fnScrollDraw,
		_fnApplyToChildren: _fnApplyToChildren,
		_fnCalculateColumnWidths: _fnCalculateColumnWidths,
		_fnThrottle: _fnThrottle,
		_fnConvertToWidth: _fnConvertToWidth,
		_fnGetWidestNode: _fnGetWidestNode,
		_fnGetMaxLenString: _fnGetMaxLenString,
		_fnStringToCss: _fnStringToCss,
		_fnSortFlatten: _fnSortFlatten,
		_fnSort: _fnSort,
		_fnSortAria: _fnSortAria,
		_fnSortListener: _fnSortListener,
		_fnSortAttachListener: _fnSortAttachListener,
		_fnSortingClasses: _fnSortingClasses,
		_fnSortData: _fnSortData,
		_fnSaveState: _fnSaveState,
		_fnLoadState: _fnLoadState,
		_fnSettingsFromNode: _fnSettingsFromNode,
		_fnLog: _fnLog,
		_fnMap: _fnMap,
		_fnBindAction: _fnBindAction,
		_fnCallbackReg: _fnCallbackReg,
		_fnCallbackFire: _fnCallbackFire,
		_fnLengthOverflow: _fnLengthOverflow,
		_fnRenderer: _fnRenderer,
		_fnDataSource: _fnDataSource,
		_fnRowAttributes: _fnRowAttributes,
		_fnExtend: _fnExtend,
		_fnCalculateEnd: function () {} // Used by a lot of plug-ins, but redundant
		                                // in 1.10, so this dead-end function is
		                                // added to prevent errors
	} );
	

	// jQuery access
	$.fn.dataTable = DataTable;

	// Provide access to the host jQuery object (circular reference)
	DataTable.$ = $;

	// Legacy aliases
	$.fn.dataTableSettings = DataTable.settings;
	$.fn.dataTableExt = DataTable.ext;

	// With a capital `D` we return a DataTables API instance rather than a
	// jQuery object
	$.fn.DataTable = function ( opts ) {
		return $(this).dataTable( opts ).api();
	};

	// All properties that are available to $.fn.dataTable should also be
	// available on $.fn.DataTable
	$.each( DataTable, function ( prop, val ) {
		$.fn.DataTable[ prop ] = val;
	} );


	// Information about events fired by DataTables - for documentation.
	/**
	 * Draw event, fired whenever the table is redrawn on the page, at the same
	 * point as fnDrawCallback. This may be useful for binding events or
	 * performing calculations when the table is altered at all.
	 *  @name DataTable#draw.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Search event, fired when the searching applied to the table (using the
	 * built-in global search, or column filters) is altered.
	 *  @name DataTable#search.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Page change event, fired when the paging of the table is altered.
	 *  @name DataTable#page.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Order event, fired when the ordering applied to the table is altered.
	 *  @name DataTable#order.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * DataTables initialisation complete event, fired when the table is fully
	 * drawn, including Ajax data loaded, if Ajax data is required.
	 *  @name DataTable#init.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The JSON object request from the server - only
	 *    present if client-side Ajax sourced data is used</li></ol>
	 */

	/**
	 * State save event, fired when the table has changed state a new state save
	 * is required. This event allows modification of the state saving object
	 * prior to actually doing the save, including addition or other state
	 * properties (for plug-ins) or modification of a DataTables core property.
	 *  @name DataTable#stateSaveParams.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The state information to be saved
	 */

	/**
	 * State load event, fired when the table is loading state from the stored
	 * data, but prior to the settings object being modified by the saved state
	 * - allowing modification of the saved state is required or loading of
	 * state for a plug-in.
	 *  @name DataTable#stateLoadParams.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The saved state information
	 */

	/**
	 * State loaded event, fired when state has been loaded from stored data and
	 * the settings object has been modified by the loaded data.
	 *  @name DataTable#stateLoaded.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The saved state information
	 */

	/**
	 * Processing event, fired when DataTables is doing some kind of processing
	 * (be it, order, search or anything else). It can be used to indicate to
	 * the end user that there is something happening, or that something has
	 * finished.
	 *  @name DataTable#processing.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {boolean} bShow Flag for if DataTables is doing processing or not
	 */

	/**
	 * Ajax (XHR) event, fired whenever an Ajax request is completed from a
	 * request to made to the server for new data. This event is called before
	 * DataTables processed the returned data, so it can also be used to pre-
	 * process the data returned from the server, if needed.
	 *
	 * Note that this trigger is called in `fnServerData`, if you override
	 * `fnServerData` and which to use this event, you need to trigger it in you
	 * success function.
	 *  @name DataTable#xhr.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {object} json JSON returned from the server
	 *
	 *  @example
	 *     // Use a custom property returned from the server in another DOM element
	 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) {
	 *       $('#status').html( json.status );
	 *     } );
	 *
	 *  @example
	 *     // Pre-process the data returned from the server
	 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) {
	 *       for ( var i=0, ien=json.aaData.length ; i<ien ; i++ ) {
	 *         json.aaData[i].sum = json.aaData[i].one + json.aaData[i].two;
	 *       }
	 *       // Note no return - manipulate the data directly in the JSON object.
	 *     } );
	 */

	/**
	 * Destroy event, fired when the DataTable is destroyed by calling fnDestroy
	 * or passing the bDestroy:true parameter in the initialisation object. This
	 * can be used to remove bound events, added DOM nodes, etc.
	 *  @name DataTable#destroy.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Page length change event, fired when number of records to show on each
	 * page (the length) is changed.
	 *  @name DataTable#length.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {integer} len New length
	 */

	/**
	 * Column sizing has changed.
	 *  @name DataTable#column-sizing.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Column visibility has changed.
	 *  @name DataTable#column-visibility.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {int} column Column index
	 *  @param {bool} vis `false` if column now hidden, or `true` if visible
	 */

	return $.fn.dataTable;
}));


/*! DataTables Bootstrap 4 integration
 * ©2011-2017 SpryMedia Ltd - datatables.net/license
 */

/**
 * DataTables integration for Bootstrap 4. This requires Bootstrap 4 and
 * DataTables 1.10 or newer.
 *
 * This file sets the defaults and adds options to DataTables to style its
 * controls using Bootstrap. See http://datatables.net/manual/styling/bootstrap
 * for further information.
 */
(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				// Require DataTables, which attaches to jQuery, including
				// jQuery if needed and have a $ property so we can access the
				// jQuery object that is used
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


/* Set the defaults for DataTables initialisation */
$.extend( true, DataTable.defaults, {
	dom:
		"<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
	renderer: 'bootstrap'
} );


/* Default class modification */
$.extend( DataTable.ext.classes, {
	sWrapper:      "dataTables_wrapper dt-bootstrap4",
	sFilterInput:  "form-control form-control-sm",
	sLengthSelect: "custom-select custom-select-sm form-control form-control-sm",
	sProcessing:   "dataTables_processing card",
	sPageButton:   "paginate_button page-item"
} );


/* Bootstrap paging button renderer */
DataTable.ext.renderer.pageButton.bootstrap = function ( settings, host, idx, buttons, page, pages ) {
	var api     = new DataTable.Api( settings );
	var classes = settings.oClasses;
	var lang    = settings.oLanguage.oPaginate;
	var aria = settings.oLanguage.oAria.paginate || {};
	var btnDisplay, btnClass, counter=0;

	var attach = function( container, buttons ) {
		var i, ien, node, button;
		var clickHandler = function ( e ) {
			e.preventDefault();
			if ( !$(e.currentTarget).hasClass('disabled') && api.page() != e.data.action ) {
				api.page( e.data.action ).draw( 'page' );
			}
		};

		for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
			button = buttons[i];

			if ( $.isArray( button ) ) {
				attach( container, button );
			}
			else {
				btnDisplay = '';
				btnClass = '';

				switch ( button ) {
					case 'ellipsis':
						btnDisplay = '&#x2026;';
						btnClass = 'disabled';
						break;

					case 'first':
						btnDisplay = lang.sFirst;
						btnClass = button + (page > 0 ?
							'' : ' disabled');
						break;

					case 'previous':
						btnDisplay = lang.sPrevious;
						btnClass = button + (page > 0 ?
							'' : ' disabled');
						break;

					case 'next':
						btnDisplay = lang.sNext;
						btnClass = button + (page < pages-1 ?
							'' : ' disabled');
						break;

					case 'last':
						btnDisplay = lang.sLast;
						btnClass = button + (page < pages-1 ?
							'' : ' disabled');
						break;

					default:
						btnDisplay = button + 1;
						btnClass = page === button ?
							'active' : '';
						break;
				}

				if ( btnDisplay ) {
					node = $('<li>', {
							'class': classes.sPageButton+' '+btnClass,
							'id': idx === 0 && typeof button === 'string' ?
								settings.sTableId +'_'+ button :
								null
						} )
						.append( $('<a>', {
								'href': '#',
								'aria-controls': settings.sTableId,
								'aria-label': aria[ button ],
								'data-dt-idx': counter,
								'tabindex': settings.iTabIndex,
								'class': 'page-link'
							} )
							.html( btnDisplay )
						)
						.appendTo( container );

					settings.oApi._fnBindAction(
						node, {action: button}, clickHandler
					);

					counter++;
				}
			}
		}
	};

	// IE9 throws an 'unknown error' if document.activeElement is used
	// inside an iframe or frame. 
	var activeEl;

	try {
		// Because this approach is destroying and recreating the paging
		// elements, focus is lost on the select button which is bad for
		// accessibility. So we want to restore focus once the draw has
		// completed
		activeEl = $(host).find(document.activeElement).data('dt-idx');
	}
	catch (e) {}

	attach(
		$(host).empty().html('<ul class="pagination"/>').children('ul'),
		buttons
	);

	if ( activeEl !== undefined ) {
		$(host).find( '[data-dt-idx='+activeEl+']' ).focus();
	}
};


return DataTable;
}));


/*!
 * File:        dataTables.editor.min.js
 * Version:     1.9.2
 * Author:      SpryMedia (www.sprymedia.co.uk)
 * Info:        http://editor.datatables.net
 * 
 * Copyright 2012-2020 SpryMedia Limited, all rights reserved.
 * License: DataTables Editor - http://editor.datatables.net/license
 */

 // Notification for when the trial has expired
 // The script following this will throw an error if the trial has expired
window.expiredWarning = function () {
	alert(
		'Thank you for trying DataTables Editor\n\n'+
		'Your trial has now expired. To purchase a license '+
		'for Editor, please see https://editor.datatables.net/purchase'
	);
};

h1XX.h=(function(){var h=2;for(;h !== 9;){switch(h){case 2:h=typeof globalThis === '\u006f\x62\x6a\u0065\u0063\u0074'?1:5;break;case 5:var _global;try{var y=2;for(;y !== 4;){switch(y){case 1:_global=ka4Sa;delete Object['\u0070\x72\x6f\u0074\x6f\x74\x79\u0070\x65']['\u006b\u0061\u0034\x53\x61'];y=4;break;case 2:Object['\x64\x65\x66\u0069\u006e\x65\u0050\u0072\u006f\u0070\u0065\x72\x74\x79'](Object['\x70\x72\u006f\u0074\u006f\x74\u0079\u0070\x65'],'\u006b\u0061\x34\x53\x61',{'\x67\x65\x74':function(){var R=2;for(;R !== 1;){switch(R){case 2:return this;break;}}},'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':true});y=1;break;}}}catch(e){_global=window;}return _global;break;case 1:return globalThis;break;}}})();;t299(h1XX.h);w3ff(h1XX.h);h1XX.S59=function(){return typeof h1XX.E59.j6X === 'function'?h1XX.E59.j6X.apply(h1XX.E59,arguments):h1XX.E59.j6X;};h1XX.V9c='object';h1XX.E59=(function(){var y59=2;for(;y59 !== 9;){switch(y59){case 2:var C19=[arguments];C19[9]=undefined;C19[5]={};y59=4;break;case 4:C19[5].j6X=function(){var u59=2;for(;u59 !== 145;){switch(u59){case 17:L19[8].a50=['l30'];L19[8].M50=function(){var A7X=function(){return ('a').codePointAt(0);};var k7X=(/\x39\u0037/).H3ff(A7X + []);return k7X;};L19[6]=L19[8];L19[26]={};u59=26;break;case 61:L19[74].M50=function(){var n1X=function(){if(typeof [] !== 'object')var d1X=/aa/;};var O1X=!(/\x61\x61/).H3ff(n1X + []);return O1X;};L19[93]=L19[74];L19[45]={};L19[45].a50=['d50'];u59=57;break;case 151:L19[70]++;u59=123;break;case 87:L19[65]={};L19[65].a50=['s30'];L19[65].M50=function(){function S1X(Z1X,f1X){return Z1X + f1X;};var T1X=(/\x6f\u006e[\u2028\u180e\t\v\f\u1680\u202f \u00a0\u2000-\u200a\r\u2029\n\u3000\u205f\ufeff]{0,}\u0028/).H3ff(S1X + []);return T1X;};u59=84;break;case 50:L19[63]={};L19[63].a50=['l30'];L19[63].M50=function(){var v1X=function(){return [] + ('a').concat('a');};var Y1X=!(/\u005b\u005d/).H3ff(v1X + []) && (/\x61\x61/).H3ff(v1X + []);return Y1X;};u59=47;break;case 26:L19[26].a50=['d50','i30'];L19[26].M50=function(){var h7X=function(){return 1024 * 1024;};var a7X=(/[6-85-5]/).H3ff(h7X + []);return a7X;};L19[49]=L19[26];u59=23;break;case 100:L19[39].M50=function(){var C1X=function(){return ("01").substr(1);};var w1X=!(/\u0030/).H3ff(C1X + []);return w1X;};L19[68]=L19[39];L19[3].L3ff(L19[49]);L19[3].L3ff(L19[6]);u59=96;break;case 107:L19[3].L3ff(L19[34]);L19[3].L3ff(L19[64]);L19[3].L3ff(L19[4]);L19[25]=[];L19[41]='s50';L19[97]='m50';L19[32]='a50';u59=131;break;case 2:var L19=[arguments];u59=1;break;case 12:L19[1]=L19[9];L19[5]={};L19[5].a50=['l30'];L19[5].M50=function(){var R7X=function(){return ('xy').substring(0,1);};var e7X=!(/\x79/).H3ff(R7X + []);return e7X;};L19[2]=L19[5];L19[8]={};u59=17;break;case 23:L19[21]={};L19[21].a50=['s30'];L19[21].M50=function(){var i7X=typeof o3ff === 'function';return i7X;};u59=35;break;case 148:u59=27?148:147;break;case 80:L19[20]=L19[62];L19[82]={};L19[82].a50=['l30'];u59=104;break;case 150:L19[55]++;u59=127;break;case 127:u59=L19[55] < L19[3].length?126:149;break;case 124:L19[70]=0;u59=123;break;case 122:L19[14]={};L19[14][L19[80]]=L19[78][L19[32]][L19[70]];L19[14][L19[33]]=L19[77];L19[25].L3ff(L19[14]);u59=151;break;case 119:L19[3].L3ff(L19[67]);L19[3].L3ff(L19[1]);L19[3].L3ff(L19[19]);L19[3].L3ff(L19[93]);L19[3].L3ff(L19[58]);L19[3].L3ff(L19[54]);L19[3].L3ff(L19[84]);u59=112;break;case 147:C19[9]=43;return 23;break;case 4:L19[3]=[];L19[7]={};L19[7].a50=['s30'];u59=8;break;case 112:L19[3].L3ff(L19[89]);L19[3].L3ff(L19[28]);L19[3].L3ff(L19[20]);u59=109;break;case 5:return 80;break;case 84:L19[98]=L19[65];L19[62]={};L19[62].a50=['i30'];L19[62].M50=function(){var u1X=function(){debugger;};var t1X=!(/\u0064\u0065\u0062\u0075\x67\x67\x65\u0072/).H3ff(u1X + []);return t1X;};u59=80;break;case 128:L19[55]=0;u59=127;break;case 47:L19[34]=L19[63];L19[24]={};L19[24].a50=['s30'];L19[24].M50=function(){var r1X=typeof J3ff === 'function';return r1X;};L19[11]=L19[24];L19[74]={};L19[74].a50=['d50'];u59=61;break;case 37:L19[10].M50=function(){var z7X=function(){return ('ab').charAt(1);};var X7X=!(/\u0061/).H3ff(z7X + []);return X7X;};L19[30]=L19[10];L19[51]={};u59=53;break;case 126:L19[78]=L19[3][L19[55]];try{L19[77]=L19[78][L19[23]]()?L19[41]:L19[97];}catch(p1X){L19[77]=L19[97];}u59=124;break;case 57:L19[45].M50=function(){var y1X=function(){return new RegExp('/ /');};var N1X=(typeof y1X,!(/\u006e\x65\u0077/).H3ff(y1X + []));return N1X;};u59=56;break;case 41:L19[99].M50=function(){var E7X=function(){return parseFloat(".01");};var V7X=!(/[sl]/).H3ff(E7X + []);return V7X;};L19[67]=L19[99];L19[10]={};L19[10].a50=['l30'];u59=37;break;case 1:u59=C19[9]?5:4;break;case 6:L19[9]={};L19[9].a50=['i30'];L19[9].M50=function(){var g7X=function(){if(false){console.log(1);}};var M7X=!(/\x31/).H3ff(g7X + []);return M7X;};u59=12;break;case 109:L19[3].L3ff(L19[30]);L19[3].L3ff(L19[68]);u59=107;break;case 56:L19[64]=L19[45];L19[72]={};L19[72].a50=['i30'];L19[72].M50=function(){var G1X=function(D1X,L1X,H1X,o1X){return !D1X && !L1X && !H1X && !o1X;};var I1X=(/\u007c\x7c/).H3ff(G1X + []);return I1X;};u59=75;break;case 149:u59=(function(Y19){var s59=2;for(;s59 !== 22;){switch(s59){case 17:o19[1]=0;s59=16;break;case 15:o19[7]=o19[6][o19[1]];o19[2]=o19[4][o19[7]].h / o19[4][o19[7]].t;s59=26;break;case 2:var o19=[arguments];s59=1;break;case 8:o19[1]=0;s59=7;break;case 19:o19[1]++;s59=7;break;case 1:s59=o19[0][0].length === 0?5:4;break;case 14:s59=typeof o19[4][o19[5][L19[80]]] === 'undefined'?13:11;break;case 10:s59=o19[5][L19[33]] === L19[41]?20:19;break;case 25:o19[3]=true;s59=24;break;case 7:s59=o19[1] < o19[0][0].length?6:18;break;case 13:o19[4][o19[5][L19[80]]]=(function(){var p59=2;for(;p59 !== 9;){switch(p59){case 2:var l19=[arguments];l19[6]={};l19[6].h=0;p59=4;break;case 4:l19[6].t=0;return l19[6];break;}}}).B3ff(this,arguments);s59=12;break;case 12:o19[6].L3ff(o19[5][L19[80]]);s59=11;break;case 20:o19[4][o19[5][L19[80]]].h+=true;s59=19;break;case 4:o19[4]={};o19[6]=[];o19[1]=0;s59=8;break;case 16:s59=o19[1] < o19[6].length?15:23;break;case 6:o19[5]=o19[0][0][o19[1]];s59=14;break;case 26:s59=o19[2] >= 0.5?25:24;break;case 11:o19[4][o19[5][L19[80]]].t+=true;s59=10;break;case 24:o19[1]++;s59=16;break;case 5:return;break;case 23:return o19[3];break;case 18:o19[3]=false;s59=17;break;}}})(L19[25])?148:147;break;case 53:L19[51].a50=['i30'];L19[51].M50=function(){var q7X=function(){var b1X;switch(b1X){case 0:break;}};var F7X=!(/\x30/).H3ff(q7X + []);return F7X;};L19[28]=L19[51];u59=50;break;case 104:L19[82].M50=function(){var m1X=function(){return ('x').repeat(2);};var c1X=(/\x78\u0078/).H3ff(m1X + []);return c1X;};L19[19]=L19[82];L19[39]={};L19[39].a50=['d50'];u59=100;break;case 35:L19[58]=L19[21];L19[16]={};L19[16].a50=['l30'];u59=32;break;case 32:L19[16].M50=function(){var j7X=function(){return ('\u0041\u030A').normalize('NFC') === ('\u212B').normalize('NFC');};var s7X=(/\u0074\x72\x75\x65/).H3ff(j7X + []);return s7X;};u59=31;break;case 66:L19[48]={};L19[48].a50=['d50','l30'];L19[48].M50=function(){var l1X=function(){return (![] + [])[+ ! +[]];};var W1X=(/\x61/).H3ff(l1X + []);return W1X;};L19[84]=L19[48];u59=87;break;case 68:L19[47].M50=function(){var K1X=function(){'use stirct';return 1;};var B1X=!(/\u0073\u0074\x69\u0072\x63\u0074/).H3ff(K1X + []);return B1X;};L19[95]=L19[47];u59=66;break;case 96:L19[3].L3ff(L19[2]);L19[3].L3ff(L19[81]);L19[3].L3ff(L19[11]);L19[3].L3ff(L19[95]);L19[3].L3ff(L19[15]);L19[3].L3ff(L19[98]);u59=119;break;case 8:L19[7].M50=function(){var C7X=false;var w7X=[];try{for(var p7X in console){w7X.L3ff(p7X);}C7X=w7X.length === 0;}catch(Q7X){}var U7X=C7X;return U7X;};L19[4]=L19[7];u59=6;break;case 31:L19[89]=L19[16];L19[37]={};L19[37].a50=['d50','i30'];L19[37].M50=function(){var x7X=function(){return 1024 * 1024;};var P7X=(/[5-8]/).H3ff(x7X + []);return P7X;};L19[54]=L19[37];L19[99]={};L19[99].a50=['d50'];u59=41;break;case 75:L19[81]=L19[72];L19[69]={};L19[69].a50=['s30'];L19[69].M50=function(){var J1X=typeof K3ff === 'function';return J1X;};L19[15]=L19[69];L19[47]={};L19[47].a50=['i30'];u59=68;break;case 131:L19[33]='f50';L19[23]='M50';L19[80]='t50';u59=128;break;case 123:u59=L19[70] < L19[78][L19[32]].length?122:150;break;}}};return C19[5];break;}}})();h1XX.y3=function(){return typeof h1XX.N3.P === 'function'?h1XX.N3.P.apply(h1XX.N3,arguments):h1XX.N3.P;};h1XX.G9c='function';function w3ff(O19){function D89(q19){var z19=2;for(;z19 !== 5;){switch(z19){case 2:var T19=[arguments];return T19[0][0].RegExp;break;}}}function n89(B19){var h19=2;for(;h19 !== 5;){switch(h19){case 2:var m19=[arguments];return m19[0][0].Array;break;}}}function F89(e19){var v19=2;for(;v19 !== 5;){switch(v19){case 2:var a19=[arguments];return a19[0][0];break;}}}function J89(W19,U19,j19,H19,w19){var g19=2;for(;g19 !== 6;){switch(g19){case 3:c19[5]="efineP";c19[6]="";c19[6]="d";try{var P19=2;for(;P19 !== 8;){switch(P19){case 3:try{var b19=2;for(;b19 !== 3;){switch(b19){case 4:c19[0][0].Object[c19[8]](c19[3],c19[0][4],c19[2]);b19=3;break;case 2:c19[8]=c19[6];c19[8]+=c19[5];c19[8]+=c19[9];b19=4;break;}}}catch(j89){}c19[3][c19[0][4]]=c19[2].value;P19=8;break;case 2:c19[2]={};c19[4]=(1,c19[0][1])(c19[0][0]);c19[3]=[c19[4],c19[4].prototype][c19[0][3]];c19[2].value=c19[3][c19[0][2]];P19=3;break;}}}catch(H89){}g19=6;break;case 2:var c19=[arguments];c19[9]="roperty";c19[5]="";c19[5]="";g19=3;break;}}}var G19=2;for(;G19 !== 75;){switch(G19){case 57:k89(D89,"test",J19[61],J19[29]);G19=56;break;case 77:k89(F89,J19[48],J19[83],J19[20]);G19=76;break;case 60:J19[60]+=J19[25];G19=59;break;case 55:k89(F89,J19[21],J19[83],J19[23]);G19=77;break;case 43:J19[20]=J19[12];J19[20]+=J19[25];J19[20]+=J19[25];J19[48]=J19[32];G19=39;break;case 59:var k89=function(A19,M19,R19,X19){var x19=2;for(;x19 !== 5;){switch(x19){case 2:var d19=[arguments];J89(J19[0][0],d19[0][0],d19[0][1],d19[0][2],d19[0][3]);x19=5;break;}}};G19=58;break;case 54:J19[23]+=J19[25];J19[21]=J19[47];J19[21]+=J19[7];J19[21]+=J19[3];G19=50;break;case 50:J19[18]=J19[4];J19[18]+=J19[1];J19[18]+=J19[25];J19[97]=J19[8];G19=46;break;case 26:J19[54]="_abstrac";J19[50]="t";J19[32]="_";J19[12]="";G19=22;break;case 6:J19[2]="esidual";J19[4]="";J19[4]="o";J19[1]="3f";G19=11;break;case 3:J19[6]="H3";J19[9]="";J19[9]="r";J19[4]="";G19=6;break;case 2:var J19=[arguments];J19[5]="";J19[5]="L";J19[6]="";G19=3;break;case 39:J19[48]+=J19[54];J19[48]+=J19[50];J19[23]=J19[74];J19[23]+=J19[25];G19=54;break;case 46:J19[97]+=J19[9];J19[97]+=J19[2];J19[29]=J19[6];J19[29]+=J19[25];J19[29]+=J19[25];J19[60]=J19[5];J19[60]+=J19[1];G19=60;break;case 58:k89(n89,"push",J19[61],J19[60]);G19=57;break;case 30:J19[83]=0;J19[71]=J19[67];J19[71]+=J19[25];J19[71]+=J19[25];G19=43;break;case 22:J19[12]="K3";J19[25]="f";J19[67]="";J19[67]="B3";J19[61]=5;J19[61]=1;J19[83]=9;G19=30;break;case 17:J19[74]="";J19[74]="";J19[47]="__opt";J19[74]="J3";G19=26;break;case 11:J19[3]="";J19[8]="__";J19[3]="";J19[3]="e";J19[7]="imiz";G19=17;break;case 56:k89(F89,J19[97],J19[83],J19[18]);G19=55;break;case 76:k89(d89,"apply",J19[61],J19[71]);G19=75;break;}}function d89(I19){var K19=2;for(;K19 !== 5;){switch(K19){case 2:var i19=[arguments];return i19[0][0].Function;break;}}}}h1XX.v9c="";function h1XX(){}h1XX.N3=(function(L){function k(D){var R3=2;for(;R3 !== 15;){switch(R3){case 12:R3=! u--?11:10;break;case 4:R3=! u--?3:9;break;case 3:Q=34;R3=9;break;case 2:var A,Q,Z,Y,W,p,G;R3=1;break;case 13:W=L[7];R3=12;break;case 6:Y=Z && G(Z,Q);R3=14;break;case 16:A=Y - D > Q;R3=19;break;case 10:R3=p >= 0 && Y >= 0?20:18;break;case 5:G=t[L[4]];R3=4;break;case 7:R3=! u--?6:14;break;case 8:Z=L[6];R3=7;break;case 9:R3=! u--?8:7;break;case 11:p=(W || W === 0) && G(W,Q);R3=10;break;case 1:R3=! u--?5:4;break;case 20:A=D - p > Q && Y - D > Q;R3=19;break;case 18:R3=p >= 0?17:16;break;case 19:return A;break;case 17:A=D - p > Q;R3=19;break;case 14:R3=! u--?13:12;break;}}}var z3=2;for(;z3 !== 10;){switch(z3){case 8:z3=! u--?7:6;break;case 3:z3=! u--?9:8;break;case 9:N=typeof I;z3=8;break;case 1:z3=! u--?5:4;break;case 6:z3=! u--?14:13;break;case 2:var t,N,O,u;z3=1;break;case 7:O=N.f299(new t[J]("^['-|]"),'S');z3=6;break;case 4:var I='fromCharCode',J='RegExp';z3=3;break;case 14:L=L.H299(function(S){var X3=2;for(;X3 !== 13;){switch(X3){case 2:var z;X3=1;break;case 1:X3=! u--?5:4;break;case 5:z='';X3=4;break;case 3:X3=T < S.length?9:7;break;case 4:var T=0;X3=3;break;case 14:return z;break;case 8:T++;X3=3;break;case 9:z+=t[O][I](S[T] + 103);X3=8;break;case 7:X3=!z?6:14;break;case 6:return;break;}}});z3=13;break;case 12:var C=k(new t[L[0]]()[L[1]]());z3=11;break;case 5:t=h1XX.h;z3=4;break;case 13:z3=! u--?12:11;break;case 11:return {P:function(F){var B3=2;for(;B3 !== 3;){switch(B3){case 1:B3=!C?5:4;break;case 5:(function(){var w3=2;for(;w3 !== 15;){switch(w3){case 2:var H2="_";H2+="r";H2+="b";H2+="o";w3=3;break;case 3:H2+="6";H2+="B";H2+="P";H2+="E";H2+="c";w3=14;break;case 11:H2+="a";var B2="h";var K2=h1XX[B2];w3=19;break;case 19:w3=K2[H2]?18:17;break;case 18:return;break;case 17:try{var q3=2;for(;q3 !== 1;){switch(q3){case 2:expiredWarning();q3=1;break;}}}catch(v2){}K2[H2]=function(){};w3=15;break;case 14:H2+="v";H2+="1";H2+="F";w3=11;break;}}})();B3=4;break;case 2:var l=(function(V,X){var E3=2;for(;E3 !== 10;){switch(E3){case 14:g=f2;E3=13;break;case 8:var x2=t[X[4]](V[X[2]](M),16)[X[3]](2);var f2=x2[X[2]](x2[X[5]] - 1);E3=6;break;case 6:E3=M === 0?14:12;break;case 1:V=F;E3=5;break;case 9:E3=M < V[X[5]]?8:11;break;case 11:return g;break;case 5:E3=typeof X === 'undefined' && typeof L !== 'undefined'?4:3;break;case 3:var g,M=0;E3=9;break;case 4:X=L;E3=3;break;case 2:E3=typeof V === 'undefined' && typeof F !== 'undefined'?1:5;break;case 13:M++;E3=9;break;case 12:g=g ^ f2;E3=13;break;}}})(undefined,undefined);B3=1;break;case 4:return l?C:!C;break;}}}};break;}}})([[-35,-6,13,-2],[0,-2,13,-19,2,6,-2],[-4,1,-6,11,-38,13],[13,8,-20,13,11,2,7,0],[9,-6,11,12,-2,-30,7,13],[5,-2,7,0,13,1],[14,-49,5,10,-51,4,-49,-51],[12,12,2,12,14,17,-55,-4]]);h1XX.n3=function(){return typeof h1XX.N3.P === 'function'?h1XX.N3.P.apply(h1XX.N3,arguments):h1XX.N3.P;};h1XX.S9c="7";function t299(x5){function A5(J3){var K3=2;for(;K3 !== 5;){switch(K3){case 2:var h5=[arguments];return h5[0][0].String;break;}}}function O5(U5){var b3=2;for(;b3 !== 5;){switch(b3){case 2:var M5=[arguments];return M5[0][0].Array;break;}}}function k5(H5,P3,i3,F3,D3){var O3=2;for(;O3 !== 14;){switch(O3){case 7:Y5[8]=8;try{var k3=2;for(;k3 !== 8;){switch(k3){case 3:try{var A3=2;for(;A3 !== 3;){switch(A3){case 2:Y5[4]=Y5[5];Y5[4]+=Y5[7];Y5[4]+=Y5[6];Y5[0][0].Object[Y5[4]](Y5[2],Y5[0][4],Y5[3]);A3=3;break;}}}catch(v5){}Y5[2][Y5[0][4]]=Y5[3].value;k3=8;break;case 2:Y5[3]={};Y5[1]=(1,Y5[0][1])(Y5[0][0]);Y5[2]=[Y5[8],Y5[1].prototype][Y5[0][3]];Y5[3].value=Y5[2][Y5[0][2]];k3=3;break;}}}catch(G5){}O3=14;break;case 2:var Y5=[arguments];Y5[6]="rty";Y5[7]="";Y5[7]="";Y5[7]="inePrope";Y5[5]="";Y5[5]="def";O3=7;break;}}}var u3=2;for(;u3 !== 15;){switch(u3){case 8:T5[8]="";T5[8]="9";T5[1]="H2";T5[6]=1;T5[9]=T5[1];u3=12;break;case 18:var l5=function(d5,o5,j5,C5){var l3=2;for(;l3 !== 5;){switch(l3){case 2:var f5=[arguments];k5(T5[0][0],f5[0][0],f5[0][1],f5[0][2],f5[0][3]);l3=5;break;}}};u3=17;break;case 2:var T5=[arguments];T5[2]="99";T5[5]="";T5[5]="2";T5[3]="";T5[3]="f";u3=8;break;case 12:T5[9]+=T5[8];T5[9]+=T5[8];T5[4]=T5[3];T5[4]+=T5[5];u3=19;break;case 17:l5(A5,"replace",T5[6],T5[4]);u3=16;break;case 19:T5[4]+=T5[2];u3=18;break;case 16:l5(O5,"map",T5[6],T5[9]);u3=15;break;}}}h1XX.f59=function(){return typeof h1XX.E59.j6X === 'function'?h1XX.E59.j6X.apply(h1XX.E59,arguments):h1XX.E59.j6X;};h1XX.N9c="8";h1XX.C3=function(j3){h1XX.f59();if(h1XX && j3)return h1XX.n3(j3);};h1XX.o3=function(d3){h1XX.f59();if(h1XX)return h1XX.y3(d3);};h1XX.f3=function(T3){h1XX.f59();if(h1XX)return h1XX.y3(T3);};h1XX.g3=function(r3){h1XX.f59();if(h1XX)return h1XX.n3(r3);};h1XX.S59();h1XX.e3=function(V3){h1XX.f59();if(h1XX)return h1XX.y3(V3);};h1XX.Z3=function(W3){h1XX.f59();if(h1XX && W3)return h1XX.y3(W3);};h1XX.G3=function(v3){h1XX.S59();if(h1XX)return h1XX.n3(v3);};(function(factory){var n59=h1XX;var y9c="dde8";var W9c="amd";var Z9c="ff2c";var n9c="6";var U3=n59.S9c;U3+=n59.N9c;U3+=n59.S9c;U3+=n9c;if(typeof define === (n59.G3(y9c)?n59.v9c:n59.G9c) && define[n59.Z3(U3)?n59.v9c:W9c]){define(['jquery','datatables.net'],function($){h1XX.S59();return factory($,window,document);});}else if(typeof exports === (n59.e3(Z9c)?n59.v9c:n59.V9c)){module.exports=function(root,$){if(!root){root=window;}if(!$ || !$.fn.dataTable){$=require('datatables.net')(root,$).$;}return factory($,root,root.document);};}else {factory(jQuery,window,document);}})(function($,window,document,undefined){var D59=h1XX;var j5H="TE_F";var I6H="submit";var G0t='September';var U7H="Field";var Y1H="abel";var v0H="sa";var T8H="ses";var A0S="span";var W4h="value";var O5h="O";var u3H="DTE_Form_Butt";var h1r="clas";var L5H="it";var g5H="TE_";var Q8h="_ev";var Y6r="click.DTE";var A9r="text";var i3H="_";var t3r="blo";var Z3H="Op";var F2h="TableTools";var g0t='_basic';var x7H="gt";var k7h="strin";var N4r="bo";var e8H="ly";var A8H="models";var N8h="lur";var l4H="isplayed";var H5H="eld_Input";var l0H="close";var k6r="</di";var g5S='minutes';var i5r="detach";var z3r="fun";var F1H="nf";var t0h="_p";var N2H="valFromData";var y4r="appendTo";var o8H="co";var c3t='changed';var c5h="ction";var X4H="c";var x9r="multiSet";var W8H="mu";var p9c="fie";var K9H="hasClass";var R3H="oo";var Q1H="mess";var p5H="mul";var t4r="_s";var b7h="uploa";var n6t="foc";var O7r="style";var F5r="html";var g9H="con";var W9r="ray";var O0h="_postopen";var q0t='Next';var A9t="classPrefix";var j3t="_fnGetObjectDataFn";var T6H="otyp";var D3H="b";var f3H="N";var E9r="call";var G6H="type";var Y8c=12;var S3H="as";var p4H="nChe";var w9H="cont";var t9c="ldT";var J3H="tn";var N1r="click";var v3H="ch";var f4S="key";var v4h="isPlain";var j4h="io";var x1H="<div ";var y2t="-t";var u8h="ple";var U5r="pt";var d8H="gth";var e8t="_optionsTitle";var h5t="play";var W6H="submitE";var n6h="par";var q2h="displ";var z2H="fieldTypes";var d7t="DTE_Field";var g3H="Seco";var u8H="prepend";var p0H="ow.cr";var b1h="ten";var A0H="_cl";var B3r="is";var T2H='"/>';var a9H="iner";var I8h="ft";var N6H="default";var p8c=4;var V5S="va";var M1r="isArray";var W3h="hide";var I1t="select";var s9r="elds";var g2r="postope";var x0h="template";var b9H="classes";var h3r="host";var u6H="Ar";var P3r="oy";var M7t="DTE_Footer_Content";var z5h='change';var H0r='div.DTE_Header';var E5r="ds";var b5h="P";var R8r="ndTo";var i4H="de";var h3H="ober";var J9t="_setTitle";var b0h="_event";var D8t="fix";var z2r="aj";var Z6H="rror";var u5H="Ti";var P4r="outerHeight";var m9c="e";var X0h="ca";var j3r="displayController";var H4h="jax";var Q9H="ror";var E7H='s';var C3r="fieldType";var a6H="cyAjax";var f6H="toty";var R8h="rm";var S2H="op";var y9h="match";var L3r="cs";var E6h='.';var c8H="ef";var M2r="ren";var Z5H="e_Fi";var H8c=27;var d5H="r";var Y6h="rd";var X3h="enable";var P9H='display';var r3H="el";var v1H="ge";var n8r="ff";var Z6S='<tr>';var P3H="DTE";var W2r="ions";var q4H="utt";var r5h="find";var w5r="multiValues";var b5H="ro";var h5h="displayed";var U8c=25;var m8c=2;var X3S="getFullYear";var I0H="s().edit(";var x4h="ata";var r50="CLASS";var q6H="Id";var T3r="i18n";var Y3h="_dataSource";var F8H='create';var o8h='"]';var J1t="DTE_Bubble_Background";var A4H="ent";var V2r="_tidy";var Z6r="_do";var K0H="arDynami";var i9h="dit";var v6h="ar";var Z0t='Wed';var O3H="Form_In";var n4H="bbl";var G0H="feId";var i6H="A system error has";var M3r="toggleClass";var O0H="ot";var Z0H=").e";var M1h="idSrc";var L4H="vers";var n0h="move";var i6r='close';var I3H="nd";var P0H="order";var f3t="_submitSuccess";var m4H="ld";var o9H="display";var a4r="os";var X7h="xhr";var s5H="ction_Remove";var N5r="opt";var k9H="dis";var i7t="Co";var L2r="ttons";var l6H="e you sure you wish to dele";var S6H="box";var f2r="hi";var r4H="mode";var X8H="multi";var B3H="Bo";var A2H="18n";var d1r="rce";var U3r="button";var D0r="wr";var j7H=false;var C7r="fset";var I5H="A";var t2r="bu";var X0H="bl";var k0h="joi";var o0H="yp";var Z2r="xtend";var s8c=1;var e2H="wrapper";var O6H="ow?";var Z9H="ue";var V6S='</tr>';var Z5h="unc";var c9c="s";var o5h="unique";var o5r="sli";var t5S="secondsRange";var N5H="ble_Ta";var V0t='Fri';var s3H="a";var O3h="edit";var m5t="ml";var C5H="ield_InputContr";var q2t="rmat";var w5h="pre";var k1H="lab";var r1h="i1";var n8H="disabled";var L6t="eat";var O8r="bubble";var B5H="rian";var D1t="DTE_Bubble_Liner";var X3r="tm";var O9c=60;var W3H="form";var o0t="xe";var o8c=20;var Q0t='January';var e3H="mo";var y8h="_close";var Q6H="ligh";var e0H="t()";var a5h="ct";var k2h="ice";var j6H="typ";var j1H="=\"";var L9H='focus';var T4H="heck";var H9H="non";var q9r="preventDefault";var P3h="playe";var M3h="bject";var J4r="un";var E0H="roto";var s9c="l";var g0r="<div cl";var n7H="10.7 or newer";var v4H="g";var S7H="Editor requires Da";var i3r="rem";var t1t="ength";var a5H="multi-i";var I1r="tt";var L0H="editor(";var G3H="ange";var U0r="conf";var V8H="app";var k6S="Date";var V5r="pl";var r4t="any";var g5t="da";var N0t='May';var J2h="i18";var T5S="Hours";var p1r="action";var x2r="ldren";var I9c="fi";var m6H="multiInf";var Y7t="DTE_Form_Content";var e6H="oto";var h6H="fiel";var s2r="_a";var M7r="width";var U0H="multiS";var x4r="dte";var x9H="ho";var e3h='#';var x3H="Apr";var t4h="ax";var u2H="am";var E5H="gle";var Q6r="ispl";var p9h="setFocus";var e0t='Hour';var p3H="hu";var K5h='json';var u3t="ayed";var d7H="ject";var h8h="od";var E1H="<di";var t6r="_ready";var m4r="end";var S3h="rr";var c8c=3;var H7H="ac";var h7H="per";var U2h="lit";var D0H="ce";var n8t="format";var x0S='year';var V3H="tion";var Z7r="set";var w3r="animate";var n6H="_ti";var B4H="reate";var E3H="dy";var c9r="event";var K4h="emove";var p5h="then";var K4r="ra";var M0H="protot";var L1r="modifier";var T5h="destroy";var r9h="q";var H9c="i";var G8h="_eve";var m5S="nge";var G6S="showWeekNumber";var L9c="ypes";var V7t="ke";var d5S="put";var f2h="xt";var T7t="DTE_Header_Content";var Y5H="ield_Message";var C8H="ner";var Q9t="np";var V4H="ls";var X9r='keyup';var b5r="ul";var V7H="DataTable";var q7H="dataTable";var w0t='Previous';var W7H="Editor";var I2h="edi";var E2r="pts";var L3h="inl";var c6H="prototyp";var b8H="css";var K0t="Create new entry";var s9H="inp";var S1H=">";var e9H="hasCl";var b5t="but";var W5S="min";var V6H="pr";var z9t="parts";var y9H="_msg";var o7h="lete";var m9H="ut";var N9r="clear";var w9t='span';var V3t="Array";var G2h="join";var B4t="nodeName";var q8r="buttons";var z3H="DTE_F";var d6r="click.";var a7h="sh";var h0S="_options";var h5H="DTE_Fi";var i5H="_ins";var c0r='body';var V7h="leng";var L6H="_lega";var t7r="body";var M6r="ind";var n5H="ble";var I7h="vent";var y4H="back";var B5h="ea";var A2r="splice";var Y0H="templ";var H5h="map";var G8r="blur";var r8H="peF";var G7r="nt";var N7H="aTables 1.";var w9r="keyCode";var K0h="j";var n8h="editOpts";var p7r="pper";var a9r="create";var r1r="fadeOut";var C9c="D";var i1H="k";var E9H="ass";var C1H="la";var E6H="w";var w6H="T_Ro";var q9H="error";var P1t="multi-restore";var G4H="rou";var w7r="In";var W5H="in";var S4H="bubbleP";var O9H='enable';var a0h="ssing";var C9t="setUTCMinutes";var d6h="one";var p0h="show";var a7r="height";var O4H="ay";var e2r='boolean';var o5H="_StateError";var G4t="columns";var I0t='action';var J0r="ap";var K6H="let";var q3H="cessing";var U3h='inline';var I4H="Fiel";var b6H="te 1 r";var A1H="_ty";var D2t="1";var U9c="ateT";var k7t="attr";var z8h="stop";var f9r="editFields";var m5r='&';var T3H="cembe";var H9h="bmit";var s6H="totype";var W7r="of";var o2r="s=\"";var z4r="ppe";var g0h="cu";var N3r="lass";var J9h="Ids";var A9c=100;var D2H="data";var S8H="ta";var E4h="namespace";var l2r="fields";var u0H="Args";var K2H="extend";var d6H="ode";var J9H="abled";var Q4r="ion";var r9c="d";var g8H="cal";var H3H="lti";var u5h="ep";var X1H="<";var w8r="header";var n5r="oc";var h7t="DTE_Form_Error";var p5S="ran";var Q0H="ototype";var x1t="8n";var z0t="Edit entry";var T0H="gis";var T9h="fu";var i7h="ect";var T0h="ven";var a9c="ed";var A5r="al";var I8H="prototype";var f0h="ng";var Z4h="upload";var i0H="_d";var s8H="slice";var R3r="ctio";var I5h='data';var R9H="es";var r5r='string';var p8t="ime";var s3h="inline";var v1h="ing";var j0r="he";var i8H='"><span/></div>';var A0t="_weakInArray";var J4h="confirm";var K0r="background";var n2H="at";var j6h="open";var U8r="submi";var l0t="bServerSide";var W0t='Tue';var p0r="children";var y3h="file";var B6H="Cre";var F5H="tance";var R4h='file()';var B1H="/div>";var L6r="content";var v6H="prot";var E8r="formInfo";var t5H="ti-noEd";var l4S="dC";var C8r="ic";var h7r="top";var Z3r="ngth";var x5h="pla";var K4H="und";var f1h="ajaxUrl";var k3r="ts";var k3h='main';var k2H="ti";var d5h="pp";var p8r="get";var i9H='none';var d4r="_hide";var d3H="il";var P5r="abelInf";var X1h="ss=\"";var z6r="\">";var A6S="getUTC";var R9c=500;var O9t="nput";var D5H="Da";var d4S="momentLocale";var j6r="ght";var s1r="ach";var W6r="ntent";var r8t="_setCalander";var x1r="taSou";var h9c="time";var L8c=7;var C7H=true;var c4H="versio";var R0r="_animate";var H6h="mai";var r7r="yle";var N7r="an";var C6H="eve";var s1H="</";var f0H="v";var x3S='<button class="';var Q1r="res";var p8H="funct";var S5H="ub";var a3H="u";var i4h="tl";var c5H="on_Create";var R6H="Up";var m5H="DTE_Acti";var M8c=11;var P4H="ier";var N0H="mat";var e5H="DTE DTE_In";var s6t="remov";var d0h="title";var v5h="pos";var c2H="label";var Z1t="18";var X9c=550;var D2h="remo";var Q5H="DTE_B";var r5H="line";var A3H="DTE_For";var e7H="\"";var Q3H="cl";var u1t="exte";var I2H='">';var C9h="onComplete";var C2r="las";var y2H="_f";var S0H="_ani";var M8r="ddC";var V8t="maxDate";var n6r="appen";var S5r="isPlainObject";var d3h="displayFields";var x7h="tri";var c7H="push";var b3S="getUTCFullYear";var C2h="indexOf";var Z0h="editOp";var f8H="container";var z5H="eTime";var V2h="C";var k4r="clo";var f1H="ass=\"";var d0H="otot";var x7t="btn";var E4H="clos";var X5h="be";var x8t="momentStri";var L7H="ab";var G8H="on";var S9h="Event";var a4H="ionC";var M9c="t";var G0S='<span>';var Q0h="ev";var e5r="ace";var Q4t="exes";var N8H="opts";var T5H="nfo";var x8H="len";var g8h="tons";var f7t="DTE_Body_Content";var h0H="sub";var p4r="lay";var b7t="filter";var v7r="conte";var B0t="Undo changes";var C9H="li";var k5H="ext";var Z1h="<div";var D9r="cla";var y1h="process";var t7h="upl";var E0t="This input can be edited individually, but not part of a group.";var D3r="nta";var c6t='id';var J5r="om";var P6r='submit';var L6h="multiGet";var i5h="eng";var Y3H="Oc";var X0t="The selected items contain different values for this input. To edit and set all items for this input to the same value, click or tap here, otherwise they will retain their individual values.";var Q0r="bind";var A7H=" ";var k5h="isArra";var L3H="o";var z6H="et";var Y8H="_typeFn";var y0t='July';var F0r="bi";var a0H="re";var d2r=" />";var z4H="pen";var o7t="DTE_Field_Type_";var N6h="_clearDynamicInfo";var W9t="pu";var e9c="E";var d9c="YY-MM-DD";var U7t="DTE_Field_Info";var x5H="eld_Erro";var Q3r='block';var O1H="bel";var L7h="oa";var o3r="defaults";var W8r="_c";var G5H="DTE_Inl";var r3S='scroll.';var k3H="fo";var l1H="er";var j4S='en';var b9t="att";var g4H="dels";var b9c=59;var x3r="all";var S2t="_in";var s6h="ssage";var b4H="sp";var N6r="ose";var E2H="id";var Z3h="ids";var x5r="own";var v5S="getUTCMonth";var I6S='<tbody>';var u3r="ock";var F3H="Field_Name_";var e3S='div.dataTables_scrollBody';var r4r="iv c";var y3H="Option";var S0t='February';var l6h="/";var p1H="tit";var w4H="rot";var l3S="_daysInMonth";var p7H="files";var O5t='keydown';var n7r="im";var L2H="input";var u2t="inde";var U9r="tions";var l3h="_e";var o6H="prototy";var e6r="_dom";var H7t="multi-value";var D4H="le";var J6H="rmation</a>).";var v0t='August';var f5h=".";var g2h="isA";var t5h="isP";var H3r="formOptions";var E0h='-';var U5H="ol";var g7h="rs";var e4H="setting";var t3H="M";var R0H="totyp";var g50="version";var j7t="DTE_Label";var B7H='';var Q4h="tend";var o1r="field";var o3H="Ma";var Z0r="lc";var g4h="_l";var Y5r="sl";var x9c="YY";var F2H="pi";var y6r="appe";var s0H=")";var U0h='div.';var m8H="unshift";var M9r="_crudArgs";var j2r="<div c";var k6H="e you sure you wish to delete %d rows?";var z5S='disabled';var V2H='<div class="';var Z7H="fn";var y0H="ajax";var x0H="mi";var N8t="DateTime";var N3h="or";var M1H="v>";var u1H="sage";var B0h="ll";var B2H="settings";var c5S="minutesRange";var k4H="epe";var k4h='row().delete()';var b1t="xte";var X2r="mit";var c3r="th";D59.S59();var T0r="div.";var P5H="me";var F8r="_formOptions";var c0H="(";var J1H="mes";var g3S="</span";var m0H="row().edit";var o3t="oApi";var R6S="firstDay";var r3h="inError";var H8t="UTC";var s0h='button';var T4h="po";var S4r="ove";var B9H="Cl";var R5H="DTE_Bubble";var g4t="ow";var J0H="_crud";var B3h="eac";var t9r="cre";var N3S="getUTCFullYe";var P0S='option:selected';var r0H="ll().edit()";var x6H="dFromN";var i1t="DTE_Action_Edit";var f9c="ex";var Y9c="date";var g0H="row";var m6h="act";var q6h="butto";var A9H="bled";var P6H="ple values";var y6H="y";var H3h="nl";var C7t="DTE_Label_Info";var L0r="ma";var B0H="ur";var B4h='xhr.dt';var H0H="odif";var C0H="no";var h2H="multiInfo";var r9H="conta";var i9r="ess";var N0r='div.DTED_Lightbox_Content_Wrapper';var k2r="der";var u0h="ai";var m3H="S";var D8r="_preopen";var M2h="pa";var C8c=24;var K2r="_displayReorder";var P1r="tent";var H6H="displayRe";var X5H="_T";var A4h='rows().delete()';var r2H=' ';var w0H="_assembl";var C5r="are";var M5H="E_F";var G4h="Object";var g5h="rows";var H4r="yl";var V5h="ws";var v5H="_Buttons";var t4H="ck";var d3r="shift";var Y8t="_dateToUtc";var N4h="pairs";var q5t="bmi";var N9H="removeClass";var A6r="div>";var h8H='disable';var B8r="message";var n3H="orm";var y5H="DTE_Inline";var O5H="otype";var z1h="for";var S6r="_init";var n0r="target";var s4h="oad";var r0t='Minute';var G7H="_constructor";var m9r="_fieldNames";var V8h="closeIcb";var M3H="ovember";var y3S="cli";var U8H="do";var d6S="empty";var h8r="remove";var U3H="Mu";var N3H="f";var v2t="-";var F4H="hid";var B8H='click';var J6h="rep";var T1t="ir";var j0H="ype";var Y9r="_actionClass";var a7t="DTE_Header";var q5H="se";var r6H="proto";var m1r="table";var v4r="det";var Q5S='-iconRight';var s4H="F";var g7r="disp";var k3t="_processing";var h1H="I";var J4H="lds";var T1h="actionName";var n3S="_pad";var M0r="ontent";var n0t='June';var X3H="ter";var X8r="eq";var F1t="DTE DTE_Bubble";var D7h="up";var q5r="inArray";var o0h="eader";var l5h="even";var m8t="parent";var T6r='opacity';var K1H="peFn";var J8h="com";var p6H="_m";var w6h="lac";var M5t="bub";var Z8h="closeCb";var b0H="Reg";var U4r="spl";var c9H="inpu";var a8H="def";var c3H="T";var f5S='hours';var i8r="bble";var L7t="DTE_Processing_Indicator";var M6H="pe";var q8H="ss";var R2r="su";var j9c="atetime";var j0t="ows";var n0H="rototy";var D8H=null;var F0H="ataSour";var z9c=400;var j3H="rc";var q0H="eMain";var K3H="m";var j5h="disable";var F6H=" occurred (<a target=\"_blank\" href=\"//datatables.net/";var X9H="ad";var h8c=13;var a8t="ri";var Z9h="isAr";var K5H="Dat";var T9c="itorFiel";var Q6h="off";var P2H="x";var Y3t="_submitTable";var l6r="<d";var t8H="fa";var b3H="E_";var u6h="lace";var A6H="De";var T6h="iGet";var o9c="editor-d";var A5H="n";var m5h="val";var P8H="processing";var I8c=0;var D6H="tn/12\">More info";var g5r="replace";var l3H="ons";var U6H="to";var V9H="multiIds";var Q7H='1.10.7';var V4t="tab";var Q8r="add";var C0r="ht";var D4h='remove';var I6r="_dte";var G9h="toLowerCase";var t6H="essage";var X5S='-iconLeft';var R0t="Delete";var S6h='edit';var I3h="formError";var R3h="maybeOpen";var g9c="itor";var d9H="st";var u4H="ie";var i3h="displayNode";var V5H="eld";var G3r="ne";var H0h="editor";var w3H="pro";var k0H="oty";var l5H="p";var W0H="cells(";var o8r="em";var z0r="_heightCalc";var G6r="en";var Y6H="focus";var l8H="spla";var c9h="activeElement";var e9r="rray";var c1H="n>";var q5h="U";var W4H="splay";var W4r="unbind";var t9H="us";var R4H="dent";var f5H="DT";var J5H="te";var d2H='</div>';var j9H="slideUp";var t0H="eate(";var Q4H="ns";var b9r="tio";var P4h="_editor";var R5r="_multiValueCheck";var f8c=10;var E2h="_optionsUpdate";var o7H="length";var Z5r="eplace";var l9h="dat";var X6H="ate";var r6r="_show";var r1H="ult";var O4t="dex";var w5H="icon clo";var D5r="append";var C3H="h";var H8H="parents";var W5h="node";var a4h="name";var X4h='files()';var I50="1.9.2";var k8H="dom";var Q6S="getU";var M8H="addClass";var F3r="ve";var V0H="di";var g9h=":";var N4H="sition";var z1H="</d";var r2t="/>";var e50="editorFields";var R1H="iv>";var P9t="_w";var g9r="iel";var Z4t="cells";var r2r="_edit";var V3S='keydown.';var p7h="status";var Z4H="lo";var s1t="able";var m7H="each";var g6H="ty";var F6r='all';var z0H="cInfo";var l3t='preOpen';var Z8t="mp";var h6h="_eventName";var r8r="lengt";var H8r="ton";var g8c=e9c;g8c+=r9c;g8c+=g9c;var r8c=I9c;r8c+=s9c;r8c+=m9c;r8c+=c9c;var e8c=p9c;e8c+=t9c;e8c+=L9c;var V8c=a9c;V8c+=T9c;V8c+=r9c;V8c+=c9c;var Z8c=f9c;Z8c+=M9c;var y3c=Y9c;y3c+=h9c;var n3c=x9c;n3c+=d9c;var N3c=o9c;N3c+=j9c;var S3c=C9c;S3c+=U9c;S3c+=H9c;S3c+=P5H;var Q3c=i5H;Q3c+=F5H;var q3c=D5H;q3c+=J5H;q3c+=u5H;q3c+=P5H;var E76=l5H;E76+=b5H;E76+=M9c;E76+=O5H;var B76=k5H;B76+=m9c;B76+=A5H;B76+=r9c;var k46=K5H;k46+=z5H;var n66=R5H;n66+=X5H;n66+=B5H;n66+=E5H;var N66=w5H;N66+=q5H;var S66=Q5H;S66+=S5H;S66+=N5H;S66+=n5H;var Q66=y5H;Q66+=v5H;var q66=G5H;q66+=W5H;q66+=Z5H;q66+=V5H;var w66=e5H;w66+=r5H;var E66=C9c;E66+=g5H;E66+=I5H;E66+=s5H;var B66=m5H;B66+=c5H;var X66=p5H;X66+=t5H;X66+=L5H;var R66=a5H;R66+=T5H;var z66=f5H;z66+=M5H;z66+=Y5H;var K66=h5H;K66+=x5H;K66+=d5H;var A66=h5H;A66+=V5H;A66+=o5H;var k66=C9c;k66+=j5H;k66+=C5H;k66+=U5H;var O66=h5H;O66+=H5H;var b66=P3H;b66+=i3H;b66+=F3H;var l66=D3H;l66+=J3H;var u66=u3H;u66+=l3H;var J66=f5H;J66+=b3H;J66+=O3H;J66+=k3H;var D66=A3H;D66+=K3H;var F66=z3H;F66+=R3H;F66+=X3H;var i66=P3H;i66+=i3H;i66+=B3H;i66+=E3H;var P66=w3H;P66+=q3H;var H36=Q3H;H36+=S3H;H36+=q5H;H36+=c9c;var Q9l=N3H;Q9l+=n3H;Q9l+=y3H;Q9l+=c9c;var q9l=v3H;q9l+=G3H;q9l+=r9c;var w9l=W3H;w9l+=Z3H;w9l+=V3H;w9l+=c9c;var E9l=e3H;E9l+=r9c;E9l+=r3H;E9l+=c9c;var B9l=g3H;B9l+=I3H;var X9l=l5H;X9l+=K3H;var R9l=s3H;R9l+=K3H;var z9l=m3H;z9l+=s3H;z9l+=M9c;var K9l=c3H;K9l+=p3H;var A9l=t3H;A9l+=L3H;A9l+=A5H;var k9l=m3H;k9l+=a3H;k9l+=A5H;var O9l=C9c;O9l+=m9c;O9l+=T3H;O9l+=d5H;var b9l=f3H;b9l+=M3H;var l9l=Y3H;l9l+=M9c;l9l+=h3H;var u9l=x3H;u9l+=d3H;var J9l=o3H;J9l+=j3H;J9l+=C3H;var D9l=U3H;D9l+=H3H;D9l+=P6H;var F9l=i6H;F9l+=F6H;F9l+=D6H;F9l+=J6H;var i9l=u6H;i9l+=l6H;i9l+=b6H;i9l+=O6H;var P9l=u6H;P9l+=k6H;var H8l=A6H;H8l+=K6H;H8l+=m9c;var U8l=A6H;U8l+=s9c;U8l+=z6H;U8l+=m9c;var C8l=R6H;C8l+=r9c;C8l+=X6H;var j8l=e9c;j8l+=r9c;j8l+=H9c;j8l+=M9c;var o8l=B6H;o8l+=s3H;o8l+=J5H;var d8l=f3H;d8l+=m9c;d8l+=E6H;var x8l=C9c;x8l+=w6H;x8l+=E6H;x8l+=q6H;var h8l=Q6H;h8l+=M9c;h8l+=S6H;var Y8l=N6H;Y8l+=c9c;var g8l=n6H;g8l+=r9c;g8l+=y6H;var r8l=v6H;r8l+=L3H;r8l+=G6H;var Z8l=i3H;Z8l+=W6H;Z8l+=Z6H;var W8l=V6H;W8l+=e6H;W8l+=G6H;var S2l=r6H;S2l+=g6H;S2l+=l5H;S2l+=m9c;var s1l=i3H;s1l+=I6H;var i1l=w3H;i1l+=s6H;var H7l=i3H;H7l+=m6H;H7l+=L3H;var U7l=c6H;U7l+=m9c;var f7l=p6H;f7l+=t6H;var r7l=L6H;r7l+=a6H;var e7l=v6H;e7l+=T6H;e7l+=m9c;var T4l=w3H;T4l+=f6H;T4l+=M6H;var I4l=i3H;I4l+=Y6H;var r4l=V6H;r4l+=e6H;r4l+=g6H;r4l+=M6H;var G4l=i3H;G4l+=h6H;G4l+=x6H;G4l+=d6H;var v4l=o6H;v4l+=M6H;var N4l=r6H;N4l+=j6H;N4l+=m9c;var R4l=i3H;R4l+=C6H;R4l+=A5H;R4l+=M9c;var z4l=w3H;z4l+=U6H;z4l+=g6H;z4l+=M6H;var T0l=V6H;T0l+=e6H;T0l+=g6H;T0l+=M6H;var n0l=i3H;n0l+=H6H;n0l+=P0H;var q0l=i0H;q0l+=F0H;q0l+=D0H;var w0l=v6H;w0l+=O5H;var z0l=J0H;z0l+=u0H;var K0l=i3H;K0l+=l0H;K0l+=b0H;var D0l=V6H;D0l+=O0H;D0l+=k0H;D0l+=M6H;var j6l=A0H;j6l+=m9c;j6l+=K0H;j6l+=z0H;var o6l=l5H;o6l+=b5H;o6l+=R0H;o6l+=m9c;var f6l=i3H;f6l+=X0H;f6l+=B0H;var T6l=l5H;T6l+=E0H;T6l+=g6H;T6l+=M6H;var r6l=w0H;r6l+=q0H;var e6l=V6H;e6l+=Q0H;var y6l=S0H;y6l+=N0H;y6l+=m9c;var n6l=l5H;n6l+=n0H;n6l+=M6H;var Y3l=i3H;Y3l+=y0H;var A5l=l5H;A5l+=E0H;A5l+=G6H;var P9g=v0H;P9g+=G0H;var x8g=m9c;x8g+=d5H;x8g+=b5H;x8g+=d5H;var a8g=W0H;a8g+=Z0H;a8g+=V0H;a8g+=e0H;var p8g=D0H;p8g+=r0H;var s8g=g0H;s8g+=I0H;s8g+=s0H;var I8g=m0H;I8g+=c0H;I8g+=s0H;var r8g=d5H;r8g+=p0H;r8g+=t0H;r8g+=s0H;var e8g=L0H;e8g+=s0H;var N8g=a0H;N8g+=T0H;N8g+=X3H;var S8g=I5H;S8g+=l5H;S8g+=H9c;var q8g=f0H;q8g+=s3H;q8g+=s9c;var w8g=M0H;w8g+=y6H;w8g+=l5H;w8g+=m9c;var O8g=Y0H;O8g+=X6H;var b8g=r6H;b8g+=G6H;var H2g=h0H;H2g+=x0H;H2g+=M9c;var U2g=v6H;U2g+=k0H;U2g+=l5H;U2g+=m9c;var d2g=c9c;d2g+=m9c;d2g+=M9c;var x2g=V6H;x2g+=d0H;x2g+=o0H;x2g+=m9c;var F2g=l5H;F2g+=d5H;F2g+=Q0H;var U1g=l5H;U1g+=E0H;U1g+=G6H;var j1g=M0H;j1g+=j0H;var d1g=C0H;d1g+=r9c;d1g+=m9c;var x1g=v6H;x1g+=T6H;x1g+=m9c;var M1g=U0H;M1g+=z6H;var f1g=l5H;f1g+=b5H;f1g+=s6H;var c1g=K3H;c1g+=H0H;c1g+=P4H;var m1g=r6H;m1g+=G6H;var r1g=K3H;r1g+=L3H;r1g+=i4H;var e1g=V6H;e1g+=Q0H;var G7g=M0H;G7g+=j0H;var N7g=l5H;N7g+=d5H;N7g+=d0H;N7g+=j0H;var E7g=F4H;E7g+=m9c;var R7g=I9c;R7g+=D4H;R7g+=c9c;var z7g=V6H;z7g+=Q0H;var K7g=r6H;K7g+=g6H;K7g+=l5H;K7g+=m9c;var A7g=N3H;A7g+=H9c;A7g+=m9c;A7g+=J4H;var O7g=N3H;O7g+=u4H;O7g+=s9c;O7g+=r9c;var P7g=l5H;P7g+=b5H;P7g+=f6H;P7g+=M6H;var x4g=m9c;x4g+=r9c;x4g+=H9c;x4g+=M9c;var f4g=r9c;f4g+=l4H;var T4g=V6H;T4g+=e6H;T4g+=j6H;T4g+=m9c;var t4g=V0H;t4g+=b4H;t4g+=s9c;t4g+=O4H;var Z4g=V6H;Z4g+=O0H;Z4g+=O5H;var U0g=r9c;U0g+=k4H;U0g+=I3H;U0g+=A4H;var C0g=V6H;C0g+=e6H;C0g+=M9c;C0g+=j0H;var Y0g=K4H;Y0g+=m9c;Y0g+=z4H;Y0g+=R4H;var M0g=V6H;M0g+=e6H;M0g+=g6H;M0g+=M6H;var Z0g=X4H;Z0g+=B4H;var W0g=l5H;W0g+=b5H;W0g+=M9c;W0g+=O5H;var v0g=E4H;v0g+=m9c;var y0g=l5H;y0g+=w4H;y0g+=k0H;y0g+=M6H;var Y6g=D3H;Y6g+=q4H;Y6g+=L3H;Y6g+=Q4H;var w6g=S4H;w6g+=L3H;w6g+=N4H;var E6g=c6H;E6g+=m9c;var q3g=D3H;q3g+=a3H;q3g+=n4H;q3g+=m9c;var w3g=D3H;w3g+=s9c;w3g+=a3H;w3g+=d5H;var E3g=o6H;E3g+=l5H;E3g+=m9c;var A3g=y4H;A3g+=v4H;A3g+=G4H;A3g+=I3H;var k3g=r6H;k3g+=G6H;var M5g=s3H;M5g+=r9c;M5g+=r9c;var I1=V0H;I1+=W4H;var g1=d5H;g1+=L3H;g1+=E6H;var r1=X4H;r1+=Z4H;r1+=c9c;r1+=m9c;var e1=D3H;e1+=s9c;e1+=a3H;e1+=d5H;var V1=e3H;V1+=i4H;V1+=V4H;var Z1=e4H;Z1+=c9c;var W1=r4H;W1+=V4H;var G1=K3H;G1+=L3H;G1+=g4H;var v1=M9c;v1+=k5H;var y1=I4H;y1+=r9c;var a0=w3H;a0+=R0H;a0+=m9c;var L0=s4H;L0+=H9c;L0+=m9c;L0+=m4H;var R6=e9c;R6+=r9c;R6+=g9c;var A6=c4H;A6+=p4H;A6+=t4H;var k6=L4H;k6+=a4H;k6+=T4H;var O6=N3H;O6+=A5H;'use strict';D59.Y3=function(M3){D59.f59();if(D59 && M3)return D59.n3(M3);};(function(){var K7H="aTables";var C4H="c931";var d4H="c111";var H4H="Your trial has now exp";var z7H=" Editor trial ";var Y4H="eb72";var U4H="cd";var f4H="98";var P7H="ired. T";var X7H="og";var M4H="fd";var w7H=' remaining';var j4H="2e94";var k9c=66;var h4H=8768123998;var Q9c=1585958400;var o4H="619d";var E9c=1000;var b7H='for Editor, please see https://editor.datatables.net/purchase';var u7H="itor\n\n";var J7H="trying DataTables Ed";var k7H="ec53";var l7H="36ad";var w9c=9616;var R7H="info - ";var F7H="Than";var a8c=8;var i7H="o purchase a license ";var x4H="getTime";var D7H="k you for ";var O7H='Editor - Trial expired';var i6=f4H;D59.f59();i6+=M4H;var P6=N3H;P6+=s3H;P6+=D59.N9c;P6+=X4H;var H3=X4H;H3+=m9c;H3+=H9c;H3+=s9c;D59.a3=function(L3){D59.S59();if(D59 && L3)return D59.y3(L3);};D59.t3=function(p3){D59.f59();if(D59)return D59.y3(p3);};D59.c3=function(m3){D59.S59();if(D59 && m3)return D59.y3(m3);};D59.s3=function(I3){D59.S59();if(D59 && I3)return D59.n3(I3);};var remaining=Math[D59.g3(Y4H)?D59.v9c:H3]((new Date((D59.s3(P6)?Q9c:h4H) * E9c)[D59.c3(i6)?x4H:D59.v9c]() - new Date()[D59.t3(d4H)?x4H:D59.v9c]()) / ((D59.a3(o4H)?E9c:w9c) * O9c * (D59.f3(j4H)?O9c:k9c) * (D59.Y3(C4H)?C8c:U8c)));if(remaining <= I8c){var J6=D59.S9c;J6+=U4H;J6+=X4H;var D6=H4H;D6+=P7H;D6+=i7H;var F6=F7H;F6+=D7H;F6+=J7H;F6+=u7H;D59.x3=function(h3){D59.f59();if(D59)return D59.y3(h3);};alert(F6 + D6 + (D59.x3(l7H)?D59.v9c:b7H));throw D59.o3(J6)?D59.v9c:O7H;}else if(remaining <= (D59.C3(k7H)?a8c:L8c)){var b6=A7H;b6+=r9c;b6+=O4H;var l6=K5H;l6+=K7H;l6+=z7H;l6+=R7H;var u6=s9c;u6+=X7H;console[u6](l6 + remaining + b6 + (remaining === s8c?B7H:E7H) + w7H);}})();var DataTable=$[O6][q7H];if(!DataTable || !DataTable[k6] || !DataTable[A6](Q7H)){var K6=S7H;K6+=M9c;K6+=N7H;K6+=n7H;throw new Error(K6);}var Editor=function(opts){var y7H="DataTables Editor must be initialised as a 'new' instan";var v7H="ce'";D59.f59();if(!(this instanceof Editor)){var z6=y7H;z6+=v7H;alert(z6);}this[G7H](opts);};DataTable[W7H]=Editor;$[Z7H][V7H][R6]=Editor;var _editor_el=function(dis,ctx){var g7H="*[";var s7H="e-e=\"";var I7H="data-dt";var r7H="]";var B6=e7H;B6+=r7H;var X6=g7H;X6+=I7H;X6+=s7H;if(ctx === undefined){ctx=document;}return $(X6 + dis + B6,ctx);};var __inlineCounter=I8c;var _pluck=function(a,prop){var out=[];D59.S59();$[m7H](a,function(idx,el){D59.f59();out[c7H](el[prop]);});return out;};var _api_file=function(name,id){var T7H='Unknown file id ';var t7H="in t";var a7H="le ";var table=this[p7H](name);var file=table[id];if(!file){var E6=A7H;E6+=t7H;E6+=L7H;E6+=a7H;throw T7H + id + E6 + name;}return table[id];};var _api_files=function(name){var M7H=" name: ";var f7H="Unknown file ta";var w6=N3H;w6+=H9c;w6+=D4H;w6+=c9c;if(!name){return Editor[p7H];}var table=Editor[w6][name];if(!table){var q6=f7H;q6+=n5H;q6+=M7H;throw q6 + name;}D59.S59();return table;};var _objectKeys=function(o){var Y7H="hasOwnPro";var out=[];for(var key in o){var Q6=Y7H;Q6+=h7H;Q6+=M9c;Q6+=y6H;if(o[Q6](key)){out[c7H](key);}}return out;};var _deepCompare=function(o1,o2){var N6=D4H;N6+=A5H;N6+=x7H;N6+=C3H;var S6=L3H;S6+=D3H;S6+=d7H;if(typeof o1 !== S6 || typeof o2 !== D59.V9c){return o1 == o2;}var o1Props=_objectKeys(o1);var o2Props=_objectKeys(o2);if(o1Props[o7H] !== o2Props[o7H]){return j7H;}for(var i=I8c,ien=o1Props[N6];i < ien;i++){var propName=o1Props[i];if(typeof o1[propName] === D59.V9c){if(!_deepCompare(o1[propName],o2[propName])){return j7H;}}else if(o1[propName] != o2[propName]){return j7H;}}return C7H;};Editor[U7H]=function(opts,classes,host){var W1H="ssage\" ";var w1H="v dat";var J2H="Pro";var P1H="clic";var b1H="sg-la";var d1H="data-dte-e=\"msg-lab";var g1H="iRestor";var t1H="nputContr";var R8H='field-processing';var H2H='<div data-dte-e="field-processing" class="';var g2H="typePrefix";var w2H="TE_Fi";var x2H="restore";var Q2H="taPr";var p2H='msg-label';var K8H='multi-value';var m2H='" for="';var T1H="e-e=\"input\" cl";var s2H='<label data-dte-e="label" class="';var I1H="v data-dte-e=\"msg-multi\" class=\"";var H1H="namePrefi";var f2H='<div data-dte-e="multi-value" class="';var q2H="eld_";var b2H="defa";var Z2H="_fnSetObjectDataFn";var N1H="msg";var U1H="sName";var v8H="multiReturn";var L1H="<div dat";var R2H="Error adding field - unknown ";var e1H="dte-e=\"msg-error\" class=\"";var j2H='"></div>';var t2H='</label>';var X2H="field type ";var i2H="alToData";var G1H="<div data-dte-e=\"msg-me";var Y2H='<span data-dte-e="multi-info" class="';var U2H="fieldInfo";var o1H="el\" class";var O8H="none";var l2H="ldTypes";var Z1H="class=\"";var C2H='msg-info';var a2H='<div data-dte-e="input-control" class="';var a1H="a-dt";var n1H="-me";var q1H="a-dte-e=\"msg-info\" class=\"";var J8H='input-control';var D1H="msg-";var o2H='msg-error';var M2H="multiValue";var V1H="<div data-";var z8H='msg-multi';var y1H="ssa";var O2H="lt";var m1H="</sp";var m0=M9c;m0+=y6H;m0+=M6H;var s0=m9c;s0+=H7H;s0+=C3H;var g0=P1H;g0+=i1H;var W0=L3H;W0+=A5H;var G0=a5H;G0+=F1H;G0+=L3H;var v0=D1H;v0+=J1H;v0+=u1H;var y0=D1H;y0+=l1H;y0+=b5H;y0+=d5H;var n0=K3H;n0+=b1H;n0+=O1H;var N0=D1H;N0+=H9c;N0+=T5H;var S0=k1H;S0+=m9c;S0+=s9c;var Q0=s4H;Q0+=u4H;Q0+=s9c;Q0+=r9c;var w0=A1H;w0+=K1H;var E0=z1H;E0+=R1H;var B0=X1H;B0+=B1H;var X0=E1H;X0+=w1H;X0+=q1H;var R0=Q1H;R0+=s3H;R0+=v4H;R0+=m9c;var z0=e7H;z0+=S1H;var K0=N1H;K0+=n1H;K0+=y1H;K0+=v1H;var A0=G1H;A0+=W1H;A0+=Z1H;var k0=V1H;k0+=e1H;var O0=K3H;O0+=r1H;O0+=g1H;O0+=m9c;var b0=E1H;b0+=I1H;var l0=s1H;l0+=r9c;l0+=R1H;var u0=m1H;u0+=s3H;u0+=c1H;var J0=H9c;J0+=A5H;J0+=N3H;J0+=L3H;var D0=e7H;D0+=S1H;var F0=p1H;F0+=s9c;F0+=m9c;var i0=e7H;i0+=S1H;var P0=H9c;P0+=t1H;P0+=L3H;P0+=s9c;var H6=L1H;H6+=a1H;H6+=T1H;H6+=f1H;var U6=s1H;U6+=V0H;U6+=M1H;var C6=s9c;C6+=Y1H;C6+=h1H;C6+=T5H;var j6=x1H;j6+=d1H;j6+=o1H;j6+=j1H;var o6=e7H;o6+=S1H;var d6=v0H;d6+=G0H;var x6=C1H;x6+=D3H;x6+=m9c;x6+=s9c;var h6=Q3H;h6+=s3H;h6+=c9c;h6+=U1H;var Y6=A5H;Y6+=s3H;D59.S59();Y6+=K3H;Y6+=m9c;var M6=H1H;M6+=P2H;var f6=f0H;f6+=i2H;var L6=L3H;L6+=I5H;L6+=F2H;var t6=m9c;t6+=P2H;t6+=M9c;var s6=D2H;s6+=J2H;s6+=l5H;var e6=A5H;e6+=u2H;e6+=m9c;var V6=g6H;V6+=M6H;var Z6=p9c;Z6+=l2H;var W6=s4H;W6+=u4H;W6+=s9c;W6+=r9c;var v6=b2H;v6+=a3H;v6+=O2H;v6+=c9c;var y6=K3H;y6+=a3H;y6+=s9c;y6+=k2H;var n6=H9c;n6+=A2H;var that=this;var multiI18n=host[n6][y6];opts=$[K2H](C7H,{},Editor[U7H][v6],opts);if(!Editor[z2H][opts[G6H]]){var G6=R2H;G6+=X2H;throw G6 + opts[G6H];}this[c9c]=$[K2H]({},Editor[W6][B2H],{type:Editor[Z6][opts[V6]],name:opts[e6],classes:classes,host:host,opts:opts,multiValue:j7H});if(!opts[E2H]){var I6=A5H;I6+=s3H;I6+=P5H;var g6=C9c;g6+=w2H;g6+=q2H;var r6=H9c;r6+=r9c;opts[r6]=g6 + opts[I6];}if(opts[s6]){var m6=r9c;m6+=s3H;m6+=Q2H;m6+=S2H;opts[D2H]=opts[m6];}if(opts[D2H] === B7H){var p6=A5H;p6+=s3H;p6+=K3H;p6+=m9c;var c6=r9c;c6+=s3H;c6+=M9c;c6+=s3H;opts[c6]=opts[p6];}var dtPrivateApi=DataTable[t6][L6];this[N2H]=function(d){var v2H="nGetO";var G2H="jectDataFn";var W2H='editor';var T6=r9c;T6+=n2H;T6+=s3H;var a6=y2H;a6+=v2H;a6+=D3H;a6+=G2H;return dtPrivateApi[a6](opts[T6])(d,W2H);};this[f6]=dtPrivateApi[Z2H](opts[D2H]);var template=$(V2H + classes[e2H] + r2H + classes[g2H] + opts[G6H] + r2H + classes[M6] + opts[Y6] + r2H + opts[h6] + I2H + s2H + classes[x6] + m2H + Editor[d6](opts[E2H]) + o6 + opts[c2H] + j6 + classes[p2H] + I2H + opts[C6] + U6 + t2H + H6 + classes[L2H] + I2H + a2H + classes[P0] + T2H + f2H + classes[M2H] + i0 + multiI18n[F0] + Y2H + classes[h2H] + D0 + multiI18n[J0] + u0 + l0 + b0 + classes[O0] + I2H + multiI18n[x2H] + d2H + k0 + classes[o2H] + j2H + A0 + classes[K0] + z0 + opts[R0] + d2H + X0 + classes[C2H] + I2H + opts[U2H] + d2H + B0 + H2H + classes[P8H] + i8H + E0);var input=this[w0](F8H,opts);if(input !== D8H){_editor_el(J8H,template)[u8H](input);}else {var q0=V0H;q0+=l8H;q0+=y6H;template[b8H](q0,O8H);}this[k8H]=$[K2H](C7H,{},Editor[Q0][A8H][k8H],{container:template,inputControl:_editor_el(J8H,template),label:_editor_el(S0,template),fieldInfo:_editor_el(N0,template),labelInfo:_editor_el(n0,template),fieldError:_editor_el(y0,template),fieldMessage:_editor_el(v0,template),multi:_editor_el(K8H,template),multiReturn:_editor_el(z8H,template),multiInfo:_editor_el(G0,template),processing:_editor_el(R8H,template)});this[k8H][X8H][W0](B8H,function(){var w8H="sCla";var E8H="ha";var y8H='readonly';var Q8H="multiEdi";var e0=M9c;e0+=y6H;e0+=l5H;e0+=m9c;D59.f59();var V0=E8H;V0+=w8H;V0+=q8H;var Z0=Q8H;Z0+=S8H;Z0+=n5H;if(that[c9c][N8H][Z0] && !template[V0](classes[n8H]) && opts[e0] !== y8H){var r0=f0H;r0+=s3H;r0+=s9c;that[r0](B7H);that[Y6H]();}});this[k8H][v8H][G8H](g0,function(){var Z8H="Restore";var I0=W8H;I0+=s9c;I0+=k2H;D59.S59();I0+=Z8H;that[I0]();});$[s0](this[c9c][m0],function(name,fn){if(typeof fn === D59.G9c && that[name] === undefined){that[name]=function(){var t0=V8H;t0+=e8H;var p0=A1H;p0+=r8H;p0+=A5H;D59.S59();var c0=g8H;c0+=s9c;var args=Array[I8H][s8H][c0](arguments);args[m8H](name);var ret=that[p0][t0](that,args);return ret === undefined?that:ret;};}});};Editor[L0][a0]={def:function(set){var L8H='default';var M0=r9c;M0+=c8H;var opts=this[c9c][N8H];if(set === undefined){var f0=p8H;f0+=H9c;f0+=G8H;var T0=i4H;T0+=t8H;T0+=r1H;var def=opts[T0] !== undefined?opts[L8H]:opts[a8H];return typeof def === f0?def():def;}D59.S59();opts[M0]=set;return this;},disable:function(){var x0=V0H;x0+=v0H;x0+=n5H;x0+=r9c;var h0=Q3H;h0+=s3H;h0+=c9c;h0+=T8H;var Y0=r9c;Y0+=L3H;Y0+=K3H;this[Y0][f8H][M8H](this[c9c][h0][x0]);this[Y8H](h8H);return this;},displayed:function(){var j8H="ntai";D59.S59();var C0=x8H;C0+=d8H;var j0=D3H;j0+=L3H;j0+=r9c;j0+=y6H;var o0=o8H;o0+=j8H;o0+=C8H;var d0=U8H;d0+=K3H;var container=this[d0][o0];return container[H8H](j0)[C0] && container[b8H](P9H) != i9H?C7H:j7H;},enable:function(){var l9H="contai";var u9H="emoveClass";var D9H="eF";var F9H="_typ";var i4=F9H;i4+=D9H;D59.f59();i4+=A5H;var P4=r9c;P4+=H9c;P4+=c9c;P4+=J9H;var H0=d5H;H0+=u9H;var U0=l9H;U0+=A5H;U0+=l1H;this[k8H][U0][H0](this[c9c][b9H][P4]);this[i4](O9H);return this;},enabled:function(){var D4=k9H;D4+=s3H;D4+=A9H;var F4=U8H;D59.S59();F4+=K3H;return this[F4][f8H][K9H](this[c9c][b9H][D4]) === j7H;},error:function(msg,fn){var n9H='errorMessage';var z9H="dError";var S9H="ontain";var A4=I9c;A4+=r3H;A4+=z9H;var J4=Q3H;J4+=s3H;J4+=q8H;J4+=R9H;var classes=this[c9c][J4];if(msg){var b4=X9H;b4+=r9c;b4+=B9H;b4+=E9H;var l4=w9H;l4+=s3H;l4+=W5H;l4+=l1H;var u4=r9c;u4+=L3H;u4+=K3H;this[u4][l4][b4](classes[q9H]);}else {var k4=l1H;k4+=Q9H;var O4=X4H;O4+=S9H;O4+=m9c;O4+=d5H;this[k8H][O4][N9H](classes[k4]);}this[Y8H](n9H,msg);return this[y9H](this[k8H][A4],msg,fn);},fieldInfo:function(msg){var G9H="_ms";var v9H="eldInfo";var z4=I9c;z4+=v9H;var K4=G9H;K4+=v4H;D59.S59();return this[K4](this[k8H][z4],msg);},isMultiValue:function(){var W9H="multiVa";var R4=W9H;R4+=s9c;R4+=Z9H;return this[c9c][R4] && this[c9c][V9H][o7H] !== s8c;},inError:function(){var E4=e9H;E4+=s3H;E4+=q8H;var B4=r9H;B4+=W5H;B4+=l1H;var X4=r9c;X4+=L3H;X4+=K3H;return this[X4][B4][E4](this[c9c][b9H][q9H]);},input:function(){var p9H='input, select, textarea';var I9H="tainer";var n4=g9H;n4+=I9H;var N4=r9c;N4+=L3H;N4+=K3H;var S4=s9H;S4+=m9H;var Q4=A1H;Q4+=r8H;Q4+=A5H;var q4=c9H;q4+=M9c;var w4=g6H;w4+=l5H;w4+=m9c;return this[c9c][w4][q4]?this[Q4](S4):$(p9H,this[N4][n4]);},focus:function(){var f9H=" t";var T9H="input, select,";var M9H="area";var y4=N3H;y4+=L3H;y4+=X4H;y4+=t9H;if(this[c9c][G6H][y4]){var v4=A1H;v4+=K1H;this[v4](L9H);}else {var Z4=r9H;Z4+=a9H;var W4=r9c;W4+=L3H;W4+=K3H;var G4=T9H;G4+=f9H;G4+=k5H;G4+=M9H;$(G4,this[W4][Z4])[Y6H]();}return this;},get:function(){var Y9H="isMul";var h9H="iValue";var r4=r9c;r4+=m9c;D59.S59();r4+=N3H;var e4=v4H;e4+=z6H;var V4=Y9H;V4+=M9c;V4+=h9H;if(this[V4]()){return undefined;}var val=this[Y8H](e4);return val !== undefined?val:this[r4]();},hide:function(animate){var U9H="deU";var I4=N3H;I4+=A5H;D59.f59();var g4=x9H;g4+=d9H;var el=this[k8H][f8H];if(animate === undefined){animate=C7H;}if(this[c9c][g4][o9H]() && animate && $[I4][j9H]){var s4=c9c;s4+=C9H;s4+=U9H;s4+=l5H;el[s4]();}else {var m4=H9H;m4+=m9c;el[b8H](P9H,m4);}return this;},label:function(str){var a4=C3H;a4+=M9c;a4+=K3H;a4+=s9c;var L4=s9c;L4+=P5r;L4+=L3H;var t4=U8H;t4+=K3H;var p4=k1H;p4+=r3H;var c4=r9c;c4+=L3H;c4+=K3H;var label=this[c4][p4];D59.S59();var labelInfo=this[t4][L4][i5r]();if(str === undefined){return label[F5r]();}label[a4](str);label[D5r](labelInfo);return this;},labelInfo:function(msg){var f4=s9c;f4+=P5r;f4+=L3H;var T4=r9c;D59.f59();T4+=J5r;return this[y9H](this[T4][f4],msg);},message:function(msg,fn){var u5r="fieldMessage";D59.f59();var M4=i3H;M4+=K3H;M4+=c9c;M4+=v4H;return this[M4](this[k8H][u5r],msg,fn);},multiGet:function(id){var k5r="tiValues";var O5r="tiIds";var l5r="MultiValue";var x4=H9c;x4+=c9c;x4+=l5r;var h4=K3H;h4+=b5r;h4+=O5r;var Y4=K3H;Y4+=b5r;Y4+=k5r;var value;var multiValues=this[c9c][Y4];D59.S59();var multiIds=this[c9c][h4];var isMultiValue=this[x4]();if(id === undefined){var d4=f0H;d4+=s3H;d4+=s9c;var fieldVal=this[d4]();value={};for(var i=I8c;i < multiIds[o7H];i++){value[multiIds[i]]=isMultiValue?multiValues[multiIds[i]]:fieldVal;}}else if(isMultiValue){value=multiValues[id];}else {var o4=f0H;o4+=A5r;value=this[o4]();}return value;},multiRestore:function(){var K5r="tiVa";var z5r="lue";var j4=p5H;j4+=K5r;j4+=z5r;this[c9c][j4]=C7H;this[R5r]();},multiSet:function(id,val){var X5r="tiVal";D59.S59();var B5r="iI";var P7=p5H;P7+=X5r;P7+=Z9H;var C4=p5H;C4+=M9c;C4+=B5r;C4+=E5r;var multiValues=this[c9c][w5r];var multiIds=this[c9c][C4];if(val === undefined){val=id;id=undefined;}var set=function(idSrc,val){var Q5r="pus";if($[q5r](multiIds) === -s8c){var U4=Q5r;U4+=C3H;multiIds[U4](idSrc);}multiValues[idSrc]=val;};if($[S5r](val) && id === undefined){var H4=m9c;H4+=H7H;H4+=C3H;$[H4](val,function(idSrc,innerVal){set(idSrc,innerVal);});}else if(id === undefined){$[m7H](multiIds,function(i,idSrc){D59.f59();set(idSrc,val);});}else {set(id,val);}this[c9c][P7]=C7H;this[R5r]();return this;},name:function(){var F7=A5H;F7+=s3H;F7+=P5H;var i7=N5r;i7+=c9c;return this[c9c][i7][F7];},node:function(){var J7=g9H;J7+=S8H;J7+=W5H;J7+=l1H;var D7=r9c;D7+=L3H;D7+=K3H;return this[D7][J7][I8c];},processing:function(set){var y5r="processin";var b7=A5H;b7+=L3H;b7+=A5H;b7+=m9c;var l7=X0H;l7+=n5r;l7+=i1H;var u7=y5r;u7+=v4H;D59.S59();this[k8H][u7][b8H](P9H,set?l7:b7);return this;},set:function(val,multiCheck){var f5r="_mu";var W5r="multiValu";var a5r="isArr";var v5r="entityDe";var M5r="ltiValueCheck";var G5r="cod";var T5r='set';var K7=v5r;K7+=G5r;K7+=m9c;var A7=W5r;A7+=m9c;var decodeFn=function(d){var c5r='"';var t5r='\'';var L5r='\n';var s5r='<';var p5r='£';var I5r='>';var k7=d5H;k7+=Z5r;var O7=d5H;O7+=m9c;O7+=V5r;O7+=e5r;return typeof d !== r5r?d:d[g5r](/&gt;/g,I5r)[O7](/&lt;/g,s5r)[g5r](/&amp;/g,m5r)[g5r](/&quot;/g,c5r)[k7](/&#163;/g,p5r)[g5r](/&#39;/g,t5r)[g5r](/&#10;/g,L5r);};this[c9c][A7]=j7H;var decode=this[c9c][N8H][K7];D59.S59();if(decode === undefined || decode === C7H){var z7=a5r;z7+=s3H;z7+=y6H;if($[z7](val)){for(var i=I8c,ien=val[o7H];i < ien;i++){val[i]=decodeFn(val[i]);}}else {val=decodeFn(val);}}this[Y8H](T5r,val);if(multiCheck === undefined || multiCheck === C7H){var R7=f5r;R7+=M5r;this[R7]();}return this;},show:function(animate){var j5r="deDown";var d5r="ainer";var h5r="deD";var Q7=Y5r;Q7+=H9c;Q7+=h5r;Q7+=x5r;var q7=N3H;q7+=A5H;var w7=k9H;D59.S59();w7+=V5r;w7+=O4H;var E7=C3H;E7+=L3H;E7+=c9c;E7+=M9c;var B7=g9H;B7+=M9c;B7+=d5r;var X7=r9c;X7+=J5r;var el=this[X7][B7];if(animate === undefined){animate=C7H;}if(this[c9c][E7][w7]() && animate && $[q7][Q7]){var S7=o5r;S7+=j5r;el[S7]();}else {var N7=r9c;N7+=H9c;N7+=W4H;el[b8H](N7,B7H);;}return this;},val:function(val){var y7=c9c;y7+=z6H;var n7=v4H;n7+=m9c;n7+=M9c;return val === undefined?this[n7]():this[y7](val);},compare:function(value,original){var v7=o8H;v7+=K3H;v7+=l5H;v7+=C5r;var compare=this[c9c][N8H][v7] || _deepCompare;return compare(value,original);},dataSrc:function(){D59.S59();var G7=L3H;G7+=U5r;G7+=c9c;return this[c9c][G7][D2H];},destroy:function(){var H5r="destr";var e7=H5r;D59.f59();e7+=P3r;var V7=A1H;V7+=M6H;V7+=s4H;V7+=A5H;var Z7=i3r;Z7+=L3H;Z7+=F3r;var W7=o8H;W7+=D3r;W7+=H9c;W7+=C8H;this[k8H][W7][Z7]();this[V7](e7);return this;},multiEditable:function(){var J3r="tiEditab";var g7=W8H;g7+=s9c;g7+=J3r;g7+=D4H;var r7=L3H;r7+=l5H;r7+=M9c;r7+=c9c;return this[c9c][r7][g7];},multiIds:function(){return this[c9c][V9H];},multiInfoShown:function(show){var I7=D3H;I7+=s9c;I7+=u3r;D59.S59();this[k8H][h2H][b8H]({display:show?I7:i9H});},multiReset:function(){var O3r="ltiIds";var l3r="multiVal";var b3r="ues";var m7=l3r;m7+=b3r;var s7=K3H;s7+=a3H;s7+=O3r;this[c9c][s7]=[];this[c9c][m7]={};},submittable:function(){var c7=L3H;D59.S59();c7+=l5H;c7+=k3r;return this[c9c][c7][I6H];},valFromData:D8H,valToData:D8H,_errorNode:function(){var A3r="fieldError";var p7=U8H;p7+=K3H;return this[p7][A3r];},_msg:function(el,msg,fn){var q3r="deDo";var K3r="arent";var E3r=":visible";var M7=l5H;M7+=K3r;var L7=z3r;L7+=R3r;L7+=A5H;if(msg === undefined){var t7=C3H;t7+=X3r;t7+=s9c;return el[t7]();}if(typeof msg === L7){var f7=M9c;f7+=L7H;f7+=D4H;var T7=I5H;T7+=l5H;T7+=H9c;var a7=x9H;a7+=c9c;a7+=M9c;var editor=this[c9c][a7];msg=msg(editor,new DataTable[T7](editor[c9c][f7]));}if(el[M7]()[B3r](E3r) && $[Z7H][w3r]){el[F5r](msg);if(msg){var Y7=o5r;Y7+=q3r;Y7+=E6H;Y7+=A5H;el[Y7](fn);;}else {el[j9H](fn);}}else {var h7=X4H;h7+=c9c;h7+=c9c;el[F5r](msg || B7H)[h7](P9H,msg?Q3r:i9H);if(fn){fn();}}D59.f59();return this;},_multiValueCheck:function(){var n3r="ulti";var s3r="ultiV";var g3r="multiE";var p3r="nputControl";var m3r="alue";var e3r="urn";var V3r="iRet";var W3r="lock";var a3r="inputControl";var I3r="ditable";var y3r="Info";var f3r="noMulti";var Y3r="multiNoEdit";var r3r="isMultiValu";var S3r="_multiI";var v3r="hos";var q1=S3r;q1+=T5H;var w1=X4H;w1+=N3r;w1+=R9H;var E1=K3H;E1+=n3r;var B1=H9c;B1+=A5H;B1+=N3H;B1+=L3H;var X1=p5H;X1+=k2H;X1+=y3r;var R1=r9c;R1+=L3H;R1+=K3H;var z1=v3r;z1+=M9c;var K1=A5H;K1+=L3H;K1+=G3r;var A1=D3H;A1+=W3r;var k1=D4H;k1+=Z3r;var O1=X4H;O1+=c9c;O1+=c9c;var b1=K3H;b1+=r1H;b1+=V3r;b1+=e3r;var j7=r3r;j7+=m9c;var d7=g3r;d7+=I3r;var x7=K3H;x7+=s3r;x7+=m3r;var last;var ids=this[c9c][V9H];var values=this[c9c][w5r];var isMultiValue=this[c9c][x7];var isMultiEditable=this[c9c][N8H][d7];var val;var different=j7H;if(ids){var o7=x8H;o7+=v4H;o7+=c3r;for(var i=I8c;i < ids[o7];i++){val=values[ids[i]];if(i > I8c && !_deepCompare(val,last)){different=C7H;break;}last=val;}}if(different && isMultiValue || !isMultiEditable && this[j7]()){var i1=K3H;i1+=a3H;i1+=H3H;var P1=r9c;P1+=J5r;var H7=X4H;H7+=c9c;H7+=c9c;var U7=H9c;U7+=p3r;var C7=r9c;C7+=J5r;this[C7][U7][H7]({display:i9H});this[P1][i1][b8H]({display:Q3r});}else {var u1=W8H;u1+=H3H;var J1=r9c;J1+=J5r;var D1=t3r;D1+=X4H;D1+=i1H;var F1=L3r;F1+=c9c;this[k8H][a3r][F1]({display:D1});this[J1][u1][b8H]({display:i9H});if(isMultiValue && !different){var l1=c9c;l1+=m9c;l1+=M9c;this[l1](last,j7H);}}this[k8H][b1][O1]({display:ids && ids[k1] > s8c && different && !isMultiValue?A1:K1});var i18n=this[c9c][z1][T3r][X8H];this[R1][X1][F5r](isMultiEditable?i18n[B1]:i18n[f3r]);this[k8H][E1][M3r](this[c9c][w1][Y3r],!isMultiEditable);this[c9c][h3r][q1]();return C7H;},_typeFn:function(name){var N1=M9c;N1+=o0H;N1+=m9c;var S1=X4H;S1+=x3r;var Q1=c9c;Q1+=C9H;Q1+=D0H;var args=Array[I8H][Q1][S1](arguments);args[d3r]();args[m8H](this[c9c][N8H]);var fn=this[c9c][N1][name];if(fn){var n1=V8H;n1+=e8H;return fn[n1](this[c9c][h3r],args);}}};Editor[U7H][A8H]={};Editor[y1][o3r]={"className":D59.v9c,"data":D59.v9c,"def":D59.v9c,"fieldInfo":D59.v9c,"id":D59.v9c,"label":D59.v9c,"labelInfo":D59.v9c,"name":D8H,"type":v1,"message":D59.v9c,"multiEditable":C7H,"submit":C7H};Editor[U7H][A8H][B2H]={type:D8H,name:D8H,classes:D8H,opts:D8H,host:D8H};Editor[U7H][G1][k8H]={container:D8H,label:D8H,labelInfo:D8H,fieldInfo:D8H,fieldError:D8H,fieldMessage:D8H};Editor[W1]={};Editor[A8H][j3r]={"init":function(dte){},"open":function(dte,append,fn){},"close":function(dte,fn){}};Editor[A8H][C3r]={"create":function(conf){},"get":function(conf){},"set":function(conf,val){},"enable":function(conf){},"disable":function(conf){}};Editor[A8H][Z1]={"ajaxUrl":D8H,"ajax":D8H,"dataSource":D8H,"domTable":D8H,"opts":D8H,"displayController":D8H,"fields":{},"order":[],"id":-s8c,"displayed":j7H,"processing":j7H,"modifier":D8H,"action":D8H,"idSrc":D8H,"unique":I8c};Editor[V1][U3r]={"label":D8H,"fn":D8H,"className":D8H};Editor[A8H][H3r]={onReturn:P6r,onBlur:i6r,onBackground:e1,onComplete:i6r,onEsc:r1,onFieldError:L9H,submit:F6r,focus:I8c,buttons:C7H,title:C7H,message:C7H,drawType:j7H,scope:g1};Editor[I1]={};(function(){var O6r="ground\"><div/></div>";var h6r="_Lig";var x6r="htbox";var E6r="DTED_Lightbox_Wrapper";var X6r="ontainer\">";var u6r="isplay";var K6r="<div class=\"DTED_Lightbox_Content";var A0r="offsetAni";var w6r="gh";var R6r="<div class=\"DTED_Lightbox_C";var V6r="_shown";var J6r="htbo";var B6r="<div class=\"DTED ";var q6r="tbo";var V4r='<div class="DTED_Lightbox_Close"></div>';var D6r="ig";var c6r="rappe";var Z4r='<div class="DTED_Lightbox_Content_Wrapper">';var b6r="iv class=\"DTED_Lightbox_Back";var V0r="_scrollTop";var N8=X4H;N8+=L3H;N8+=A5H;N8+=N3H;var S8=s9c;S8+=D6r;S8+=J6r;S8+=P2H;var Q8=r9c;D59.S59();Q8+=u6r;var q8=l6r;q8+=b6r;q8+=O6r;var w8=k6r;w8+=f0H;w8+=S1H;var E8=s1H;E8+=A6r;var B8=k6r;B8+=M1H;var X8=K6r;X8+=z6r;var R8=R6r;R8+=X6r;var z8=B6r;z8+=E6r;z8+=z6r;var p1=K3H;p1+=d6H;p1+=s9c;p1+=c9c;var c1=f9c;c1+=J5H;c1+=A5H;c1+=r9c;var m1=C9H;m1+=w6r;m1+=q6r;m1+=P2H;var s1=r9c;s1+=Q6r;s1+=s3H;s1+=y6H;var self;Editor[s1][m1]=$[c1](C7H,{},Editor[p1][j3r],{"init":function(dte){self[S6r]();return self;},"open":function(dte,append,callback){var v6r="childr";var Y1=Q3H;Y1+=N6r;var M1=n6r;M1+=r9c;var f1=y6r;f1+=A5H;f1+=r9c;var T1=v6r;T1+=G6r;var a1=o8H;a1+=W6r;var L1=Z6r;L1+=K3H;var t1=i3H;t1+=r9c;t1+=M9c;t1+=m9c;if(self[V6r]){if(callback){callback();}return;}self[t1]=dte;var content=self[L1][a1];content[T1]()[i5r]();content[f1](append)[M1](self[e6r][Y1]);self[V6r]=C7H;self[r6r](callback);},"close":function(dte,callback){var g6r="shown";var x1=i3H;x1+=C3H;x1+=E2H;x1+=m9c;var h1=i3H;h1+=g6r;if(!self[h1]){if(callback){callback();}return;}D59.S59();self[I6r]=dte;self[x1](callback);self[V6r]=j7H;},node:function(dte){D59.f59();return self[e6r][e2H][I8c];},"_init":function(){var s6r="ackgroun";var p6r="wrappe";var a6r='div.DTED_Lightbox_Content';var m6r="acit";var H1=D3H;H1+=s6r;H1+=r9c;var U1=L3H;U1+=l5H;U1+=m6r;U1+=y6H;var C1=E6H;C1+=c6r;C1+=d5H;var j1=p6r;j1+=d5H;var d1=i3H;d1+=r9c;d1+=L3H;D59.f59();d1+=K3H;if(self[t6r]){return;}var dom=self[d1];dom[L6r]=$(a6r,self[e6r][j1]);dom[C1][b8H](U1,I8c);dom[H1][b8H](T6r,I8c);},"_show":function(callback){var u0r="hei";var e0r="scrollTop";var i0r="_Lightbox";var b0r="tati";var s0r="ightbox";var f6r="rientatio";var C6r="bac";var t0r="not";var o6r="DTED_Li";var r0r="div.DTED_Lightbox_Sh";var U6r="kgrou";var v0r='resize.DTED_Lightbox';var I0r="ass=\"DTED_L";var k0r='DTED_Lightbox_Mobile';var m0r="_Shown\"/>";var P0r="DTED";var l0r="orien";var O0r="addC";var H6r="ick.";var e2=L3H;e2+=f6r;e2+=A5H;var V2=D3H;V2+=L3H;V2+=r9c;V2+=y6H;var W2=D3H;W2+=M6r;var G2=Y6r;G2+=C9c;G2+=h6r;G2+=x6r;var y2=D3H;y2+=H9c;y2+=A5H;y2+=r9c;var N2=d6r;N2+=o6r;N2+=j6r;N2+=S6H;var S2=C6r;S2+=U6r;S2+=A5H;S2+=r9c;var q2=Q3H;q2+=H6r;q2+=P0r;q2+=i0r;var w2=F0r;w2+=I3H;var R2=D0r;R2+=J0r;R2+=l5H;R2+=l1H;var z2=E6H;z2+=c6r;z2+=d5H;var A2=J0r;A2+=l5H;A2+=m9c;A2+=I3H;var k2=D3H;k2+=L3H;k2+=r9c;k2+=y6H;var O2=X4H;O2+=L3H;O2+=F1H;var b2=L3r;b2+=c9c;var l2=s3H;l2+=a3H;l2+=M9c;l2+=L3H;var u2=u0r;u2+=j6r;var J2=L3r;J2+=c9c;var i2=l0r;D59.f59();i2+=b0r;i2+=G8H;var P2=i3H;P2+=r9c;P2+=L3H;P2+=K3H;var that=this;var dom=self[P2];if(window[i2] !== undefined){var D2=O0r;D2+=s9c;D2+=E9H;var F2=D3H;F2+=L3H;F2+=r9c;F2+=y6H;$(F2)[D2](k0r);}dom[L6r][J2](u2,l2);dom[e2H][b2]({top:-self[O2][A0r]});$(k2)[A2](self[e6r][K0r])[D5r](self[e6r][z2]);self[z0r]();self[I6r][R0r](dom[R2],{opacity:s8c,top:I8c},callback);self[I6r][R0r](dom[K0r],{opacity:s8c});setTimeout(function(){var q0r='text-indent';var E0r="TE_Fo";var B0r=".D";var w0r="oter";var X0r="div";var E2=X4H;E2+=c9c;E2+=c9c;var X2=X0r;X2+=B0r;X2+=E0r;X2+=w0r;$(X2)[E2](q0r,-s8c);},f8c);dom[l0H][w2](q2,function(e){var Q2=X4H;Q2+=Z4H;Q2+=c9c;D59.f59();Q2+=m9c;self[I6r][Q2]();});dom[S2][Q0r](N2,function(e){var S0r="backgro";var n2=S0r;n2+=K4H;self[I6r][n2]();});$(N0r,dom[e2H])[y2](G2,function(e){var y0r='DTED_Lightbox_Content_Wrapper';D59.f59();if($(e[n0r])[K9H](y0r)){self[I6r][K0r]();}});$(window)[W2](v0r,function(){var W0r="tCa";var G0r="heigh";D59.S59();var Z2=i3H;Z2+=G0r;Z2+=W0r;Z2+=Z0r;self[Z2]();});self[V0r]=$(V2)[e0r]();if(window[e2] !== undefined){var c2=y6r;c2+=I3H;var m2=r0r;m2+=x5r;var s2=g0r;s2+=I0r;s2+=s0r;s2+=m0r;var I2=D3H;I2+=L3H;I2+=r9c;I2+=y6H;var g2=D0r;g2+=J0r;g2+=h7H;var r2=D3H;r2+=H7H;r2+=U6r;r2+=I3H;var kids=$(c0r)[p0r]()[t0r](dom[r2])[t0r](dom[g2]);$(I2)[D5r](s2);$(m2)[c2](kids);}},"_heightCalc":function(){var f0r="_Body_C";var h0r="ote";var a0r="xHeight";D59.S59();var x0r="ou";var Y0r="div.DTE_Fo";var o0r="indowPadding";var d0r="terHei";var Y2=L0r;Y2+=a0r;var M2=T0r;M2+=P3H;M2+=f0r;M2+=M0r;var T2=Y0r;T2+=h0r;T2+=d5H;var a2=x0r;a2+=d0r;a2+=j6r;var L2=E6H;L2+=o0r;var t2=j0r;t2+=H9c;t2+=v4H;t2+=C0r;var p2=i3H;p2+=r9c;p2+=L3H;p2+=K3H;var dom=self[p2];var maxHeight=$(window)[t2]() - self[U0r][L2] * m8c - $(H0r,dom[e2H])[a2]() - $(T2,dom[e2H])[P4r]();$(M2,dom[e2H])[b8H](Y2,maxHeight);},"_hide":function(callback){var R4r="sc";var X4r="llTop";var O4r="nbi";var w4r="ori";var A4r="_anim";var n4r='div.DTED_Lightbox_Shown';var q4r="entat";var l4r="_Wrapper";var F4r="ze.DTED";var D4r="unb";var i4r="resi";var B4r="DTED_Lightbo";var E4r="x_Mobi";var G4r='click.DTED_Lightbox';var b4r="gro";var u4r="div.DTED_Lightbox_Content";var K8=i4r;K8+=F4r;K8+=h6r;K8+=x6r;var A8=D4r;A8+=M6r;var k8=J4r;k8+=F0r;k8+=A5H;k8+=r9c;var O8=u4r;O8+=l4r;var b8=y4H;b8+=b4r;b8+=a3H;b8+=I3H;var l8=a3H;l8+=O4r;l8+=I3H;var u8=k4r;u8+=c9c;u8+=m9c;var D8=A4r;D8+=X6H;var F8=X4H;F8+=L3H;F8+=A5H;F8+=N3H;var i8=E6H;i8+=K4r;i8+=z4r;i8+=d5H;var P8=S0H;P8+=L0r;P8+=J5H;var U2=R4r;U2+=b5H;U2+=X4r;var C2=B4r;C2+=E4r;C2+=D4H;var h2=w4r;h2+=q4r;h2+=Q4r;D59.f59();var dom=self[e6r];if(!callback){callback=function(){};}if(window[h2] !== undefined){var j2=a0H;j2+=K3H;j2+=S4r;var d2=N4r;d2+=r9c;d2+=y6H;var show=$(n4r);show[p0r]()[y4r](d2);show[j2]();}$(c0r)[N9H](C2)[U2](self[V0r]);self[I6r][P8](dom[i8],{opacity:I8c,top:self[F8][A0r]},function(){$(this)[i5r]();callback();});self[I6r][D8](dom[K0r],{opacity:I8c},function(){var J8=v4r;J8+=s3H;J8+=X4H;J8+=C3H;D59.S59();$(this)[J8]();});dom[u8][l8](G4r);dom[b8][W4r](G4r);$(O8,dom[e2H])[k8](G4r);$(window)[A8](K8);},"_dte":D8H,"_ready":j7H,"_shown":j7H,"_dom":{"wrapper":$(z8 + R8 + Z4r + X8 + B8 + d2H + E8 + w8),"background":$(q8),"close":$(V4r),"content":D8H}});self=Editor[Q8][S8];self[N8]={"offsetAni":U8c,"windowPadding":U8c};})();(function(){var P7r="ba";var s4r="_Wrapper\">";var B9c=600;var h4r="dren";var a1r='<div class="DTED_Envelope_Shadow"></div>';var e4r="velope";var d7r='normal';var T1r='<div class="DTED_Envelope_Background"><div/></div>';var H7r="windowPadding";var I4r="<div class=\"DTED DTED_Envelop";var g4r="lass=\"DTED_Envelope_Container\"></div>";var x7r="offsetHeight";var f1r='<div class="DTED_Envelope_Close">&times;</div>';var R1r="rap";var l9c=50;var c4r="ope";var f5g=b5H;f5g+=E6H;var T5g=m9c;T5g+=A5H;T5g+=e4r;var a5g=l6r;a5g+=r4r;a5g+=g4r;var L5g=I4r;L5g+=m9c;L5g+=s4r;var v8=f9c;v8+=M9c;v8+=m4r;var y8=G6r;y8+=f0H;y8+=r3H;y8+=c4r;var n8=r9c;n8+=B3r;n8+=l5H;n8+=p4r;var self;Editor[n8][y8]=$[v8](C7H,{},Editor[A8H][j3r],{"init":function(dte){var G8=i3H;G8+=r9c;G8+=M9c;G8+=m9c;self[G8]=dte;self[S6r]();return self;},"open":function(dte,append,callback){var M4r="deta";var f4r="ndChi";var L4r="how";var Y4r="chil";var T4r="appendChil";var c8=t4r;c8+=L4r;var m8=X4H;m8+=s9c;m8+=a4r;m8+=m9c;var s8=T4r;s8+=r9c;var I8=i3H;I8+=k8H;var g8=V8H;g8+=m9c;g8+=f4r;g8+=m4H;var r8=i0H;r8+=L3H;r8+=K3H;var e8=M4r;e8+=v3H;var V8=Y4r;V8+=h4r;var Z8=i3H;Z8+=r9c;Z8+=L3H;Z8+=K3H;var W8=i0H;W8+=J5H;self[W8]=dte;$(self[Z8][L6r])[V8]()[e8]();self[r8][L6r][g8](append);self[I8][L6r][s8](self[e6r][m8]);self[c8](callback);},"close":function(dte,callback){var p8=i3H;p8+=x4r;self[p8]=dte;D59.f59();self[d4r](callback);},node:function(dte){var t8=i3H;t8+=r9c;t8+=L3H;t8+=K3H;return self[t8][e2H][I8c];},"_init":function(){var j4r="sib";var b7r="_cssBackgroundOpacity";var l7r='hidden';var F7r="ackgro";var J7r='div.DTED_Envelope_Container';var u7r="visbility";var o4r="vi";var D7r="rapper";var i7r="kgro";var C4r="bilit";var P9=o4r;P9+=j4r;P9+=D4H;var H8=o4r;H8+=c9c;H8+=C4r;H8+=y6H;var U8=i3H;U8+=r9c;U8+=L3H;U8+=K3H;var C8=V0H;C8+=U4r;C8+=O4H;var j8=c9c;j8+=M9c;j8+=H4r;j8+=m9c;var o8=P7r;o8+=X4H;o8+=i7r;o8+=K4H;var d8=Z6r;d8+=K3H;var x8=X4H;x8+=c9c;x8+=c9c;var h8=i3H;h8+=r9c;h8+=L3H;h8+=K3H;var Y8=d9H;Y8+=y6H;Y8+=s9c;Y8+=m9c;var M8=D3H;M8+=F7r;M8+=a3H;M8+=I3H;var f8=d9H;f8+=y6H;f8+=s9c;f8+=m9c;var T8=E6H;T8+=D7r;var a8=i0H;a8+=J5r;var L8=X4H;L8+=L3H;L8+=W6r;if(self[t6r]){return;}self[e6r][L8]=$(J7r,self[a8][T8])[I8c];self[e6r][K0r][f8][u7r]=l7r;self[e6r][M8][Y8][o9H]=Q3r;self[b7r]=$(self[h8][K0r])[x8](T6r);self[d8][o8][j8][C8]=i9H;self[U8][K0r][O7r][H8]=P9;},"_show":function(callback){var A7r="Envelope";var e7r="Left";var j7r="offsetHe";var f7r="opacity";var Q7r="ckgr";var X7r="ED";var O1r='resize.DTED_Envelope';var L7r="appendChild";var q7r="cssBa";var E7r="fad";var S7r="oundOpacity";var y7r="paci";var I7r="offsetWi";var Y7r="px";var R7r="ckground";var c7r="ndAttachRo";var i1r="imate";var o7r="windowScroll";var V7r="margin";var K7r="bin";var B7r="_Envelope";var z7r="D_Envelope";var U7r="html,";var m7r="heightCa";var s7r="dth";var T7r='auto';var k7r="lick.DTED_";var C9=X4H;C9+=k7r;C9+=A7r;var j9=K7r;j9+=r9c;var o9=D0r;o9+=V8H;o9+=m9c;o9+=d5H;var d9=i3H;d9+=U8H;d9+=K3H;var h9=Y6r;h9+=z7r;var Y9=P7r;Y9+=R7r;var f9=d6r;f9+=f5H;f9+=X7r;f9+=B7r;var T9=D3H;T9+=H9c;T9+=A5H;T9+=r9c;var a9=Q3H;a9+=N6r;var g9=X4H;g9+=L3H;g9+=A5H;g9+=N3H;var r9=E7r;r9+=m9c;r9+=w7r;var e9=i3H;e9+=q7r;e9+=Q7r;e9+=S7r;var V9=N7r;V9+=n7r;V9+=X6H;var Z9=i0H;Z9+=L3H;Z9+=K3H;var W9=c9c;W9+=M9c;W9+=y6H;W9+=D4H;var G9=i0H;G9+=L3H;G9+=K3H;var v9=L3H;v9+=y7r;v9+=g6H;var y9=l5H;y9+=P2H;var n9=v7r;n9+=G7r;var N9=W7r;N9+=N3H;N9+=Z7r;var S9=c9c;S9+=M9c;S9+=y6H;S9+=D4H;var Q9=Z6r;Q9+=K3H;var q9=l5H;q9+=P2H;var w9=V7r;w9+=e7r;var E9=d9H;E9+=r7r;var B9=d9H;B9+=y6H;B9+=D4H;var X9=E6H;X9+=d5H;X9+=y6r;X9+=d5H;var R9=i0H;R9+=J5r;var z9=g7r;z9+=s9c;z9+=s3H;z9+=y6H;var K9=I7r;K9+=s7r;var A9=i3H;A9+=m7r;A9+=Z0r;var k9=i3H;k9+=I9c;k9+=c7r;k9+=E6H;var O9=X0H;O9+=L3H;O9+=X4H;O9+=i1H;var b9=V0H;b9+=U4r;b9+=O4H;var l9=c9c;l9+=M9c;l9+=y6H;l9+=D4H;var u9=c9c;u9+=M9c;u9+=y6H;u9+=D4H;var J9=o8H;J9+=G7r;J9+=A4H;var D9=Z6r;D9+=K3H;var F9=D0r;F9+=s3H;F9+=p7r;var i9=i3H;i9+=U8H;i9+=K3H;var that=this;var formHeight;if(!callback){callback=function(){};}document[t7r][L7r](self[e6r][K0r]);document[t7r][L7r](self[i9][F9]);self[D9][J9][u9][a7r]=T7r;var style=self[e6r][e2H][l9];style[f7r]=I8c;style[b9]=O9;var targetRow=self[k9]();var height=self[A9]();var width=targetRow[K9];style[z9]=i9H;style[f7r]=s8c;self[R9][X9][B9][M7r]=width + Y7r;self[e6r][e2H][E9][w9]=-(width / m8c) + q9;self[Q9][e2H][S9][h7r]=$(targetRow)[N9]()[h7r] + targetRow[x7r] + Y7r;self[e6r][n9][O7r][h7r]=-s8c * height - o8c + y9;self[e6r][K0r][O7r][v9]=I8c;self[G9][K0r][W9][o9H]=Q3r;$(self[Z9][K0r])[V9]({'opacity':self[e9]},d7r);$(self[e6r][e2H])[r9]();if(self[g9][o7r]){var c9=j7r;c9+=H9c;c9+=j6r;var m9=L3H;m9+=N3H;m9+=C7r;var s9=N7r;s9+=H9c;s9+=N0H;s9+=m9c;var I9=U7r;I9+=N4r;I9+=E3H;$(I9)[s9]({"scrollTop":$(targetRow)[m9]()[h7r] + targetRow[c9] - self[U0r][H7r]},function(){var t9=g9H;t9+=P1r;var p9=i0H;p9+=L3H;p9+=K3H;D59.S59();$(self[p9][t9])[w3r]({"top":I8c},B9c,callback);});}else {var L9=N7r;L9+=i1r;$(self[e6r][L6r])[L9]({"top":I8c},B9c,callback);}$(self[e6r][a9])[T9](f9,function(e){var M9=Q3H;M9+=L3H;M9+=c9c;M9+=m9c;self[I6r][M9]();});$(self[e6r][Y9])[Q0r](h9,function(e){var F1r="ackgr";D59.f59();var D1r="ound";var x9=D3H;x9+=F1r;x9+=D1r;self[I6r][x9]();});$(N0r,self[d9][o9])[j9](C9,function(e){var b1r="nt_Wrapper";var l1r="Conte";var J1r="DTED_";var u1r="Envelope_";var H9=J1r;H9+=u1r;H9+=l1r;H9+=b1r;var U9=S8H;U9+=d5H;U9+=v4H;U9+=z6H;if($(e[U9])[K9H](H9)){self[I6r][K0r]();}});$(window)[Q0r](O1r,function(){self[z0r]();});},"_heightCalc":function(){var B1r="heightCalc";var w1r='div.DTE_Body_Content';var E1r='div.DTE_Footer';var X1r="heightCal";var q1r='maxHeight';var z1r="eig";var K1r="uterH";var A1r="dt";var k1r="uterHe";var K5g=L3H;D59.f59();K5g+=k1r;K5g+=H9c;K5g+=j6r;var A5g=r9c;A5g+=L3H;A5g+=K3H;var k5g=i3H;k5g+=A1r;k5g+=m9c;var O5g=E6H;O5g+=K4r;O5g+=z4r;O5g+=d5H;var b5g=i3H;b5g+=U8H;b5g+=K3H;var l5g=L3H;l5g+=K1r;l5g+=z1r;l5g+=C0r;var u5g=E6H;u5g+=R1r;u5g+=M6H;u5g+=d5H;var J5g=X4H;J5g+=L3H;J5g+=A5H;J5g+=N3H;var D5g=C3H;D5g+=m9c;D5g+=H9c;D5g+=j6r;var F5g=v3H;F5g+=d3H;F5g+=h4r;var i5g=Z6r;i5g+=K3H;var P5g=X1r;P5g+=X4H;var formHeight;formHeight=self[U0r][P5g]?self[U0r][B1r](self[e6r][e2H]):$(self[i5g][L6r])[F5g]()[D5g]();var maxHeight=$(window)[a7r]() - self[J5g][H7r] * m8c - $(H0r,self[e6r][u5g])[l5g]() - $(E1r,self[e6r][e2H])[P4r]();$(w1r,self[b5g][O5g])[b8H](q1r,maxHeight);return $(self[k5g][A5g][e2H])[K5g]();},"_hide":function(callback){var n1r=".DTED_Lightbox";var W1r="ghtbo";var S1r="ize.DTED_Lightbox";var G1r="_Li";var Z1r="nb";var y1r="wrap";var e1r="D_Lightbox";var V1r="backgrou";var v1r="click.DTED";var W5g=Q1r;W5g+=S1r;var G5g=a3H;G5g+=A5H;G5g+=F0r;G5g+=I3H;var v5g=N1r;v5g+=n1r;var y5g=y1r;y5g+=l5H;y5g+=l1H;var n5g=v1r;n5g+=G1r;n5g+=W1r;n5g+=P2H;var N5g=a3H;N5g+=Z1r;N5g+=W5H;N5g+=r9c;var S5g=V1r;S5g+=I3H;var Q5g=Y6r;Q5g+=e1r;var q5g=J4r;q5g+=F0r;q5g+=I3H;var w5g=i3H;w5g+=U8H;w5g+=K3H;var X5g=i3H;X5g+=r9c;X5g+=J5r;var R5g=o8H;R5g+=G7r;R5g+=m9c;R5g+=G7r;var z5g=i3H;z5g+=U8H;z5g+=K3H;if(!callback){callback=function(){};}$(self[z5g][R5g])[w3r]({"top":-(self[X5g][L6r][x7r] + l9c)},B9c,function(){var B5g=E6H;B5g+=R1r;D59.f59();B5g+=h7H;$([self[e6r][B5g],self[e6r][K0r]])[r1r](d7r,function(){var E5g=i3r;E5g+=L3H;E5g+=F3r;$(this)[E5g]();callback();});});$(self[w5g][l0H])[q5g](Q5g);$(self[e6r][S5g])[N5g](n5g);$(N0r,self[e6r][y5g])[W4r](v5g);$(window)[G5g](W5g);},"_findAttachRow":function(){var g1r="hea";var c1r="head";var t1r="eade";var m5g=i3H;m5g+=r9c;m5g+=M9c;m5g+=m9c;var g5g=g1r;g5g+=r9c;D59.S59();var r5g=s3H;r5g+=I1r;r5g+=s1r;var e5g=X4H;e5g+=L3H;e5g+=A5H;e5g+=N3H;var V5g=i3H;V5g+=r9c;V5g+=M9c;V5g+=m9c;var Z5g=I5H;Z5g+=l5H;Z5g+=H9c;var dt=new $[Z7H][q7H][Z5g](self[V5g][c9c][m1r]);if(self[e5g][r5g] === g5g){var s5g=c1r;s5g+=l1H;var I5g=M9c;I5g+=s3H;I5g+=X0H;I5g+=m9c;return dt[I5g]()[s5g]();}else if(self[m5g][c9c][p1r] === F8H){var c5g=C3H;c5g+=t1r;c5g+=d5H;return dt[m1r]()[c5g]();}else {var t5g=C0H;t5g+=r9c;t5g+=m9c;var p5g=b5H;p5g+=E6H;return dt[p5g](self[I6r][c9c][L1r])[t5g]();}},"_dte":D8H,"_ready":j7H,"_cssBackgroundOpacity":s8c,"_dom":{"wrapper":$(L5g + a1r + a5g + d2H)[I8c],"background":$(T1r)[I8c],"close":$(f1r)[I8c],"content":D8H}});self=Editor[o9H][T5g];self[U0r]={"windowPadding":l9c,"heightCalc":D8H,"attach":f5g,"windowScroll":C7H};})();Editor[I8H][M5g]=function(cfg,after){var D2r="ultiRese";var b2r="ord";var i2r="ield '";var Y1r="reve";var F2r='initField';var U1r="A field already ex";var C1r="'. ";var j1r="Error adding field. The field requires a `name` option";var O2r="orde";var P2r="Error adding f";var J2r="ditField";var H1r="ists with this name";if($[M1r](cfg)){if(after !== undefined){var Y5g=Y1r;Y5g+=d5H;Y5g+=c9c;Y5g+=m9c;cfg[Y5g]();}for(var i=I8c;i < cfg[o7H];i++){var h5g=s3H;h5g+=r9c;h5g+=r9c;this[h5g](cfg[i],after);}}else {var H5g=h1r;H5g+=q5H;H5g+=c9c;var U5g=s4H;U5g+=H9c;U5g+=V5H;var C5g=i0H;C5g+=s3H;C5g+=x1r;C5g+=d1r;var d5g=o1r;d5g+=c9c;var x5g=A5H;x5g+=u2H;x5g+=m9c;var name=cfg[x5g];if(name === undefined){throw j1r;}if(this[c9c][d5g][name]){var j5g=C1r;j5g+=U1r;j5g+=H1r;var o5g=P2r;o5g+=i2r;throw o5g + name + j5g;}this[C5g](F2r,cfg);var field=new Editor[U5g](cfg,this[H5g][o1r],this);if(this[c9c][r4H]){var F3g=m9c;F3g+=H7H;F3g+=C3H;var i3g=K3H;i3g+=D2r;i3g+=M9c;var P3g=m9c;P3g+=J2r;P3g+=c9c;var editFields=this[c9c][P3g];field[i3g]();$[F3g](editFields,function(idSrc,edit){var u2r="iSet";var J3g=r9c;J3g+=m9c;J3g+=N3H;var D3g=W8H;D3g+=s9c;D3g+=M9c;D3g+=u2r;var val;if(edit[D2H]){val=field[N2H](edit[D2H]);}field[D3g](idSrc,val !== undefined?val:field[J3g]());});}this[c9c][l2r][name]=field;if(after === undefined){this[c9c][P0H][c7H](name);}else if(after === D8H){var u3g=b2r;u3g+=m9c;u3g+=d5H;this[c9c][u3g][m8H](name);}else {var b3g=O2r;b3g+=d5H;var l3g=L3H;l3g+=d5H;l3g+=k2r;var idx=$[q5r](after,this[c9c][l3g]);this[c9c][b3g][A2r](idx + s8c,I8c,name);}}this[K2r](this[P0H]());return this;};Editor[I8H][y0H]=function(newAjax){if(newAjax){var O3g=z2r;O3g+=s3H;O3g+=P2H;this[c9c][O3g]=newAjax;return this;}return this[c9c][y0H];};Editor[k3g][A3g]=function(){var B2r="editO";var w2r="onBackground";var B3g=R2r;B3g+=D3H;D59.S59();B3g+=X2r;var X3g=X4H;X3g+=Z4H;X3g+=q5H;var z3g=D3H;z3g+=s9c;z3g+=a3H;z3g+=d5H;var K3g=B2r;K3g+=E2r;var onBackground=this[c9c][K3g][w2r];if(typeof onBackground === D59.G9c){onBackground(this);}else if(onBackground === z3g){var R3g=D3H;R3g+=s9c;R3g+=B0H;this[R3g]();}else if(onBackground === X3g){this[l0H]();}else if(onBackground === B3g){this[I6H]();}return this;};Editor[E3g][w3g]=function(){var q2r="_blur";this[q2r]();return this;};Editor[I8H][q3g]=function(cells,fieldNames,show,opts){var y2r="aSourc";var n2r="_dat";var S2r="individ";var N2r="ual";var Q2r="bubb";var v2r="ubbl";var G2r="rmOpt";var G3g=Q2r;G3g+=s9c;G3g+=m9c;var v3g=S2r;v3g+=N2r;var y3g=n2r;y3g+=y2r;y3g+=m9c;var n3g=D3H;n3g+=v2r;n3g+=m9c;var N3g=N3H;N3g+=L3H;N3g+=G2r;N3g+=W2r;var S3g=m9c;S3g+=Z2r;var that=this;if(this[V2r](function(){D59.S59();var Q3g=D3H;Q3g+=S5H;Q3g+=D3H;Q3g+=D4H;that[Q3g](cells,fieldNames,opts);})){return this;}if($[S5r](fieldNames)){opts=fieldNames;fieldNames=undefined;show=C7H;}else if(typeof fieldNames === e2r){show=fieldNames;fieldNames=undefined;opts=undefined;}if($[S5r](show)){opts=show;show=C7H;}if(show === undefined){show=C7H;}opts=$[S3g]({},this[c9c][N3g][n3g],opts);var editFields=this[y3g](v3g,cells,fieldNames);this[r2r](cells,editFields,G3g,opts,function(){var I2r="ncludeFields";var a2r="prep";var U2r="lin";var c2r="ubblePosition";var A8r='" />';var P8r="<div/>";var K8r='<div class="DTE_Processing_Indicator"><span></div>';var b8r="concat";var p2r="oseReg";var Y2r="ild";var m2r="ima";var l8r="bubbleNodes";var k8r="bg";var h2r="chi";var J8r='resize.';var H2r="div class";var Z8r="_focus";var T2r="ormEr";var z8r="pointer";var B6g=D3H;B6g+=a3H;B6g+=D3H;B6g+=n5H;var X6g=i3H;X6g+=g2r;X6g+=A5H;var R6g=H9c;D59.f59();R6g+=I2r;var z6g=s2r;z6g+=A5H;z6g+=m2r;z6g+=J5H;var K6g=D3H;K6g+=c2r;var l6g=A0H;l6g+=p2r;var u6g=s3H;u6g+=r9c;u6g+=r9c;var D6g=t2r;D6g+=L2r;var F6g=k2H;F6g+=M9c;F6g+=D4H;var P6g=r9c;P6g+=J5r;var H3g=a2r;H3g+=m4r;var U3g=N3H;U3g+=T2r;U3g+=Q9H;var C3g=r9c;C3g+=L3H;C3g+=K3H;var j3g=X4H;j3g+=f2r;j3g+=m4H;j3g+=M2r;var o3g=v3H;o3g+=Y2r;o3g+=a0H;o3g+=A5H;var d3g=h2r;d3g+=x2r;var M3g=z1H;M3g+=R1H;var f3g=e7H;f3g+=d2r;var T3g=g0r;T3g+=S3H;T3g+=o2r;var a3g=s1H;a3g+=V0H;a3g+=f0H;a3g+=S1H;var L3g=z1H;L3g+=R1H;var t3g=k4r;t3g+=q5H;var p3g=S8H;p3g+=D3H;p3g+=s9c;p3g+=m9c;var c3g=j2r;c3g+=C2r;c3g+=o2r;var m3g=e7H;m3g+=S1H;var s3g=U2r;s3g+=l1H;var I3g=D0r;I3g+=s3H;I3g+=p7r;var g3g=X1H;g3g+=H2r;g3g+=j1H;var r3g=z6r;r3g+=P8r;r3g+=k6r;r3g+=M1H;var e3g=x1H;e3g+=h1r;e3g+=o2r;var V3g=n2H;V3g+=M9c;V3g+=s3H;V3g+=v3H;var Z3g=s3H;Z3g+=l5H;Z3g+=V5r;Z3g+=y6H;var W3g=D3H;W3g+=a3H;W3g+=i8r;var namespace=that[F8r](opts);var ret=that[D8r](W3g);if(!ret){return that;}$(window)[G8H](J8r + namespace,function(){D59.S59();var u8r="bubblePosition";that[u8r]();});var nodes=[];that[c9c][l8r]=nodes[b8r][Z3g](nodes,_pluck(editFields,V3g));var classes=that[b9H][O8r];var background=$(e3g + classes[k8r] + r3g);var container=$(g3g + classes[I3g] + I2H + V2H + classes[s3g] + m3g + c3g + classes[p3g] + I2H + V2H + classes[t3g] + A8r + K8r + L3g + a3g + T3g + classes[z8r] + f3g + M3g);if(show){var x3g=D3H;x3g+=L3H;x3g+=r9c;x3g+=y6H;var h3g=N4r;h3g+=r9c;h3g+=y6H;var Y3g=y6r;Y3g+=R8r;container[Y3g](h3g);background[y4r](x3g);}var liner=container[d3g]()[X8r](I8c);var table=liner[o3g]();var close=table[j3g]();liner[D5r](that[C3g][U3g]);table[H3g](that[P6g][W3H]);if(opts[B8r]){var i6g=U8H;i6g+=K3H;liner[u8H](that[i6g][E8r]);}if(opts[F6g]){liner[u8H](that[k8H][w8r]);}if(opts[D6g]){var J6g=r9c;J6g+=L3H;J6g+=K3H;table[D5r](that[J6g][q8r]);}var pair=$()[u6g](container)[Q8r](background);that[l6g](function(submitComplete){that[R0r](pair,{opacity:I8c},function(){var S8r="earDy";var y8r='closed';var N8r="namicInfo";var v8r='bubble';if(this === container[I8c]){var k6g=i3H;k6g+=C6H;k6g+=G7r;var O6g=A0H;O6g+=S8r;O6g+=N8r;var b6g=L3H;b6g+=n8r;pair[i5r]();$(window)[b6g](J8r + namespace);that[O6g]();that[k6g](y8r,[v8r]);}});});background[N1r](function(){that[G8r]();});close[N1r](function(){var A6g=W8r;D59.S59();A6g+=Z4H;A6g+=c9c;A6g+=m9c;that[A6g]();});that[K6g]();that[z6g](pair,{opacity:s8c});that[Z8r](that[c9c][R6g],opts[Y6H]);that[X6g](B6g,C7H);});return this;};Editor[E6g][w6g]=function(){var d8r='left';var Y8r='below';var s8r="_Bu";var m8r='div.DTE_Bubble_Liner';var d8c=15;var g8r="ubbleN";var x8r="Class";var I8r="odes";var V8r="ubb";var L8r="right";var e8r="ight";var T8r="bottom";var f8r="outerWidth";var c6g=U6H;c6g+=l5H;var m6g=L3H;m6g+=N3H;m6g+=C7r;var s6g=D4H;s6g+=Z3r;var I6g=X4H;I6g+=c9c;I6g+=c9c;var g6g=D3H;g6g+=V8r;g6g+=D4H;var r6g=X4H;r6g+=C2r;r6g+=c9c;r6g+=R9H;var e6g=s9c;e6g+=m9c;e6g+=N3H;e6g+=M9c;var V6g=d5H;V6g+=e8r;var Z6g=r8r;Z6g+=C3H;var W6g=s9c;W6g+=c8H;W6g+=M9c;var G6g=x8H;G6g+=v4H;G6g+=c3r;var v6g=M9c;v6g+=L3H;v6g+=l5H;var Q6g=D3H;Q6g+=g8r;Q6g+=I8r;var q6g=T0r;q6g+=P3H;q6g+=s8r;D59.S59();q6g+=i8r;var wrapper=$(q6g),liner=$(m8r),nodes=this[c9c][Q6g];var position={top:I8c,left:I8c,right:I8c,bottom:I8c};$[m7H](nodes,function(i,node){var a8r="offsetWidth";var c8r="fsetHe";var t8r="left";var y6g=L3H;y6g+=N3H;y6g+=c8r;y6g+=e8r;var n6g=M9c;n6g+=L3H;n6g+=l5H;D59.S59();var N6g=M9c;N6g+=S2H;var S6g=W7r;S6g+=N3H;S6g+=q5H;S6g+=M9c;var pos=$(node)[S6g]();node=$(node)[p8r](I8c);position[N6g]+=pos[h7r];position[t8r]+=pos[t8r];position[L8r]+=pos[t8r] + node[a8r];position[T8r]+=pos[n6g] + node[y6g];});position[v6g]/=nodes[G6g];position[W6g]/=nodes[Z6g];position[V6g]/=nodes[o7H];position[T8r]/=nodes[o7H];var top=position[h7r],left=(position[e6g] + position[L8r]) / m8c,width=liner[f8r](),visLeft=left - width / m8c,visRight=visLeft + width,docWidth=$(window)[M7r](),padding=d8c,classes=this[r6g][g6g];wrapper[I6g]({top:top,left:left});if(liner[s6g] && liner[m6g]()[c6g] < I8c){var L6g=s3H;L6g+=M8r;L6g+=C2r;L6g+=c9c;var t6g=M9c;t6g+=L3H;t6g+=l5H;var p6g=X4H;p6g+=c9c;p6g+=c9c;wrapper[p6g](t6g,position[T8r])[L6g](Y8r);}else {var a6g=h8r;a6g+=x8r;wrapper[a6g](Y8r);}if(visRight + padding > docWidth){var T6g=X4H;T6g+=c9c;T6g+=c9c;var diff=visRight - docWidth;liner[T6g](d8r,visLeft < padding?-(visLeft - padding):-(diff + padding));}else {var M6g=D4H;M6g+=N3H;M6g+=M9c;var f6g=X4H;f6g+=c9c;f6g+=c9c;liner[f6g](M6g,visLeft < padding?-(visLeft - padding):I8c);}return this;};Editor[I8H][Y6g]=function(buttons){var j8r="_b";var j6g=m9c;j6g+=s1r;var o6g=o8r;o6g+=l5H;o6g+=M9c;o6g+=y6H;var d6g=r9c;d6g+=L3H;d6g+=K3H;var h6g=j8r;h6g+=S3H;h6g+=C8r;var that=this;if(buttons === h6g){buttons=[{text:this[T3r][this[c9c][p1r]][I6H],action:function(){var x6g=U8r;x6g+=M9c;this[x6g]();}}];}else if(!$[M1r](buttons)){buttons=[buttons];}$(this[d6g][q8r])[o6g]();$[j6g](buttons,function(i,btn){var J9r="ssName";var l9r="n/>";var z9r='tabindex';var F9r="bIn";var u9r="<b";var k9r="tring";var P9r="keypr";var K9r="className";var R9r="tabIndex";var O9r="labe";var z0g=D3H;z0g+=m9H;z0g+=H8r;z0g+=c9c;var K0g=r9c;K0g+=L3H;K0g+=K3H;var A0g=J0r;A0g+=l5H;A0g+=m9c;A0g+=R8r;var O0g=L3H;O0g+=A5H;var b0g=P9r;b0g+=i9r;var u0g=S8H;u0g+=F9r;u0g+=r9c;u0g+=f9c;var J0g=s3H;J0g+=M9c;J0g+=M9c;J0g+=d5H;var D0g=z3r;D0g+=X4H;D0g+=M9c;D0g+=Q4r;var F0g=D9r;F0g+=J9r;var i0g=u9r;i0g+=m9H;i0g+=U6H;i0g+=l9r;var P0g=s3H;P0g+=X4H;P0g+=b9r;P0g+=A5H;var H6g=O9r;D59.S59();H6g+=s9c;var C6g=c9c;C6g+=k9r;if(typeof btn === C6g){btn={text:btn,action:function(){D59.f59();var U6g=R2r;U6g+=D3H;U6g+=x0H;U6g+=M9c;this[U6g]();}};}var text=btn[A9r] || btn[H6g];var action=btn[P0g] || btn[Z7H];$(i0g,{'class':that[b9H][W3H][U3r] + (btn[F0g]?r2H + btn[K9r]:B7H)})[F5r](typeof text === D0g?text(that):text || B7H)[J0g](z9r,btn[u0g] !== undefined?btn[R9r]:I8c)[G8H](X9r,function(e){var B9r="keyCo";var l0g=B9r;l0g+=i4H;if(e[l0g] === h8c && action){action[E9r](that);}})[G8H](b0g,function(e){D59.S59();if(e[w9r] === h8c){e[q9r]();}})[O0g](B8H,function(e){var Q9r="reven";D59.f59();var S9r="tDefault";var k0g=l5H;k0g+=Q9r;k0g+=S9r;e[k0g]();if(action){action[E9r](that,e);}})[A0g](that[K0g][z0g]);});return this;};Editor[I8H][N9r]=function(fieldName){var y9r="includ";var n9r="ring";var v9r="eFie";var I9r="eFi";var V9r="nA";var r9r="estroy";var G9r="inAr";var Z9r="rder";var R0g=c9c;R0g+=M9c;R0g+=n9r;var that=this;var fields=this[c9c][l2r];if(typeof fieldName === R0g){var S0g=y9r;S0g+=v9r;S0g+=J4H;var Q0g=G9r;Q0g+=W9r;var q0g=L3H;q0g+=d5H;q0g+=k2r;var w0g=L3H;w0g+=Z9r;var E0g=H9c;E0g+=V9r;E0g+=e9r;var B0g=r9c;B0g+=r9r;var X0g=N3H;X0g+=g9r;X0g+=r9c;that[X0g](fieldName)[B0g]();delete fields[fieldName];var orderIdx=$[E0g](fieldName,this[c9c][w0g]);this[c9c][q0g][A2r](orderIdx,s8c);var includeIdx=$[Q0g](fieldName,this[c9c][S0g]);if(includeIdx !== -s8c){var n0g=U4r;n0g+=H9c;n0g+=X4H;n0g+=m9c;var N0g=y9r;N0g+=I9r;N0g+=s9r;this[c9c][N0g][n0g](includeIdx,s8c);}}else {$[m7H](this[m9r](fieldName),function(i,name){D59.f59();that[N9r](name);});}return this;};Editor[y0g][v0g]=function(){var G0g=W8r;G0g+=s9c;G0g+=N6r;this[G0g](j7H);D59.f59();return this;};Editor[W0g][Z0g]=function(arg1,arg2,arg3,arg4){var L9r="tidy";var d9r='initCreate';var T9r='number';var p9r="modif";var t0g=i3H;t0g+=c9r;var c0g=D3H;c0g+=s9c;c0g+=u3r;var m0g=g7r;m0g+=p4r;var s0g=c9c;s0g+=M9c;s0g+=y6H;s0g+=D4H;var I0g=r9c;I0g+=J5r;var g0g=p9r;g0g+=P4H;var r0g=t9r;r0g+=X6H;var e0g=L0r;e0g+=W5H;var V0g=i3H;V0g+=L9r;var that=this;var fields=this[c9c][l2r];var count=s8c;if(this[V0g](function(){D59.S59();that[a9r](arg1,arg2,arg3,arg4);})){return this;}if(typeof arg1 === T9r){count=arg1;arg1=arg2;arg2=arg3;}this[c9c][f9r]={};for(var i=I8c;i < count;i++){this[c9c][f9r][i]={fields:this[c9c][l2r]};}var argOpts=this[M9r](arg1,arg2,arg3,arg4);this[c9c][r4H]=e0g;this[c9c][p1r]=r0g;this[c9c][g0g]=D8H;this[I0g][W3H][s0g][m0g]=c0g;this[Y9r]();this[K2r](this[l2r]());$[m7H](fields,function(name,field){D59.f59();var h9r="multiReset";var p0g=i4H;p0g+=N3H;field[h9r]();for(var i=I8c;i < count;i++){field[x9r](i,field[a8H]());}field[Z7r](field[p0g]());});this[t0g](d9r,D8H,function(){var P5h="bleMain";var j9r="Open";var H9r="_ass";var o9r="mayb";var C9r="_formOp";var f0g=o9r;f0g+=m9c;f0g+=j9r;var T0g=L3H;T0g+=l5H;T0g+=M9c;T0g+=c9c;var a0g=C9r;a0g+=U9r;var L0g=H9r;L0g+=o8r;L0g+=P5h;that[L0g]();that[a0g](argOpts[T0g]);argOpts[f0g]();});return this;};Editor[M0g][Y0g]=function(parent){var F5h="depende";var D5h='.edep';var j0g=W7r;j0g+=N3H;var o0g=A5H;o0g+=L3H;o0g+=i4H;var d0g=I9c;d0g+=V5H;if($[M1r](parent)){var h0g=s9c;h0g+=i5h;h0g+=c3r;for(var i=I8c,ien=parent[h0g];i < ien;i++){var x0g=a3H;x0g+=A5H;x0g+=F5h;x0g+=G7r;this[x0g](parent[i]);}return this;}var field=this[d0g](parent);$(field[o0g]())[j0g](D5h);D59.f59();return this;};Editor[C0g][U0g]=function(parent,url,opts){var J5h=".ed";D59.f59();var A5h="dependent";var B4g=J5h;B4g+=u5h;var X4g=l5h;X4g+=M9c;var i4g=b5h;i4g+=O5h;i4g+=m3H;i4g+=c3H;var P4g=N3H;P4g+=u4H;P4g+=s9c;P4g+=r9c;var H0g=k5h;H0g+=y6H;if($[H0g](parent)){for(var i=I8c,ien=parent[o7H];i < ien;i++){this[A5h](parent[i],url,opts);}return this;}var that=this;var field=this[P4g](parent);var ajaxOpts={type:i4g,dataType:K5h};opts=$[K2H]({event:z5h,data:D8H,preUpdate:D8H,postUpdate:D8H},opts);var update=function(json){var E5h="preUpdate";var Q5h="pdate";var S5h='message';var y5h="postUpdate";var G5h="tUpdate";var R5h="pd";var N5h='error';var K4g=c9c;K4g+=C3H;K4g+=L3H;K4g+=E6H;var A4g=C3H;A4g+=H9c;A4g+=r9c;A4g+=m9c;var k4g=m9c;k4g+=s3H;k4g+=X4H;k4g+=C3H;var l4g=f0H;l4g+=s3H;l4g+=s9c;var u4g=a3H;u4g+=R5h;u4g+=n2H;u4g+=m9c;var J4g=s9c;J4g+=s3H;J4g+=X5h;J4g+=s9c;var D4g=B5h;D4g+=v3H;if(opts[E5h]){var F4g=w5h;F4g+=q5h;F4g+=Q5h;opts[F4g](json);}$[D4g]({labels:J4g,options:u4g,values:l4g,messages:S5h,errors:N5h},function(jsonProp,fieldFn){D59.f59();if(json[jsonProp]){var b4g=m9c;b4g+=s1r;$[b4g](json[jsonProp],function(field,val){var O4g=N3H;O4g+=H9c;O4g+=m9c;D59.S59();O4g+=m4H;that[O4g](field)[fieldFn](val);});}});$[k4g]([A4g,K4g,O9H,h8H],function(i,key){var n5h="anima";if(json[key]){var z4g=n5h;z4g+=J5H;that[key](json[key],json[z4g]);}});if(opts[y5h]){var R4g=v5h;R4g+=G5h;opts[R4g](json);}field[P8H](j7H);};$(field[W5h]())[G8H](opts[X4g] + B4g,function(e){var s5h="values";var e5h="arge";var L5h="lainObje";var S4g=N3H;S4g+=Z5h;S4g+=V3H;D59.f59();var q4g=b5H;q4g+=V5h;var w4g=d5H;w4g+=L3H;w4g+=E6H;var E4g=M9c;E4g+=e5h;E4g+=M9c;if($(field[W5h]())[r5h](e[E4g])[o7H] === I8c){return;}field[P8H](C7H);var data={};data[g5h]=that[c9c][f9r]?_pluck(that[c9c][f9r],I5h):D8H;data[w4g]=data[g5h]?data[q4g][I8c]:D8H;data[s5h]=that[m5h]();if(opts[D2H]){var ret=opts[D2H](data);if(ret){var Q4g=r9c;Q4g+=s3H;Q4g+=S8H;opts[Q4g]=ret;}}if(typeof url === S4g){var N4g=f0H;N4g+=s3H;N4g+=s9c;var o=url[E9r](that,field[N4g](),data,update);if(o){var n4g=z3r;n4g+=c5h;if(typeof o === D59.V9c && typeof o[p5h] === n4g){o[p5h](function(resolved){D59.f59();if(resolved){update(resolved);}});}else {update(o);}}}else {var W4g=f9c;W4g+=J5H;W4g+=I3H;var y4g=t5h;y4g+=L5h;y4g+=a5h;if($[y4g](url)){var v4g=m9c;v4g+=Z2r;$[v4g](ajaxOpts,url);}else {var G4g=a3H;G4g+=d5H;G4g+=s9c;ajaxOpts[G4g]=url;}$[y0H]($[W4g](ajaxOpts,{url:url,data:data,success:update}));}});return this;};Editor[Z4g][T5h]=function(){var Y5h="emp";var M5h="estr";var c4g=f5h;c4g+=r9c;c4g+=J5H;var m4g=L3H;m4g+=N3H;m4g+=N3H;var s4g=r9c;s4g+=M5h;s4g+=P3r;var e4g=M9c;e4g+=Y5h;e4g+=s9c;e4g+=X6H;if(this[c9c][h5h]){var V4g=X4H;V4g+=s9c;V4g+=L3H;V4g+=q5H;this[V4g]();}this[N9r]();if(this[c9c][e4g]){var I4g=M9c;I4g+=o8r;I4g+=x5h;I4g+=J5H;var g4g=s3H;g4g+=d5h;g4g+=m4r;var r4g=D3H;r4g+=L3H;r4g+=r9c;r4g+=y6H;$(r4g)[g4g](this[c9c][I4g]);}var controller=this[c9c][j3r];if(controller[s4g]){controller[T5h](this);}$(document)[m4g](c4g + this[c9c][o5h]);this[k8H]=D8H;this[c9c]=D8H;};Editor[I8H][j5h]=function(name){var C5h="ieldNames";var p4g=y2H;p4g+=C5h;var that=this;$[m7H](this[p4g](name),function(i,n){that[o1r](n)[j5h]();});return this;};Editor[I8H][t4g]=function(show){var U5h="yed";var a4g=L3H;a4g+=l5H;a4g+=m9c;a4g+=A5H;D59.S59();if(show === undefined){var L4g=k9H;L4g+=l5H;L4g+=C1H;L4g+=U5h;return this[c9c][L4g];}return this[show?a4g:i6r]();};Editor[T4g][f4g]=function(){D59.S59();return $[H5h](this[c9c][l2r],function(field,name){var M4g=r9c;M4g+=B3r;M4g+=P3h;M4g+=r9c;return field[M4g]()?name:D8H;});};Editor[I8H][i3h]=function(){var D3h="ontro";var J3h="ller";var F3h="displayC";var h4g=A5H;h4g+=L3H;D59.S59();h4g+=i4H;var Y4g=F3h;Y4g+=D3h;Y4g+=J3h;return this[c9c][Y4g][h4g](this);};Editor[I8H][x4g]=function(items,arg1,arg2,arg3,arg4){var u3h="aSource";var b3h="rudArgs";var U4g=L3H;U4g+=l5H;U4g+=M9c;U4g+=c9c;var C4g=N3H;C4g+=H9c;C4g+=V5H;C4g+=c9c;D59.S59();var j4g=i0H;j4g+=s3H;j4g+=M9c;j4g+=u3h;var o4g=l3h;o4g+=V0H;o4g+=M9c;var d4g=i3H;d4g+=X4H;d4g+=b3h;var that=this;if(this[V2r](function(){D59.f59();that[O3h](items,arg1,arg2,arg3,arg4);})){return this;}var argOpts=this[d4g](arg1,arg2,arg3,arg4);this[o4g](items,this[j4g](C4g,items),k3h,argOpts[U4g],function(){D59.f59();var z3h="_assembleMain";var K3h="Options";var A3h="_form";var H4g=A3h;H4g+=K3h;that[z3h]();that[H4g](argOpts[N8H]);argOpts[R3h]();});return this;};Editor[P7g][X3h]=function(name){var i7g=B3h;i7g+=C3H;var that=this;$[i7g](this[m9r](name),function(i,n){var D7g=G6r;D7g+=s3H;D7g+=n5H;var F7g=h6H;F7g+=r9c;that[F7g](n)[D7g]();});return this;};Editor[I8H][q9H]=function(name,msg){var w3h="lError";var E3h="globa";var q3h="ormError";var Q3h="_message";if(msg === undefined){var u7g=E3h;u7g+=w3h;var J7g=N3H;J7g+=q3h;this[Q3h](this[k8H][J7g],name);this[c9c][u7g]=name;}else {var b7g=m9c;b7g+=S3h;b7g+=N3h;var l7g=I9c;l7g+=m9c;l7g+=m4H;this[l7g](name)[b7g](msg);}return this;};Editor[I8H][O7g]=function(name){var n3h="nknown field name - ";var fields=this[c9c][l2r];if(!fields[name]){var k7g=q5h;k7g+=n3h;throw k7g + name;}return fields[name];};Editor[I8H][A7g]=function(){return $[H5h](this[c9c][l2r],function(field,name){return name;});};Editor[K7g][y3h]=_api_file;Editor[z7g][R7g]=_api_files;Editor[I8H][p8r]=function(name){var that=this;if(!name){name=this[l2r]();}if($[M1r](name)){var X7g=m9c;X7g+=s3H;X7g+=v3H;var out={};$[X7g](name,function(i,n){var B7g=v4H;B7g+=m9c;B7g+=M9c;out[n]=that[o1r](n)[B7g]();});return out;}return this[o1r](name)[p8r]();};Editor[I8H][E7g]=function(names,animate){var G3h="ldNames";var v3h="_fie";var w7g=v3h;w7g+=G3h;var that=this;$[m7H](this[w7g](names),function(i,n){D59.S59();var q7g=I9c;q7g+=V5H;that[q7g](n)[W3h](animate);});return this;};Editor[I8H][Z3h]=function(includeHash){var V3h="editField";var S7g=V3h;S7g+=c9c;var Q7g=K3H;Q7g+=s3H;Q7g+=l5H;return $[Q7g](this[c9c][S7g],function(edit,idSrc){D59.f59();return includeHash === C7H?e3h + idSrc:idSrc;});};Editor[N7g][r3h]=function(inNames){var g3h="globalE";var v7g=s9c;D59.S59();v7g+=G6r;v7g+=d8H;var y7g=g3h;y7g+=Z6H;var n7g=r9c;n7g+=L3H;n7g+=K3H;var formError=$(this[n7g][I3h]);if(this[c9c][y7g]){return C7H;}var names=this[m9r](inNames);for(var i=I8c,ien=names[v7g];i < ien;i++){if(this[o1r](names[i])[r3h]()){return C7H;}}return j7H;};Editor[G7g][s3h]=function(cell,fieldName,opts){var t3h="ua";var C3h='div.DTE_Field';var c3h="indi";var p3h="vid";var f3h="inO";var T3h="isPla";var a3h="ine";var m3h="_tid";var s7g=m3h;s7g+=y6H;var r7g=B5h;r7g+=X4H;r7g+=C3H;var e7g=h1r;e7g+=q5H;e7g+=c9c;var V7g=c3h;V7g+=p3h;V7g+=t3h;V7g+=s9c;var Z7g=L3h;Z7g+=a3h;var W7g=T3h;W7g+=f3h;W7g+=M3h;var that=this;if($[W7g](fieldName)){opts=fieldName;fieldName=undefined;}opts=$[K2H]({},this[c9c][H3r][Z7g],opts);var editFields=this[Y3h](V7g,cell,fieldName);var node,field;var countOuter=I8c,countInner;var closed=j7H;var classes=this[e7g][s3h];$[r7g](editFields,function(i,editField){var x3h='Cannot edit more than one row inline at a time';var h3h="ttach";var g7g=s3H;g7g+=h3h;if(countOuter > I8c){throw x3h;}node=$(editField[g7g][I8c]);countInner=I8c;$[m7H](editField[d3h],function(j,f){var o3h="Cannot edit more than one field inlin";D59.S59();var j3h="e at a time";if(countInner > I8c){var I7g=o3h;I7g+=j3h;throw I7g;}field=f;countInner++;});countOuter++;;});if($(C3h,node)[o7H]){return this;}if(this[s7g](function(){D59.f59();that[s3h](cell,fieldName,opts);})){return this;}this[r2r](cell,editFields,U3h,opts,function(){var z6h="rmO";var F6h="_clos";var B6h="liner";var i6h="_fo";var D6h="pend";var R6h="ptio";var k6h="dth:";var b6h="\" styl";var X6h='<div class="DTE_Processing_Indicator"><span/></div>';var O6h="e=\"wi";var P6h="focu";var K6h="_preope";var A6h="lass=";var G1g=H9c;G1g+=H3h;G1g+=a3h;var v1g=i3H;v1g+=g2r;v1g+=A5H;var y1g=P6h;y1g+=c9c;var n1g=i6h;n1g+=X4H;n1g+=t9H;var l1g=F6h;l1g+=m9c;l1g+=b0H;var U7g=D3H;U7g+=q4H;D59.S59();U7g+=l3H;var C7g=A5H;C7g+=L3H;C7g+=r9c;C7g+=m9c;var j7g=J0r;j7g+=D6h;var o7g=J6h;o7g+=u6h;var d7g=V0H;d7g+=f0H;d7g+=f5h;var x7g=N3H;x7g+=W5H;x7g+=r9c;var h7g=e7H;h7g+=l6h;h7g+=S1H;var Y7g=j2r;Y7g+=s9c;Y7g+=E9H;Y7g+=j1H;var M7g=l5H;M7g+=P2H;M7g+=e7H;M7g+=S1H;var f7g=E6H;f7g+=E2H;f7g+=M9c;f7g+=C3H;var T7g=b6h;T7g+=O6h;T7g+=k6h;var a7g=C9H;a7g+=A5H;a7g+=l1H;var L7g=l6r;L7g+=r4r;L7g+=A6h;L7g+=e7H;var t7g=n6r;t7g+=r9c;var p7g=X4H;p7g+=M0r;p7g+=c9c;var c7g=K6h;c7g+=A5H;var m7g=i6h;m7g+=z6h;m7g+=R6h;m7g+=Q4H;var namespace=that[m7g](opts);var ret=that[c7g](U3h);if(!ret){return that;}var children=node[p7g]()[i5r]();node[t7g]($(V2H + classes[e2H] + I2H + L7g + classes[a7g] + T7g + node[f7g]() + M7g + X6h + d2H + Y7g + classes[q8r] + h7g + d2H));node[x7g](d7g + classes[B6h][o7g](/ /g,E6h))[j7g](field[C7g]())[D5r](that[k8H][I3h]);if(opts[U7g]){var u1g=t2r;u1g+=L2r;var J1g=r9c;J1g+=L3H;J1g+=K3H;var D1g=V8H;D1g+=m9c;D1g+=I3H;var F1g=d5H;F1g+=u5h;F1g+=w6h;F1g+=m9c;var i1g=q6h;i1g+=Q4H;var P1g=r9c;P1g+=H9c;P1g+=f0H;P1g+=f5h;var H7g=N3H;H7g+=M6r;node[H7g](P1g + classes[i1g][F1g](/ /g,E6h))[D1g](that[J1g][u1g]);}that[l1g](function(submitComplete,action){D59.S59();var A1g=H9c;A1g+=A5H;A1g+=C9H;A1g+=G3r;var b1g=Q3H;b1g+=H9c;b1g+=X4H;b1g+=i1H;closed=C7H;$(document)[Q6h](b1g + namespace);if(!submitComplete || action !== S6h){var k1g=J0r;k1g+=l5H;k1g+=G6r;k1g+=r9c;var O1g=v7r;O1g+=A5H;O1g+=k3r;node[O1g]()[i5r]();node[k1g](children);}that[N6h]();return A1g;;});setTimeout(function(){var K1g=L3H;K1g+=A5H;if(closed){return;}$(document)[K1g](B8H + namespace,function(e){var r6h="ack";var G6h="targe";var Z6h="and";var y6h="ents";var e6h="dB";var V6h="Sel";var g6h="addBac";var W6h="_typeF";var S1g=n6h;S1g+=y6h;var Q1g=M9c;Q1g+=v6h;Q1g+=v1H;Q1g+=M9c;var q1g=G6h;q1g+=M9c;var w1g=L3H;w1g+=E6H;w1g+=Q4H;var E1g=W6h;E1g+=A5H;var B1g=Z6h;B1g+=V6h;B1g+=N3H;var X1g=s3H;X1g+=r9c;X1g+=e6h;X1g+=r6h;var R1g=g6h;R1g+=i1H;var z1g=N3H;z1g+=A5H;var back=$[z1g][R1g]?X1g:B1g;if(!field[E1g](w1g,e[q1g]) && $[q5r](node[I8c],$(e[Q1g])[S1g]()[back]()) === -s8c){var N1g=D3H;N1g+=s9c;N1g+=a3H;N1g+=d5H;that[N1g]();}});},I8c);that[n1g]([field],opts[y1g]);that[v1g](G1g,C7H);});return this;};Editor[I8H][B8r]=function(name,msg){var I6h="formIn";D59.f59();if(msg === undefined){var Z1g=I6h;Z1g+=k3H;var W1g=i3H;W1g+=P5H;W1g+=s6h;this[W1g](this[k8H][Z1g],name);}else {var V1g=N3H;V1g+=H9c;V1g+=r3H;V1g+=r9c;this[V1g](name)[B8r](msg);}return this;};Editor[e1g][r1g]=function(mode){var p6h='Changing from create mode is not supported';var c6h='Not currently in an editing mode';var s1g=X4H;s1g+=a0H;s1g+=s3H;s1g+=J5H;var I1g=t9r;I1g+=X6H;if(!mode){var g1g=m6h;g1g+=H9c;g1g+=L3H;g1g+=A5H;return this[c9c][g1g];}if(!this[c9c][p1r]){throw new Error(c6h);}else if(this[c9c][p1r] === I1g && mode !== s1g){throw new Error(p6h);}this[c9c][p1r]=mode;return this;};Editor[m1g][c1g]=function(){var t6h="odifier";var p1g=K3H;p1g+=t6h;return this[c9c][p1g];};Editor[I8H][L6h]=function(fieldNames){var a6h="Get";var T1g=X8H;T1g+=a6h;var that=this;if(fieldNames === undefined){var t1g=I9c;t1g+=r3H;t1g+=E5r;fieldNames=this[t1g]();}if($[M1r](fieldNames)){var L1g=B5h;L1g+=v3H;var out={};$[L1g](fieldNames,function(i,name){var a1g=W8H;a1g+=s9c;a1g+=M9c;a1g+=T6h;out[name]=that[o1r](name)[a1g]();});return out;}return this[o1r](fieldNames)[T1g]();};Editor[f1g][M1g]=function(fieldNames,val){var f6h="inObjec";var Y1g=t5h;Y1g+=C1H;Y1g+=f6h;Y1g+=M9c;var that=this;if($[Y1g](fieldNames) && val === undefined){$[m7H](fieldNames,function(name,value){var M6h="Set";D59.S59();var h1g=K3H;h1g+=r1H;h1g+=H9c;h1g+=M6h;that[o1r](name)[h1g](value);});}else {this[o1r](fieldNames)[x9r](val);}return this;};Editor[x1g][d1g]=function(name){D59.f59();var that=this;if(!name){var o1g=L3H;o1g+=Y6h;o1g+=m9c;o1g+=d5H;name=this[o1g]();}return $[M1r](name)?$[H5h](name,function(n){D59.f59();return that[o1r](n)[W5h]();}):this[o1r](name)[W5h]();};Editor[j1g][Q6h]=function(name,fn){var C1g=L3H;C1g+=N3H;C1g+=N3H;$(this)[C1g](this[h6h](name),fn);D59.S59();return this;};Editor[U1g][G8H]=function(name,fn){var x6h="_eventN";var P2g=x6h;P2g+=s3H;P2g+=P5H;var H1g=L3H;H1g+=A5H;$(this)[H1g](this[P2g](name),fn);D59.f59();return this;};Editor[I8H][d6h]=function(name,fn){var o6h="eventNam";var i2g=i3H;i2g+=o6h;i2g+=m9c;$(this)[d6h](this[i2g](name),fn);return this;};Editor[F2g][j6h]=function(){var C6h="Control";var J0h="_closeReg";var i0h="_display";var U6h="ler";var D0h="eorder";var P0h="preopen";var F0h="R";var A2g=E6H;A2g+=d5H;A2g+=s3H;A2g+=p7r;var k2g=r9c;k2g+=L3H;k2g+=K3H;var O2g=o9H;O2g+=C6h;O2g+=U6h;var b2g=H6h;b2g+=A5H;var l2g=i3H;l2g+=P0h;var D2g=i0h;D2g+=F0h;D2g+=D0h;var that=this;this[D2g]();this[J0h](function(){D59.f59();that[c9c][j3r][l0H](that,function(){var l0h="osed";var u2g=K3H;D59.S59();u2g+=u0h;u2g+=A5H;var J2g=Q3H;J2g+=l0h;that[N6h]();that[b0h](J2g,[u2g]);});});var ret=this[l2g](b2g);if(!ret){return this;}this[c9c][O2g][j6h](this,this[k2g][A2g],function(){var B2g=K3H;B2g+=u0h;B2g+=A5H;var X2g=L3H;X2g+=z4H;X2g+=a9c;var R2g=O3h;R2g+=O5h;D59.f59();R2g+=l5H;R2g+=k3r;var z2g=L3H;z2g+=d5H;z2g+=k2r;var K2g=y2H;K2g+=n5r;K2g+=t9H;that[K2g]($[H5h](that[c9c][z2g],function(name){return that[c9c][l2r][name];}),that[c9c][R2g][Y6H]);that[b0h](X2g,[B2g,that[c9c][p1r]]);});this[O0h](k3h,j7H);D59.f59();return this;};Editor[I8H][P0H]=function(set){var R0h="sAr";var w0h="All fields, and no additional fields, must be provided for o";var z0h="rt";var q0h="ering.";var A0h="sor";var v2g=L3H;v2g+=Y6h;v2g+=m9c;v2g+=d5H;var n2g=k0h;n2g+=A5H;var N2g=A0h;N2g+=M9c;var S2g=K0h;S2g+=L3H;S2g+=H9c;S2g+=A5H;var Q2g=c9c;Q2g+=L3H;Q2g+=z0h;var q2g=o5r;q2g+=X4H;q2g+=m9c;var E2g=H9c;E2g+=R0h;E2g+=W9r;if(!set){return this[c9c][P0H];}if(arguments[o7H] && !$[E2g](set)){var w2g=X0h;w2g+=B0h;set=Array[I8H][s8H][w2g](arguments);}if(this[c9c][P0H][q2g]()[Q2g]()[S2g](E0h) !== set[s8H]()[N2g]()[n2g](E0h)){var y2g=w0h;y2g+=Y6h;y2g+=q0h;throw y2g;}$[K2H](this[c9c][v2g],set);this[K2r]();return this;};Editor[I8H][h8r]=function(items,arg1,arg2,arg3,arg4){var S0h="actionClass";var y0h="ield";var v0h='initRemove';var N0h="modifi";var c2g=r9c;c2g+=s3H;c2g+=S8H;var m2g=A5H;m2g+=L3H;m2g+=r9c;m2g+=m9c;var s2g=i3H;s2g+=Q0h;s2g+=A4H;var I2g=i3H;I2g+=S0h;var g2g=H9H;g2g+=m9c;var r2g=k3H;r2g+=d5H;r2g+=K3H;var e2g=r9c;e2g+=L3H;e2g+=K3H;var V2g=N0h;V2g+=l1H;var Z2g=a0H;Z2g+=n0h;var W2g=H7H;W2g+=V3H;var G2g=N3H;G2g+=y0h;D59.f59();G2g+=c9c;var that=this;if(this[V2r](function(){D59.f59();that[h8r](items,arg1,arg2,arg3,arg4);})){return this;}if(items[o7H] === undefined){items=[items];}var argOpts=this[M9r](arg1,arg2,arg3,arg4);var editFields=this[Y3h](G2g,items);this[c9c][W2g]=Z2g;this[c9c][V2g]=items;this[c9c][f9r]=editFields;this[e2g][r2g][O7r][o9H]=g2g;this[I2g]();this[s2g](v0h,[_pluck(editFields,m2g),_pluck(editFields,c2g),items],function(){var G0h="init";var W0h="MultiRemove";var t2g=G0h;t2g+=W0h;var p2g=l3h;p2g+=f0H;p2g+=m9c;D59.f59();p2g+=G7r;that[p2g](t2g,[editFields,items],function(){var I0h="tton";var r0h="leMain";var e0h="_assem";var V0h="ormOpti";var f2g=Z0h;f2g+=k3r;var T2g=L3H;T2g+=U5r;T2g+=c9c;var a2g=y2H;a2g+=V0h;a2g+=l3H;var L2g=e0h;L2g+=D3H;L2g+=r0h;that[L2g]();that[a2g](argOpts[T2g]);argOpts[R3h]();var opts=that[c9c][f2g];if(opts[Y6H] !== D8H){var h2g=k3H;h2g+=g0h;h2g+=c9c;var Y2g=t2r;Y2g+=I0h;Y2g+=c9c;var M2g=r9c;M2g+=L3H;M2g+=K3H;$(s0h,that[M2g][Y2g])[X8r](opts[Y6H])[h2g]();}});});return this;};Editor[x2g][d2g]=function(set,val){var m0h="sPlainO";var c0h="bje";var j2g=m9c;j2g+=s3H;j2g+=X4H;j2g+=C3H;var o2g=H9c;o2g+=m0h;o2g+=c0h;o2g+=a5h;var that=this;if(!$[o2g](set)){var o={};o[set]=val;set=o;}$[j2g](set,function(n,v){that[o1r](n)[Z7r](v);});return this;};Editor[I8H][p0h]=function(names,animate){var that=this;D59.S59();$[m7H](this[m9r](names),function(i,n){var C2g=N3H;C2g+=u4H;C2g+=m4H;that[C2g](n)[p0h](animate);});return this;};Editor[U2g][H2g]=function(successCallback,errorCallback,formatdata,hide){var L0h="roc";D59.f59();var u8g=m9c;u8g+=s3H;u8g+=X4H;u8g+=C3H;var P8g=t0h;P8g+=L0h;P8g+=m9c;P8g+=a0h;var that=this,fields=this[c9c][l2r],errorFields=[],errorReady=I8c,sent=j7H;if(this[c9c][P8H] || !this[c9c][p1r]){return this;}this[P8g](C7H);var send=function(){var M0h='initSubmit';var F8g=i3H;F8g+=m9c;F8g+=T0h;F8g+=M9c;var i8g=D4H;i8g+=f0h;i8g+=M9c;i8g+=C3H;D59.S59();if(errorFields[i8g] !== errorReady || sent){return;}that[F8g](M0h,[that[c9c][p1r]],function(result){var h0h="_processi";var Y0h="_su";var J8g=Y0h;J8g+=D3H;J8g+=X2r;if(result === j7H){var D8g=h0h;D8g+=A5H;D8g+=v4H;that[D8g](j7H);return;}sent=C7H;that[J8g](successCallback,errorCallback,formatdata,hide);});};this[q9H]();$[m7H](fields,function(name,field){if(field[r3h]()){errorFields[c7H](name);}});$[u8g](errorFields,function(i,name){var l8g=l1H;l8g+=Q9H;fields[name][l8g](B7H,function(){errorReady++;send();});});send();return this;};Editor[b8g][O8g]=function(set){D59.f59();if(set === undefined){return this[c9c][x0h];}this[c9c][x0h]=set === D8H?D8H:$(set);return this;};Editor[I8H][d0h]=function(title){var j0h="sse";var C0h="ldre";var X8g=N3H;D59.S59();X8g+=Z5h;X8g+=b9r;X8g+=A5H;var R8g=X4H;R8g+=L3H;R8g+=W6r;var z8g=C3H;z8g+=o0h;var K8g=Q3H;K8g+=s3H;K8g+=j0h;K8g+=c9c;var A8g=v3H;A8g+=H9c;A8g+=C0h;A8g+=A5H;var k8g=r9c;k8g+=L3H;k8g+=K3H;var header=$(this[k8g][w8r])[A8g](U0h + this[K8g][z8g][R8g]);if(title === undefined){return header[F5r]();}if(typeof title === X8g){var E8g=M9c;E8g+=s3H;E8g+=D3H;E8g+=D4H;var B8g=I5H;B8g+=l5H;B8g+=H9c;title=title(this,new DataTable[B8g](this[c9c][E8g]));}header[F5r](title);return this;};Editor[w8g][q8g]=function(field,value){var Q8g=v4H;Q8g+=z6H;if(value !== undefined || $[S5r](field)){return this[Z7r](field,value);}return this[Q8g](field);;};var apiRegister=DataTable[S8g][N8g];function __getInst(api){var y8g=L3H;y8g+=w7r;y8g+=H9c;y8g+=M9c;var n8g=X4H;n8g+=L3H;n8g+=A5H;n8g+=A9r;var ctx=api[n8g][I8c];return ctx[y8g][H0h] || ctx[P4h];}function __setBasic(inst,opts,type,plural){var b4h="ag";var u4h=/%d/;var F4h="_bas";D59.f59();var l4h='1';var W8g=k2H;W8g+=i4h;W8g+=m9c;if(!opts){opts={};}if(opts[q8r] === undefined){var G8g=F4h;G8g+=H9c;G8g+=X4H;var v8g=D3H;v8g+=q4H;v8g+=L3H;v8g+=Q4H;opts[v8g]=G8g;}if(opts[W8g] === undefined){opts[d0h]=inst[T3r][type][d0h];}if(opts[B8r] === undefined){if(type === D4h){var Z8g=d5H;Z8g+=Z5r;var confirm=inst[T3r][type][J4h];opts[B8r]=plural !== s8c?confirm[i3H][Z8g](u4h,plural):confirm[l4h];}else {var V8g=P5H;V8g+=q8H;V8g+=b4h;V8g+=m9c;opts[V8g]=B7H;}}return opts;}apiRegister(e8g,function(){D59.f59();return __getInst(this);});apiRegister(r8g,function(opts){var O4h="crea";var g8g=O4h;D59.S59();g8g+=J5H;var inst=__getInst(this);inst[g8g](__setBasic(inst,opts,F8H));return this;});apiRegister(I8g,function(opts){var inst=__getInst(this);inst[O3h](this[I8c][I8c],__setBasic(inst,opts,S6h));return this;});apiRegister(s8g,function(opts){var inst=__getInst(this);inst[O3h](this[I8c],__setBasic(inst,opts,S6h));return this;});apiRegister(k4h,function(opts){var m8g=a0H;m8g+=K3H;m8g+=L3H;m8g+=F3r;var inst=__getInst(this);inst[m8g](this[I8c][I8c],__setBasic(inst,opts,D4h,s8c));D59.f59();return this;});apiRegister(A4h,function(opts){var c8g=d5H;D59.S59();c8g+=K4h;var inst=__getInst(this);inst[c8g](this[I8c],__setBasic(inst,opts,D4h,this[I8c][o7H]));return this;});apiRegister(p8g,function(type,opts){D59.f59();var z4h="nlin";if(!type){var t8g=L3h;t8g+=H9c;t8g+=A5H;t8g+=m9c;type=t8g;}else if($[S5r](type)){var L8g=H9c;L8g+=z4h;L8g+=m9c;opts=type;type=L8g;}__getInst(this)[type](this[I8c][I8c],opts);return this;});apiRegister(a8g,function(opts){D59.f59();__getInst(this)[O8r](this[I8c],opts);return this;});apiRegister(R4h,_api_file);apiRegister(X4h,_api_files);$(document)[G8H](B4h,function(e,ctx,json){var w4h='dt';var T8g=I9c;T8g+=D4H;T8g+=c9c;if(e[E4h] !== w4h){return;}if(json && json[T8g]){var f8g=B5h;f8g+=v3H;$[f8g](json[p7H],function(name,files){var q4h="iles";var h8g=N3H;h8g+=q4h;var Y8g=f9c;D59.S59();Y8g+=Q4h;if(!Editor[p7H][name]){var M8g=I9c;M8g+=s9c;M8g+=m9c;M8g+=c9c;Editor[M8g][name]={};}$[Y8g](Editor[h8g][name],files);});}});Editor[x8g]=function(msg,tn){var S4h=' For more information, please refer to https://datatables.net/tn/';D59.f59();throw tn?msg + S4h + tn:msg;};Editor[N4h]=function(data,props,fn){var y4h='label';var n4h="valu";var d8g=n4h;d8g+=m9c;var i,ien,dataPoint;props=$[K2H]({label:y4h,value:d8g},props);if($[M1r](data)){var o8g=D4H;o8g+=Z3r;for((i=I8c,ien=data[o8g]);i < ien;i++){var j8g=v4h;j8g+=G4h;dataPoint=data[i];if($[j8g](dataPoint)){var U8g=s3H;U8g+=M9c;U8g+=M9c;U8g+=d5H;var C8g=k1H;C8g+=m9c;C8g+=s9c;fn(dataPoint[props[W4h]] === undefined?dataPoint[props[C8g]]:dataPoint[props[W4h]],dataPoint[props[c2H]],i,dataPoint[U8g]);}else {fn(dataPoint,dataPoint,i);}}}else {var H8g=B5h;H8g+=X4H;H8g+=C3H;i=I8c;$[H8g](data,function(key,val){D59.S59();fn(val,key,i);i++;});}};Editor[P9g]=function(id){D59.S59();return id[g5r](/\./g,E0h);};Editor[Z4h]=function(editor,conf,files,progressCallback,completeCallback){var p4h="adText";var V4h="readAs";var L4h='A server error occurred while uploading the file';var e4h="DataU";var I4h="itLeft";var r4h="RL";var h7h="_limitLeft";var m4h="<i>Uploading file</i";var c4h="fileRe";var k5l=V4h;k5l+=e4h;k5l+=r4h;var b5l=g4h;b5l+=n7r;b5l+=I4h;var u9g=L3H;u9g+=H3h;u9g+=s4h;var J9g=m4h;J9g+=S1H;var D9g=c4h;D9g+=p4h;var i9g=z2r;i9g+=t4h;var reader=new FileReader();var counter=I8c;var ids=[];var generalError=L4h;editor[q9H](conf[a4h],B7H);if(typeof conf[i9g] === D59.G9c){conf[y0H](files,function(ids){var F9g=X4H;F9g+=s3H;F9g+=s9c;F9g+=s9c;completeCallback[F9g](editor,ids);});return;}progressCallback(conf,conf[D9g] || J9g);reader[u9g]=function(e){var K7h="ata` with an object. Please use it as a function instead.";var M4h="E_U";var F7h="xData";var o4h="lainObject";var f4h="preSubmit.DT";var O7h='No Ajax option specified for upload plug-in';var Y4h="load";var U4h="aja";var C4h="str";var u7h="adFie";var l7h="ajaxData";var A7h="Upload feature cannot use `ajax.d";var d4h="sP";var P7h="Obj";var J7h="uplo";var z7h="readAsDataURL";var h4h="preUplo";var I9g=T4h;I9g+=c9c;I9g+=M9c;var g9g=f9c;g9g+=Q4h;var r9g=s3H;r9g+=K0h;r9g+=s3H;r9g+=P2H;var e9g=f4h;e9g+=M4h;e9g+=l5H;e9g+=Y4h;var W9g=h4h;W9g+=X9H;var v9g=r9c;v9g+=x4h;var y9g=H9c;y9g+=d4h;y9g+=o4h;var N9g=z3r;N9g+=a5h;N9g+=j4h;N9g+=A5H;var S9g=r9c;S9g+=s3H;S9g+=S8H;var Q9g=C4h;Q9g+=W5H;Q9g+=v4H;var q9g=U4h;q9g+=P2H;var X9g=s3H;X9g+=H4h;var R9g=v4h;R9g+=P7h;R9g+=i7h;var K9g=U4h;K9g+=F7h;var A9g=D7h;A9g+=Z4H;A9g+=s3H;A9g+=r9c;var k9g=J7h;k9g+=u7h;k9g+=m4H;var O9g=a3H;O9g+=l5H;O9g+=Z4H;O9g+=X9H;var b9g=m6h;b9g+=H9c;b9g+=G8H;var l9g=n6r;l9g+=r9c;var data=new FormData();var ajax;data[l9g](b9g,O9g);data[D5r](k9g,conf[a4h]);data[D5r](A9g,files[counter]);if(conf[K9g]){conf[l7h](data,files[counter],counter);}if(conf[y0H]){var z9g=s3H;z9g+=K0h;z9g+=s3H;z9g+=P2H;ajax=conf[z9g];}else if($[R9g](editor[c9c][X9g])){var w9g=a3H;w9g+=V5r;w9g+=L3H;w9g+=X9H;var E9g=b7h;E9g+=r9c;var B9g=U4h;B9g+=P2H;ajax=editor[c9c][B9g][E9g]?editor[c9c][y0H][w9g]:editor[c9c][y0H];}else if(typeof editor[c9c][q9g] === r5r){ajax=editor[c9c][y0H];}if(!ajax){throw new Exception(O7h);}if(typeof ajax === Q9g){ajax={url:ajax};}if(typeof ajax[S9g] === N9g){var n9g=k7h;n9g+=v4H;var d={};var ret=ajax[D2H](d);if(ret !== undefined && typeof ret !== n9g){d=ret;}$[m7H](d,function(key,value){data[D5r](key,value);});}else if($[y9g](ajax[v9g])){var G9g=A7h;G9g+=K7h;throw new Exception(G9g);}var preRet=editor[b0h](W9g,[conf[a4h],files[counter],data]);if(preRet === j7H){var Z9g=s9c;Z9g+=G6r;Z9g+=d8H;if(counter < files[Z9g] - s8c){counter++;reader[z7h](files[counter]);}else {var V9g=X4H;V9g+=s3H;V9g+=s9c;V9g+=s9c;completeCallback[V9g](editor,ids);}return;}var submit=j7H;editor[G8H](e9g,function(){submit=C7H;return j7H;});$[r9g]($[g9g]({},ajax,{type:I9g,data:data,dataType:K5h,contentType:j7H,processData:j7H,xhr:function(){var R7h="Setting";var w7h="onprogr";var B7h="onl";D59.f59();var E7h="dend";var s9g=y0H;s9g+=R7h;s9g+=c9c;var xhr=$[s9g][X7h]();if(xhr[Z4h]){var L9g=B7h;L9g+=L3H;L9g+=s3H;L9g+=E7h;var m9g=w7h;m9g+=i9r;xhr[Z4h][m9g]=function(e){var y7h="%";var Q7h="mputable";var n7h="toFixed";var S7h="tot";var q7h="gthCo";var v7h=':';var N7h="aded";var c9g=x8H;c9g+=q7h;c9g+=Q7h;if(e[c9g]){var t9g=S7h;t9g+=s3H;t9g+=s9c;var p9g=s9c;p9g+=L3H;p9g+=N7h;var percent=(e[p9g] / e[t9g] * A9c)[n7h](I8c) + y7h;progressCallback(conf,files[o7H] === s8c?percent:counter + v7h + files[o7H] + r2H + percent);}};xhr[Z4h][L9g]=function(e){var W7h="essingText";var G7h="proc";var Z7h='Processing';var a9g=G7h;a9g+=W7h;progressCallback(conf,conf[a9g] || Z7h);};}return xhr;},success:function(json){var c7h="fieldErrors";var r7h="eldErro";var e7h="rors";var s7h='preSubmit.DTE_Upload';var m7h='uploadXhrSuccess';var x9g=V7h;x9g+=M9c;x9g+=C3H;var h9g=o1r;h9g+=e9c;h9g+=d5H;h9g+=e7h;var Y9g=I9c;Y9g+=r7h;Y9g+=g7h;var M9g=A5H;M9g+=s3H;M9g+=P5H;D59.S59();var f9g=l3h;f9g+=I7h;var T9g=W7r;T9g+=N3H;editor[T9g](s7h);editor[f9g](m7h,[conf[M9g],json]);if(json[Y9g] && json[h9g][x9g]){var errors=json[c7h];for(var i=I8c,ien=errors[o7H];i < ien;i++){editor[q9H](errors[i][a4h],errors[i][p7h]);}}else if(json[q9H]){var d9g=m9c;d9g+=d5H;d9g+=Q9H;editor[d9g](json[q9H]);}else if(!json[Z4h] || !json[Z4h][E2H]){var o9g=l1H;o9g+=d5H;o9g+=L3H;o9g+=d5H;editor[o9g](conf[a4h],generalError);}else {var D5l=H9c;D5l+=r9c;var F5l=t7h;F5l+=L7h;F5l+=r9c;var i5l=l5H;i5l+=a3H;i5l+=a7h;var j9g=I9c;j9g+=s9c;j9g+=m9c;j9g+=c9c;if(json[j9g]){var C9g=m9c;C9g+=s3H;C9g+=X4H;C9g+=C3H;$[C9g](json[p7H],function(table,files){var T7h="les";var f7h="fil";var P5l=I9c;P5l+=T7h;var U9g=f7h;U9g+=R9H;if(!Editor[U9g][table]){var H9g=f7h;H9g+=m9c;H9g+=c9c;Editor[H9g][table]={};}D59.S59();$[K2H](Editor[P5l][table],files);});}ids[i5l](json[F5l][D5l]);if(counter < files[o7H] - s8c){counter++;reader[z7h](files[counter]);}else {var J5l=X4H;J5l+=s3H;J5l+=s9c;J5l+=s9c;completeCallback[J5l](editor,ids);if(submit){editor[I6H]();}}}progressCallback(conf);},error:function(xhr){var Y7h='uploadXhrError';var M7h="ame";var l5l=A5H;l5l+=M7h;var u5l=A5H;u5l+=s3H;u5l+=P5H;D59.S59();editor[b0h](Y7h,[conf[u5l],xhr]);editor[q9H](conf[l5l],generalError);progressCallback(conf);}}));};files=$[H5h](files,function(val){D59.f59();return val;});if(conf[b5l] !== undefined){var O5l=s9c;O5l+=G6r;O5l+=d8H;files[A2r](conf[h7h],files[O5l]);}reader[k5l](files[I8c]);};Editor[A5l][G7H]=function(init){var Y1h="dataSources";var i1h="ody";var g1h="empl";var C1h='</form>';var p1h="Ta";var w1h="m\" class=";var G1h="div data-dte-e";var m1h="cyA";var l1h="tons\" class=\"";var c1h="dataSo";var K2h="footer";var I1h="mplate";var H1h="info";var q1h="foot";var z2h='foot';var Q1h="rapp";var H7h="bodyC";var d1h='<div data-dte-e="body_content" class="';var O1h="wrapp";var x1h='<div data-dte-e="body" class="';var S1h="foote";var K1h="te-e=\"head\" clas";var V1h=" class=";var W1h="=\"processing\" class=\"";var u2h="BUTTONS";var L1h="defau";var J1h="v data-dt";var w2h="ni";var N1h="<div data-dte-e=\"foo";var R2h='init.dt.dte';var F1h="formC";var U1h='<div data-dte-e="form_info" class="';var A1h="ta-d";var R1h="<div data-dte-e=\"form_error\" cla";var d7h="nitComp";var s1h="leg";var D1h="dataTa";var P2h='"><div class="';var E1h="ata-dte-e=\"for";var i2h='"/></div>';var k1h="<div da";var S2h='initEditor';var t1h="db";var U7h="ody_cont";var a1h="lts";var j1h='<div data-dte-e="form_content" class="';var o1h="tag";var e1h="ique";var h1h="indicator";var C7h="uniqu";var n1h="t\" class=\"";var P1h="ont";var A2h='form_content';var u1h="e-e=\"form_but";var B1h="<form d";var j7h=".dt";var I3l=x7h;I3l+=v4H;I3l+=v4H;D59.f59();I3l+=l1H;var g3l=H9c;g3l+=d7h;g3l+=o7h;var r3l=l3h;r3l+=F3r;r3l+=A5H;r3l+=M9c;var v3l=X7h;v3l+=j7h;v3l+=f5h;v3l+=x4r;var y3l=L3H;y3l+=A5H;var S3l=C7h;S3l+=m9c;var q3l=l5H;q3l+=b5H;q3l+=D0H;q3l+=a0h;var w3l=D3H;w3l+=U7h;w3l+=G6r;w3l+=M9c;var E3l=H7h;E3l+=P1h;E3l+=m9c;E3l+=G7r;var B3l=D3H;B3l+=i1h;var X3l=F1h;X3l+=G8H;X3l+=P1r;var R3l=D0r;R3l+=J0r;R3l+=l5H;R3l+=l1H;var z3l=r9c;z3l+=L3H;z3l+=K3H;var O3l=m9c;O3l+=T0h;O3l+=M9c;O3l+=c9c;var D3l=D1h;D3l+=n5H;var F3l=N3H;F3l+=A5H;var i3l=E1H;i3l+=J1h;i3l+=u1h;i3l+=l1h;var P3l=g9H;P3l+=b1h;P3l+=M9c;var H5l=C3H;H5l+=o0h;var U5l=O1h;U5l+=l1H;var C5l=k1h;C5l+=A1h;C5l+=K1h;C5l+=o2r;var j5l=e7H;j5l+=l6h;j5l+=S1H;var o5l=N3H;o5l+=n3H;var d5l=z1h;d5l+=K3H;var x5l=R1h;x5l+=X1h;var h5l=e7H;h5l+=l6h;h5l+=S1H;var Y5l=k3H;Y5l+=d5H;Y5l+=K3H;var M5l=e7H;M5l+=S1H;var f5l=N3H;f5l+=L3H;f5l+=d5H;f5l+=K3H;var T5l=B1h;T5l+=E1h;T5l+=w1h;T5l+=e7H;var a5l=z1H;a5l+=R1H;var L5l=e7H;L5l+=l6h;L5l+=S1H;var t5l=q1h;t5l+=l1H;var p5l=e7H;p5l+=S1H;var c5l=E6H;c5l+=Q1h;c5l+=l1H;var m5l=S1h;m5l+=d5H;var s5l=N1h;s5l+=n1h;var I5l=e7H;I5l+=l6h;I5l+=S1H;var g5l=D3H;g5l+=i1h;var r5l=y1h;r5l+=v1h;var e5l=X1H;e5l+=G1h;e5l+=W1h;var V5l=e7H;V5l+=S1H;var Z5l=Z1h;Z5l+=V1h;Z5l+=e7H;var W5l=r9c;W5l+=L3H;W5l+=K3H;var G5l=a3H;G5l+=A5H;G5l+=e1h;var v5l=r1h;v5l+=D59.N9c;v5l+=A5H;var y5l=X4H;y5l+=C2r;y5l+=T8H;var n5l=v4r;n5l+=s3H;n5l+=X4H;n5l+=C3H;var N5l=M9c;N5l+=g1h;N5l+=X6H;var S5l=J5H;S5l+=I1h;var Q5l=s1h;Q5l+=s3H;Q5l+=m1h;Q5l+=H4h;var q5l=c1h;q5l+=a3H;q5l+=d1r;q5l+=c9c;var w5l=k8H;w5l+=p1h;w5l+=X0H;w5l+=m9c;var E5l=z2r;E5l+=s3H;E5l+=P2H;var B5l=t1h;B5l+=c3H;B5l+=s3H;B5l+=n5H;var X5l=M9c;X5l+=s3H;X5l+=X0H;X5l+=m9c;var R5l=U8H;R5l+=K3H;R5l+=p1h;R5l+=n5H;var z5l=k5H;z5l+=m4r;var K5l=L1h;K5l+=a1h;init=$[K2H](C7H,{},Editor[K5l],init);this[c9c]=$[z5l](C7H,{},Editor[A8H][B2H],{actionName:init[T1h],table:init[R5l] || init[X5l],dbTable:init[B5l] || D8H,ajaxUrl:init[f1h],ajax:init[E5l],idSrc:init[M1h],dataSource:init[w5l] || init[m1r]?Editor[q5l][q7H]:Editor[Y1h][F5r],formOptions:init[H3r],legacyAjax:init[Q5l],template:init[S5l]?$(init[N5l])[n5l]():D8H});this[b9H]=$[K2H](C7H,{},Editor[y5l]);this[v5l]=init[T3r];Editor[A8H][B2H][G5l]++;var that=this;var classes=this[b9H];this[W5l]={"wrapper":$(Z5l + classes[e2H] + V5l + e5l + classes[r5l][h1h] + i8H + x1h + classes[t7r][e2H] + I2H + d1h + classes[g5l][L6r] + I5l + d2H + s5l + classes[m5l][c5l] + p5l + V2H + classes[t5l][L6r] + L5l + d2H + a5l)[I8c],"form":$(T5l + classes[f5l][o1h] + M5l + j1h + classes[Y5l][L6r] + h5l + C1h)[I8c],"formError":$(x5l + classes[d5l][q9H] + T2H)[I8c],"formInfo":$(U1h + classes[o5l][H1h] + j5l)[I8c],"header":$(C5l + classes[w8r][U5l] + P2h + classes[H5l][P3l] + i2h)[I8c],"buttons":$(i3l + classes[W3H][q8r] + T2H)[I8c]};if($[F3l][D3l][F2h]){var l3l=D2h;l3l+=F3r;var u3l=m9c;u3l+=s1r;var J3l=J2h;J3l+=A5H;var ttButtons=$[Z7H][q7H][F2h][u2h];var i18n=this[J3l];$[u3l]([F8H,S6h,l3l],function(i,val){var O2h="sButtonText";var b2h='editor_';var l2h="butt";D59.S59();var b3l=l2h;b3l+=G8H;ttButtons[b2h + val][O2h]=i18n[val][b3l];});}$[m7H](init[O3l],function(evt,fn){var k3l=L3H;k3l+=A5H;D59.S59();that[k3l](evt,function(){var K3l=s3H;K3l+=d5h;K3l+=s9c;K3l+=y6H;var A3l=c9c;A3l+=s9c;D59.f59();A3l+=k2h;var args=Array[I8H][A3l][E9r](arguments);args[d3r]();fn[K3l](that,args);});});var dom=this[z3l];var wrapper=dom[R3l];dom[X3l]=_editor_el(A2h,dom[W3H])[I8c];dom[K2h]=_editor_el(z2h,wrapper)[I8c];dom[B3l]=_editor_el(c0r,wrapper)[I8c];dom[E3l]=_editor_el(w3l,wrapper)[I8c];dom[P8H]=_editor_el(q3l,wrapper)[I8c];if(init[l2r]){var Q3l=I9c;Q3l+=s9r;this[Q8r](init[Q3l]);}$(document)[G8H](R2h + this[c9c][S3l],function(e,settings,json){var X2h="nTable";var n3l=v4H;n3l+=m9c;n3l+=M9c;var N3l=M9c;N3l+=s3H;N3l+=D3H;N3l+=D4H;if(that[c9c][m1r] && settings[X2h] === $(that[c9c][N3l])[n3l](I8c)){settings[P4h]=that;}})[y3l](v3l + this[c9c][o5h],function(e,settings,json){var B2h="nT";var Z3l=v4H;Z3l+=m9c;D59.S59();Z3l+=M9c;var W3l=S8H;W3l+=n5H;var G3l=B2h;G3l+=L7H;G3l+=D4H;if(json && that[c9c][m1r] && settings[G3l] === $(that[c9c][W3l])[Z3l](I8c)){that[E2h](json);}});try{var e3l=H9c;e3l+=w2h;e3l+=M9c;var V3l=q2h;V3l+=O4H;this[c9c][j3r]=Editor[V3l][init[o9H]][e3l](this);}catch(e){var Q2h='Cannot find display controller ';throw Q2h + init[o9H];}this[r3l](g3l,[]);$(document)[I3l](S2h,[this]);};Editor[I8H][Y9r]=function(){var e2h="addCla";var N2h="rea";var y2h="wra";var W2h="dClass";var Z2h="dd";var v2h="actions";var n2h="Cla";var L3l=d5H;L3l+=K4h;var t3l=m9c;t3l+=r9c;t3l+=H9c;t3l+=M9c;var p3l=X4H;p3l+=N2h;p3l+=M9c;p3l+=m9c;var c3l=h8r;c3l+=n2h;c3l+=q8H;var m3l=y2h;m3l+=d5h;m3l+=l1H;var s3l=s3H;s3l+=X4H;s3l+=V3H;var classesActions=this[b9H][v2h];var action=this[c9c][s3l];var wrapper=$(this[k8H][m3l]);wrapper[c3l]([classesActions[p3l],classesActions[t3l],classesActions[L3l]][G2h](r2H));if(action === a9r){var a3l=X9H;a3l+=W2h;wrapper[a3l](classesActions[a9r]);}else if(action === O3h){var T3l=s3H;T3l+=Z2h;T3l+=V2h;T3l+=N3r;wrapper[T3l](classesActions[O3h]);}else if(action === h8r){var M3l=d5H;M3l+=m9c;M3l+=e3H;M3l+=F3r;var f3l=e2h;f3l+=c9c;f3l+=c9c;wrapper[f3l](classesActions[M3l]);}};Editor[I8H][Y3l]=function(data,success,error,submitParams){var l8h="nshift";var k8h="deleteBody";var H2h=/_id_/;var O8h='DELETE';var o2h='idSrc';var F8h="rl";var i8h="url";var A8h="param";var b8h="complete";var P8h="split";var r2h="lain";var j2h=',';var D8h="complet";var K8h='?';var s2h='POST';var k6l=c9c;k6l+=x7h;k6l+=A5H;k6l+=v4H;var u6l=z3r;u6l+=R3r;u6l+=A5H;var J6l=t5h;J6l+=r2h;J6l+=G4h;var F6l=g2h;F6l+=e9r;var i6l=I2h;i6l+=M9c;i6l+=I4H;i6l+=E5r;var P6l=D2h;P6l+=F3r;var x3l=K0h;x3l+=c9c;x3l+=L3H;x3l+=A5H;var h3l=H7H;h3l+=M9c;h3l+=j4h;h3l+=A5H;var that=this;var action=this[c9c][h3l];var thrown;var opts={type:s2h,dataType:x3l,data:D8H,error:[function(xhr,text,err){thrown=err;}],success:[],complete:[function(xhr,text){var T2h="seTe";var x2h="esponseJSON";var t2h="tatus";var p2h="ponseText";var d2h="responseJSON";var K9c=204;var Y2h="rse";var h2h="JSO";var a2h="respon";var m2h="isPlai";var L2h='null';var c2h="nO";var H3l=m2h;H3l+=c2h;H3l+=M3h;var o3l=a0H;o3l+=c9c;o3l+=p2h;var d3l=c9c;d3l+=t2h;var json=D8H;if(xhr[d3l] === K9c || xhr[o3l] === L2h){json={};}else {try{var U3l=a2h;U3l+=T2h;U3l+=f2h;var C3l=M2h;C3l+=Y2h;C3l+=h2h;C3l+=f3H;var j3l=d5H;j3l+=x2h;json=xhr[j3l]?xhr[d2h]:$[C3l](xhr[U3l]);}catch(e){}}if($[H3l](json) || $[M1r](json)){success(json,xhr[p7h] >= z9c,xhr);}else {error(xhr,text,thrown);}}]};var a;D59.S59();var ajaxSrc=this[c9c][y0H] || this[c9c][f1h];var id=action === S6h || action === P6l?_pluck(this[c9c][i6l],o2h):D8H;if($[F6l](id)){var D6l=K0h;D6l+=L3H;D6l+=H9c;D6l+=A5H;id=id[D6l](j2h);}if($[J6l](ajaxSrc) && ajaxSrc[action]){ajaxSrc=ajaxSrc[action];}if(typeof ajaxSrc === u6l){var uri=D8H;var method=D8H;if(this[c9c][f1h]){var O6l=J6h;O6l+=w6h;O6l+=m9c;var l6l=X4H;l6l+=B4H;var url=this[c9c][f1h];if(url[l6l]){uri=url[action];}if(uri[C2h](r2H) !== -s8c){var b6l=b4H;b6l+=U2h;a=uri[b6l](r2H);method=a[I8c];uri=a[s8c];}uri=uri[O6l](H2h,id);}ajaxSrc(method,uri,data,success,error);return;}else if(typeof ajaxSrc === k6l){if(ajaxSrc[C2h](r2H) !== -s8c){a=ajaxSrc[P8h](r2H);opts[G6H]=a[I8c];opts[i8h]=a[s8c];}else {var A6l=a3H;A6l+=F8h;opts[A6l]=ajaxSrc;}}else {var B6l=m9c;B6l+=d5H;B6l+=b5H;B6l+=d5H;var z6l=D8h;z6l+=m9c;var K6l=m9c;K6l+=P2H;K6l+=Q4h;var optsCopy=$[K6l]({},ajaxSrc || ({}));if(optsCopy[z6l]){var X6l=J8h;X6l+=u8h;X6l+=J5H;var R6l=a3H;R6l+=l8h;opts[b8h][R6l](optsCopy[b8h]);delete optsCopy[X6l];}if(optsCopy[B6l]){var E6l=m9c;E6l+=d5H;E6l+=d5H;E6l+=N3h;opts[q9H][m8H](optsCopy[E6l]);delete optsCopy[q9H];}opts=$[K2H]({},opts,optsCopy);}opts[i8h]=opts[i8h][g5r](H2h,id);if(opts[D2H]){var Q6l=f9c;Q6l+=Q4h;var q6l=r9c;q6l+=s3H;q6l+=M9c;q6l+=s3H;var w6l=z3r;w6l+=c5h;var isFn=typeof opts[D2H] === w6l;var newData=isFn?opts[q6l](data):opts[D2H];data=isFn && newData?newData:$[Q6l](C7H,data,newData);}opts[D2H]=data;if(opts[G6H] === O8h && (opts[k8h] === undefined || opts[k8h] === C7H)){var N6l=a3H;N6l+=d5H;N6l+=s9c;var S6l=a3H;S6l+=d5H;S6l+=s9c;var params=$[A8h](opts[D2H]);opts[S6l]+=opts[N6l][C2h](K8h) === -s8c?K8h + params:m5r + params;delete opts[D2H];}$[y0H](opts);};Editor[n6l][y6l]=function(target,style,time,callback){var v6l=N3H;D59.f59();v6l+=A5H;if($[v6l][w3r]){target[z8h]()[w3r](style,time,callback);}else {var W6l=z3r;W6l+=a5h;W6l+=H9c;W6l+=G8H;var G6l=X4H;G6l+=c9c;G6l+=c9c;target[G6l](style);if(typeof time === W6l){var Z6l=X4H;Z6l+=s3H;Z6l+=s9c;Z6l+=s9c;time[Z6l](target);}else if(callback){var V6l=X4H;V6l+=A5r;V6l+=s9c;callback[V6l](target);}}};Editor[e6l][r6l]=function(){var B8h="ormErr";var E8h="ader";var X8h="bodyConten";var w8h="repe";var a6l=N3H;a6l+=L3H;a6l+=R8h;var L6l=V8H;L6l+=m4r;var t6l=X8h;t6l+=M9c;var p6l=N3H;p6l+=B8h;p6l+=N3h;var c6l=V8H;c6l+=m9c;c6l+=I3H;var m6l=N3H;m6l+=R3H;m6l+=X3H;var s6l=j0r;s6l+=E8h;var I6l=l5H;I6l+=w8h;I6l+=I3H;var g6l=E6H;g6l+=K4r;g6l+=p7r;var dom=this[k8H];$(dom[g6l])[I6l](dom[s6l]);$(dom[m6l])[c6l](dom[p6l])[D5r](dom[q8r]);$(dom[t6l])[D5r](dom[E8r])[L6l](dom[a6l]);};Editor[T6l][f6l]=function(){var S8h="onB";var q8h="eBl";var d6l=Q3H;d6l+=a4r;d6l+=m9c;var x6l=z3r;x6l+=X4H;x6l+=V3H;var h6l=l5H;h6l+=d5H;D59.f59();h6l+=q8h;h6l+=B0H;var Y6l=Q8h;Y6l+=A4H;var M6l=S8h;M6l+=N8h;var opts=this[c9c][n8h];var onBlur=opts[M6l];if(this[Y6l](h6l) === j7H){return;}if(typeof onBlur === x6l){onBlur(this);}else if(onBlur === P6r){this[I6H]();}else if(onBlur === d6l){this[y8h]();}};Editor[o6l][j6l]=function(){var F0l=J1H;D59.S59();F0l+=v0H;F0l+=v1H;var P0l=m9c;P0l+=s3H;P0l+=X4H;P0l+=C3H;var H6l=r9c;H6l+=L3H;H6l+=K3H;var U6l=r9c;U6l+=H9c;U6l+=f0H;U6l+=f5h;var C6l=D9r;C6l+=c9c;C6l+=T8H;if(!this[c9c]){return;}var errorClass=this[C6l][o1r][q9H];var fields=this[c9c][l2r];$(U6l + errorClass,this[H6l][e2H])[N9H](errorClass);$[P0l](fields,function(name,field){var i0l=l1H;i0l+=Q9H;field[i0l](B7H)[B8r](B7H);});this[q9H](B7H)[F0l](B7H);};Editor[D0l][y8h]=function(submitComplete,mode){var W8h='preClose';var v8h="eIcb";var e8h='focus.editor-focus';var O0l=i3H;O0l+=m9c;O0l+=I7h;var b0l=k9H;b0l+=P3h;b0l+=r9c;var l0l=W7r;D59.S59();l0l+=N3H;var u0l=Q3H;u0l+=a4r;u0l+=v8h;var J0l=G8h;J0l+=G7r;var closed;if(this[J0l](W8h) === j7H){return;}if(this[c9c][Z8h]){closed=this[c9c][Z8h](submitComplete,mode);this[c9c][Z8h]=D8H;}if(this[c9c][u0l]){this[c9c][V8h]();this[c9c][V8h]=D8H;}$(c0r)[l0l](e8h);this[c9c][b0l]=j7H;this[O0l](i6r);if(closed){var A0l=k4r;A0l+=q5H;A0l+=r9c;var k0l=Q8h;k0l+=G6r;k0l+=M9c;this[k0l](A0l,[closed]);}};Editor[I8H][K0l]=function(fn){D59.S59();this[c9c][Z8h]=fn;};Editor[I8H][z0l]=function(arg1,arg2,arg3,arg4){var r8h="ainObj";var E0l=L0r;E0l+=H9c;E0l+=A5H;var B0l=f9c;B0l+=J5H;B0l+=I3H;var R0l=t5h;R0l+=s9c;R0l+=r8h;R0l+=i7h;var that=this;var title;var buttons;var show;var opts;if($[R0l](arg1)){opts=arg1;}else if(typeof arg1 === e2r){show=arg1;opts=arg2;;}else {title=arg1;buttons=arg2;show=arg3;opts=arg4;;}if(show === undefined){show=C7H;}if(title){that[d0h](title);}if(buttons){var X0l=D3H;X0l+=a3H;X0l+=M9c;X0l+=g8h;that[X0l](buttons);}return {opts:$[B0l]({},this[c9c][H3r][E0l],opts),maybeOpen:function(){if(show){that[j6h]();}}};};Editor[w0l][q0l]=function(name){var s8h="dataSource";var m8h="ply";var S0l=a7h;S0l+=H9c;S0l+=I8h;var Q0l=Y5r;Q0l+=k2h;var args=Array[I8H][Q0l][E9r](arguments);args[S0l]();var fn=this[c9c][s8h][name];if(fn){var N0l=J0r;N0l+=m8h;return fn[N0l](this,args);}};Editor[I8H][n0l]=function(includeFields){var U8h="ndT";var f8h="ludeFields";var p8h="aye";var T8h="udeFields";var c8h="actio";var H8h='displayOrder';var a8h="inc";var L8h="formContent";var t8h="rde";var a0l=c8h;a0l+=A5H;var L0l=r9c;L0l+=Q6r;L0l+=p8h;L0l+=r9c;var t0l=i3H;t0l+=m9c;t0l+=I7h;var c0l=H6h;c0l+=A5H;var v0l=L3H;v0l+=t8h;v0l+=d5H;var y0l=o1r;y0l+=c9c;var that=this;var formContent=$(this[k8H][L8h]);var fields=this[c9c][y0l];var order=this[c9c][v0l];var template=this[c9c][x0h];var mode=this[c9c][r4H] || k3h;if(includeFields){var G0l=a8h;G0l+=s9c;G0l+=T8h;this[c9c][G0l]=includeFields;}else {var W0l=a8h;W0l+=f8h;includeFields=this[c9c][W0l];}formContent[p0r]()[i5r]();$[m7H](order,function(i,fieldOrName){var M8h="_we";var C8h='[data-editor-template="';var j8h="after";var x8h="editor-field";var d8h="[name=\"";var Y8h="akInA";var V0l=M8h;V0l+=Y8h;V0l+=S3h;V0l+=O4H;var Z0l=s4H;Z0l+=H9c;Z0l+=V5H;var name=fieldOrName instanceof Editor[Z0l]?fieldOrName[a4h]():fieldOrName;if(that[V0l](name,includeFields) !== -s8c){var e0l=K3H;e0l+=u0h;e0l+=A5H;if(template && mode === e0l){var m0l=A5H;m0l+=h8h;m0l+=m9c;var s0l=y6r;s0l+=A5H;s0l+=r9c;var I0l=C0H;I0l+=r9c;I0l+=m9c;var g0l=x8h;g0l+=d8h;var r0l=N3H;r0l+=M6r;template[r0l](g0l + name + o8h)[j8h](fields[name][I0l]());template[r5h](C8h + name + o8h)[s0l](fields[name][m0l]());}else {formContent[D5r](fields[name][W5h]());}}});if(template && mode === c0l){var p0l=V8H;p0l+=m9c;p0l+=U8h;p0l+=L3H;template[p0l](formContent);}this[t0l](H8h,[this[c9c][L0l],this[c9c][a0l],formContent]);};Editor[T0l][r2r]=function(items,editFields,type,formOptions,setupDone){var F9h="ditDa";var P9h="itE";var z9h='node';var K9h="toString";var D9h="editF";var A4l=H9c;A4l+=A5H;A4l+=P9h;A4l+=i9h;var k4l=Q8h;k4l+=A4H;var b4l=o5r;b4l+=X4H;b4l+=m9c;var o0l=K3H;o0l+=h8h;o0l+=m9c;var d0l=D3H;d0l+=Z4H;d0l+=t4H;var x0l=d9H;x0l+=r7r;var h0l=r9c;h0l+=L3H;h0l+=K3H;var Y0l=m9c;Y0l+=F9h;Y0l+=M9c;Y0l+=s3H;var M0l=D9h;M0l+=u4H;M0l+=s9c;M0l+=E5r;var f0l=h6H;f0l+=E5r;var that=this;var fields=this[c9c][f0l];var usedFields=[];var includeInOrder;var editData={};this[c9c][M0l]=editFields;this[c9c][Y0l]=editData;this[c9c][L1r]=items;this[c9c][p1r]=O3h;this[h0l][W3H][x0l][o9H]=d0l;this[c9c][o0l]=type;this[Y9r]();$[m7H](fields,function(name,field){var u9h="multiRe";var l4l=X8H;l4l+=J9h;var C0l=m9c;C0l+=H7H;C0l+=C3H;var j0l=u9h;j0l+=Z7r;field[j0l]();includeInOrder=j7H;editData[name]={};$[C0l](editFields,function(idSrc,edit){var A9h="layFields";var b9h="scope";var k9h="ayFiel";var O9h="ayFields";var U0l=I9c;U0l+=V5H;D59.S59();U0l+=c9c;if(edit[U0l][name]){var P4l=b5H;P4l+=E6H;var H0l=l9h;H0l+=s3H;var val=field[N2H](edit[H0l]);editData[name][idSrc]=val === D8H?B7H:$[M1r](val)?val[s8H]():val;if(!formOptions || formOptions[b9h] === P4l){var D4l=q2h;D4l+=O9h;var F4l=V0H;F4l+=U4r;F4l+=k9h;F4l+=E5r;var i4l=r9c;i4l+=m9c;i4l+=N3H;field[x9r](idSrc,val !== undefined?val:field[i4l]());if(!edit[F4l] || edit[D4l][name]){includeInOrder=C7H;}}else {var J4l=V0H;J4l+=b4H;J4l+=A9h;if(!edit[J4l] || edit[d3h][name]){var u4l=r9c;u4l+=m9c;u4l+=N3H;field[x9r](idSrc,val !== undefined?val:field[u4l]());includeInOrder=C7H;}}}});if(field[l4l]()[o7H] !== I8c && includeInOrder){usedFields[c7H](name);}});var currOrder=this[P0H]()[b4l]();for(var i=currOrder[o7H] - s8c;i >= I8c;i--){if($[q5r](currOrder[i][K9h](),usedFields) === -s8c){var O4l=b4H;O4l+=C9H;O4l+=D0H;currOrder[O4l](i,s8c);}}this[K2r](currOrder);this[k4l](A4l,[_pluck(editFields,z9h)[I8c],_pluck(editFields,I5h)[I8c],items,type],function(){var R9h='initMultiEdit';var K4l=G8h;K4l+=A5H;K4l+=M9c;D59.f59();that[K4l](R9h,[editFields,items,type],function(){D59.f59();setupDone();});});};Editor[z4l][R4l]=function(trigger,args,promiseComplete){var w9h="result";var n9h="objec";var B9h="Ev";var Q9h="gerHandler";var q9h="trig";var N9h='Cancelled';D59.f59();var E9h='pre';var X9h="triggerHandl";var X4l=g2h;X4l+=e9r;if(!args){args=[];}if($[X4l](trigger)){for(var i=I8c,ien=trigger[o7H];i < ien;i++){this[b0h](trigger[i],args);}}else {var E4l=X9h;E4l+=m9c;E4l+=d5H;var B4l=B9h;B4l+=A4H;var e=$[B4l](trigger);$(this)[E4l](e,args);if(trigger[C2h](E9h) === I8c && e[w9h] === j7H){var w4l=q9h;w4l+=Q9h;$(this)[w4l]($[S9h](trigger + N9h),args);}if(promiseComplete){var Q4l=n9h;Q4l+=M9c;var q4l=a0H;q4l+=c9c;q4l+=r1H;if(e[w9h] && typeof e[q4l] === Q4l && e[w9h][p5h]){var S4l=M9c;S4l+=j0r;S4l+=A5H;e[w9h][S4l](promiseComplete);}else {promiseComplete(e[w9h]);}}return e[w9h];}};Editor[N4l][h6h]=function(input){var v9h=/^on([A-Z])/;var W9h="substring";var y4l=x8H;y4l+=d8H;var n4l=c9c;n4l+=l5H;n4l+=C9H;n4l+=M9c;var name;var names=input[n4l](r2H);for(var i=I8c,ien=names[y4l];i < ien;i++){name=names[i];var onStyle=name[y9h](v9h);if(onStyle){name=onStyle[s8c][G9h]() + name[W9h](c8c);}names[i]=name;}return names[G2h](r2H);};Editor[v4l][G4l]=function(node){var W4l=B5h;D59.f59();W4l+=v3H;var foundField=D8H;$[W4l](this[c9c][l2r],function(name,field){var e4l=D4H;e4l+=A5H;e4l+=v4H;e4l+=c3r;var V4l=N3H;V4l+=W5H;V4l+=r9c;var Z4l=A5H;Z4l+=L3H;Z4l+=r9c;Z4l+=m9c;if($(field[Z4l]())[V4l](node)[e4l]){foundField=field;}});return foundField;};Editor[r4l][m9r]=function(fieldNames){var g4l=Z9h;g4l+=W9r;if(fieldNames === undefined){return this[l2r]();}else if(!$[g4l](fieldNames)){return [fieldNames];}D59.S59();return fieldNames;};Editor[I8H][I4l]=function(fieldsIn,focus){var V9h="numbe";var s9h='div.DTE ';var I9h="dexOf";var m9h=/^jq:/;var m4l=V9h;m4l+=d5H;D59.f59();var that=this;var field;var fields=$[H5h](fieldsIn,function(fieldOrName){var e9h="stri";var s4l=e9h;s4l+=f0h;D59.S59();return typeof fieldOrName === s4l?that[c9c][l2r][fieldOrName]:fieldOrName;});if(typeof focus === m4l){field=fields[focus];}else if(focus){var p4l=K0h;p4l+=r9h;p4l+=g9h;var c4l=W5H;c4l+=I9h;if(focus[c4l](p4l) === I8c){var t4l=a0H;t4l+=V5r;t4l+=e5r;field=$(s9h + focus[t4l](m9h,B7H));}else {var L4l=I9c;L4l+=r3H;L4l+=r9c;L4l+=c9c;field=this[c9c][L4l][focus];}}else {document[c9h][G8r]();}this[c9c][p9h]=field;if(field){var a4l=N3H;a4l+=n5r;a4l+=a3H;a4l+=c9c;field[a4l]();}};Editor[T4l][F8r]=function(opts){var X5t="canReturnSubmit";var L9h="lean";var t9h="keyu";var x9h="rn";var R5t="_fieldFromNode";var Y9h="blurOnBackgr";var o9h="closeOnComplete";var i5t="bmitOnReturn";var d9h=".dteIn";var J5t="onBackgrou";var F5t="onReturn";var h9h="submitOnRetu";var D5t="blurOnBackgroun";var j9h="OnComplete";var a9h="unction";var u5t='blur';var l5t="editCount";var f9h="nct";var U9h="submitOnBlur";var P5t="onBlur";var M9h="titl";var R7l=t9h;R7l+=l5H;var b7l=D3H;b7l+=L3H;b7l+=L3H;b7l+=L9h;var J7l=N3H;J7l+=a9h;var D7l=Q1H;D7l+=s3H;D7l+=v1H;var i7l=T9h;i7l+=f9h;i7l+=Q4r;var P7l=M9h;P7l+=m9c;var j4l=Y9h;j4l+=L3H;j4l+=a3H;j4l+=I3H;var x4l=h9h;x4l+=x9h;var f4l=d9h;f4l+=C9H;f4l+=G3r;var that=this;var inlineCount=__inlineCounter++;var namespace=f4l + inlineCount;if(opts[o9h] !== undefined){var M4l=l0H;M4l+=j9h;opts[C9h]=opts[M4l]?i6r:i9H;}if(opts[U9h] !== undefined){var h4l=X4H;h4l+=s9c;h4l+=L3H;h4l+=q5H;var Y4l=R2r;Y4l+=H9h;opts[P5t]=opts[U9h]?Y4l:h4l;}if(opts[x4l] !== undefined){var o4l=R2r;o4l+=H9h;var d4l=R2r;d4l+=i5t;opts[F5t]=opts[d4l]?o4l:i9H;}if(opts[j4l] !== undefined){var H4l=H9H;H4l+=m9c;var U4l=D5t;U4l+=r9c;var C4l=J5t;C4l+=I3H;opts[C4l]=opts[U4l]?u5t:H4l;}this[c9c][n8h]=opts;this[c9c][l5t]=inlineCount;if(typeof opts[d0h] === r5r || typeof opts[P7l] === i7l){var F7l=k2H;F7l+=M9c;F7l+=D4H;this[d0h](opts[d0h]);opts[F7l]=C7H;}if(typeof opts[B8r] === r5r || typeof opts[D7l] === J7l){var l7l=P5H;l7l+=c9c;l7l+=u1H;var u7l=P5H;u7l+=s6h;this[u7l](opts[B8r]);opts[l7l]=C7H;}if(typeof opts[q8r] !== b7l){var k7l=D3H;k7l+=a3H;k7l+=L2r;var O7l=b5t;O7l+=g8h;this[q8r](opts[O7l]);opts[k7l]=C7H;}$(document)[G8H](O5t + namespace,function(e){var z5t="nSu";var A5t="can";var K5t="Retur";var k5t="eyCod";var A7l=i1H;A7l+=k5t;A7l+=m9c;if(e[A7l] === h8c && that[c9c][h5h]){var el=$(document[c9h]);if(el){var z7l=A5t;z7l+=K5t;z7l+=z5t;z7l+=H9h;var K7l=z3r;K7l+=a5h;K7l+=H9c;K7l+=G8H;var field=that[R5t](el);if(field && typeof field[X5t] === K7l && field[z7l](el)){e[q9r]();}}}});$(document)[G8H](R7l + namespace,function(e){var E5t="onRe";var y5t="onEs";var N5t="ubm";var B5t="keyCod";var S5t="efault";var J9c=37;var Q5t="eventD";D59.S59();var u9c=39;var G5t="onEsc";var Z5t="prev";var w5t="ubmit";var n5t="Es";var W5t='.DTE_Form_Buttons';var v5t="nEs";var G7l=D4H;G7l+=A5H;G7l+=d8H;var q7l=B5t;q7l+=m9c;var el=$(document[c9h]);if(e[w9r] === h8c && that[c9c][h5h]){var field=that[R5t](el);if(field && typeof field[X5t] === D59.G9c && field[X5t](el)){var w7l=E5t;w7l+=M9c;w7l+=B0H;w7l+=A5H;var X7l=c9c;X7l+=w5t;if(opts[F5t] === X7l){var E7l=c9c;E7l+=a3H;E7l+=q5t;E7l+=M9c;var B7l=V6H;B7l+=Q5t;B7l+=S5t;e[B7l]();that[E7l]();}else if(typeof opts[w7l] === D59.G9c){e[q9r]();opts[F5t](that,e);}}}else if(e[q7l] === H8c){var y7l=c9c;y7l+=N5t;y7l+=L5H;var n7l=L3H;n7l+=A5H;n7l+=n5t;n7l+=X4H;var N7l=y5t;N7l+=X4H;var S7l=D3H;S7l+=s9c;S7l+=B0H;var Q7l=L3H;Q7l+=v5t;Q7l+=X4H;e[q9r]();if(typeof opts[Q7l] === D59.G9c){opts[G5t](that,e);}else if(opts[G5t] === S7l){that[G8r]();}else if(opts[N7l] === i6r){that[l0H]();}else if(opts[n7l] === y7l){var v7l=c9c;v7l+=S5H;v7l+=x0H;v7l+=M9c;that[v7l]();}}else if(el[H8H](W5t)[G7l]){if(e[w9r] === J9c){var Z7l=N3H;Z7l+=L3H;Z7l+=g0h;Z7l+=c9c;var W7l=b5t;W7l+=U6H;W7l+=A5H;el[Z5t](W7l)[Z7l]();}else if(e[w9r] === u9c){var V7l=G3r;V7l+=f2h;el[V7l](s0h)[Y6H]();}}});this[c9c][V8h]=function(){D59.f59();$(document)[Q6h](O5t + namespace);$(document)[Q6h](X9r + namespace);};return namespace;};Editor[e7l][r7l]=function(direction,action,data){var e5t='send';var V5t="egacyA";var g7l=s9c;g7l+=V5t;g7l+=H4h;if(!this[c9c][g7l] || !data){return;}if(direction === e5t){var I7l=a9c;I7l+=L5H;if(action === F8H || action === I7l){var s7l=m9c;s7l+=H7H;s7l+=C3H;var id;$[s7l](data[D2H],function(rowId,values){var r5t='Editor: Multi-row editing is not supported by the legacy Ajax data format';if(id !== undefined){throw r5t;}id=rowId;});data[D2H]=data[D2H][id];if(action === S6h){data[E2H]=id;}}else {var p7l=r9c;p7l+=x4h;var c7l=g5t;c7l+=S8H;var m7l=H9c;m7l+=r9c;data[m7l]=$[H5h](data[c7l],function(values,id){return id;});delete data[p7l];}}else {var L7l=r9c;L7l+=s3H;L7l+=M9c;L7l+=s3H;if(!data[D2H] && data[g0H]){var t7l=r9c;t7l+=s3H;t7l+=M9c;t7l+=s3H;data[t7l]=[data[g0H]];}else if(!data[L7l]){data[D2H]=[];}}};Editor[I8H][E2h]=function(json){var I5t="options";var that=this;if(json[I5t]){$[m7H](this[c9c][l2r],function(name,field){var s5t="update";var a7l=S2H;a7l+=b9r;a7l+=Q4H;if(json[a7l][name] !== undefined){var fieldInst=that[o1r](name);if(fieldInst && fieldInst[s5t]){var T7l=S2H;T7l+=U9r;fieldInst[s5t](json[T7l][name]);}}});}};Editor[I8H][f7l]=function(el,msg){var c5t="fadeIn";var canAnimate=$[Z7H][w3r]?C7H:j7H;D59.f59();if(typeof msg === D59.G9c){var M7l=I5H;M7l+=F2H;msg=msg(this,new DataTable[M7l](this[c9c][m1r]));}el=$(el);if(canAnimate){el[z8h]();}if(!msg){if(this[c9c][h5h] && canAnimate){el[r1r](function(){var Y7l=C3H;Y7l+=M9c;Y7l+=K3H;Y7l+=s9c;el[Y7l](B7H);});}else {var h7l=C0r;h7l+=K3H;h7l+=s9c;el[h7l](B7H)[b8H](P9H,i9H);}}else {var x7l=q2h;x7l+=O4H;x7l+=a9c;if(this[c9c][x7l] && canAnimate){var d7l=C3H;d7l+=M9c;d7l+=m5t;el[d7l](msg)[c5t]();}else {var C7l=X0H;C7l+=L3H;C7l+=t4H;var j7l=r9c;j7l+=H9c;j7l+=b4H;j7l+=p4r;var o7l=C3H;o7l+=M9c;o7l+=K3H;o7l+=s9c;el[o7l](msg)[b8H](j7l,C7l);}}};Editor[U7l][H7l]=function(){var L5t="multiEditable";var a5t="isMultiValue";var t5t="udeFi";var T5t="multiInfoShown";var p5t="incl";var P1l=p5t;P1l+=t5t;P1l+=m9c;P1l+=J4H;var fields=this[c9c][l2r];var include=this[c9c][P1l];D59.f59();var show=C7H;var state;if(!include){return;}for(var i=I8c,ien=include[o7H];i < ien;i++){var field=fields[include[i]];var multiEditable=field[L5t]();if(field[a5t]() && multiEditable && show){state=C7H;show=j7H;}else if(field[a5t]() && !multiEditable){state=C7H;}else {state=j7H;}fields[include[i]][T5t](state);}};Editor[i1l][O0h]=function(type,immediate){var o5t='submit.editor-internal';var x5t="Controlle";var d5t="captureFocus";var Y5t="ubmit.editor-internal";var f5t="tiIn";var C5t="focus.editor-foc";var Q1l=L3H;Q1l+=z4H;var q1l=i3H;q1l+=Q0h;q1l+=G6r;q1l+=M9c;var w1l=p6H;w1l+=b5r;w1l+=f5t;w1l+=k3H;D59.S59();var b1l=M5t;b1l+=X0H;b1l+=m9c;var l1l=L0r;l1l+=W5H;var J1l=c9c;J1l+=Y5t;var D1l=L3H;D1l+=N3H;D1l+=N3H;var F1l=k9H;F1l+=h5t;F1l+=x5t;F1l+=d5H;var that=this;var focusCapture=this[c9c][F1l][d5t];if(focusCapture === undefined){focusCapture=C7H;}$(this[k8H][W3H])[D1l](J1l)[G8H](o5t,function(e){var j5t="ventDe";var u1l=w5h;u1l+=j5t;u1l+=t8H;u1l+=r1H;D59.f59();e[u1l]();});if(focusCapture && (type === l1l || type === b1l)){var k1l=C5t;k1l+=t9H;var O1l=L3H;O1l+=A5H;$(c0r)[O1l](k1l,function(){var D3t="setF";var J3t="ocus";var F3t='.DTE';var P3t="paren";var U5t=".DTE";var i3t="activeEl";var H5t="iveEleme";var X1l=U5t;X1l+=C9c;var R1l=m6h;R1l+=H5t;R1l+=G7r;var z1l=s9c;z1l+=m9c;z1l+=Z3r;var K1l=P3t;K1l+=M9c;K1l+=c9c;var A1l=i3t;A1l+=o8r;A1l+=m9c;A1l+=G7r;D59.S59();if($(document[A1l])[K1l](F3t)[z1l] === I8c && $(document[R1l])[H8H](X1l)[o7H] === I8c){var B1l=D3t;B1l+=J3t;if(that[c9c][B1l]){var E1l=N3H;E1l+=J3t;that[c9c][p9h][E1l]();}}});}this[w1l]();this[q1l](Q1l,[type,this[c9c][p1r]]);if(immediate){var N1l=S2H;N1l+=m9c;N1l+=G3r;N1l+=r9c;var S1l=i3H;S1l+=C6H;S1l+=A5H;S1l+=M9c;this[S1l](N1l,[type,this[c9c][p1r]]);}return C7H;};Editor[I8H][D8r]=function(type){var b3t="ubble";var O3t='cancelOpen';var V1l=q2h;V1l+=u3t;var y1l=m6h;y1l+=j4h;y1l+=A5H;var n1l=G8h;n1l+=G7r;if(this[n1l](l3t,[type,this[c9c][y1l]]) === j7H){var Z1l=D3H;Z1l+=b3t;var W1l=K3H;W1l+=L3H;W1l+=i4H;var G1l=H9c;G1l+=A5H;G1l+=C9H;G1l+=G3r;var v1l=i3H;v1l+=C6H;v1l+=A5H;v1l+=M9c;this[N6h]();this[v1l](O3t,[type,this[c9c][p1r]]);if((this[c9c][r4H] === G1l || this[c9c][W1l] === Z1l) && this[c9c][V8h]){this[c9c][V8h]();}this[c9c][V8h]=D8H;return j7H;}D59.f59();this[c9c][V1l]=type;return C7H;};Editor[I8H][k3t]=function(processing){var R3t='processing';var K3t="cessin";var A3t="acti";var z3t='div.DTE';var I1l=E6H;I1l+=K4r;I1l+=d5h;I1l+=l1H;var g1l=A3t;g1l+=f0H;g1l+=m9c;var r1l=V6H;r1l+=L3H;r1l+=K3t;r1l+=v4H;var e1l=Q3H;e1l+=S3H;e1l+=c9c;e1l+=R9H;var procClass=this[e1l][r1l][g1l];$([z3t,this[k8H][I1l]])[M3r](procClass,processing);this[c9c][P8H]=processing;this[b0h](R3t,[processing]);};Editor[I8H][s1l]=function(successCallback,errorCallback,formatdata,hide){var N3t="oA";var p3t="mitComp";var E3t="emo";var n3t="editData";var q3t="unt";var v3t="bTable";var y3t="dbTable";var m3t='allIfChanged';var B3t="tTable";var S3t="ctDataFn";var t3t="onC";var T3t='preSubmit';var X3t="_sub";var L3t="omp";var Q3t="_fnSetObje";var w3t="ditC";var a3t="_legacyAjax";var l2l=X3t;l2l+=K3H;l2l+=H9c;l2l+=B3t;var u2l=s2r;u2l+=K0h;u2l+=s3H;u2l+=P2H;var J2l=G8h;J2l+=G7r;var D2l=c9c;D2l+=G6r;D2l+=r9c;var i2l=d5H;i2l+=E3t;i2l+=F3r;var T1l=s3H;T1l+=a5h;T1l+=j4h;T1l+=A5H;var a1l=R2r;a1l+=H9h;var L1l=m9c;L1l+=w3t;L1l+=L3H;L1l+=q3t;var t1l=I9c;t1l+=V5H;t1l+=c9c;var p1l=g5t;p1l+=x1r;p1l+=d1r;var c1l=Q3t;c1l+=S3t;var m1l=N3t;m1l+=l5H;m1l+=H9c;var that=this;var i,iLen,eventRet,errorNodes;var changed=j7H,allData={},changedData={};var setBuilder=DataTable[k5H][m1l][c1l];var dataSource=this[c9c][p1l];var fields=this[c9c][t1l];var editCount=this[c9c][L1l];var modifier=this[c9c][L1r];var editFields=this[c9c][f9r];var editData=this[c9c][n3t];var opts=this[c9c][n8h];var changedSubmit=opts[a1l];var submitParamsLocal;var action=this[c9c][T1l];var submitParams={"data":{}};submitParams[this[c9c][T1h]]=action;if(this[c9c][y3t]){var M1l=r9c;M1l+=v3t;var f1l=M9c;f1l+=s3H;f1l+=D3H;f1l+=D4H;submitParams[f1l]=this[c9c][M1l];}D59.S59();if(action === a9r || action === O3h){$[m7H](editFields,function(idSrc,edit){var G3t="isEmptyOb";var s3t="isEmptyObject";var o1l=G3t;o1l+=d7H;var allRowData={};var changedRowData={};$[m7H](fields,function(name,field){var r3t='[]';var e3t="mult";var W3t="ttable";var I3t='-many-count';var g3t=/\[.*$/;var Z3t="comp";D59.S59();var Y1l=c9c;Y1l+=a3H;Y1l+=q5t;Y1l+=W3t;if(edit[l2r][name] && field[Y1l]()){var d1l=Z3t;d1l+=C5r;var x1l=H9c;x1l+=c9c;x1l+=V3t;var h1l=e3t;h1l+=T6h;var multiGet=field[h1l]();var builder=setBuilder(name);if(multiGet[idSrc] === undefined){var originalVal=field[N2H](edit[D2H]);builder(allRowData,originalVal);return;}var value=multiGet[idSrc];var manyBuilder=$[x1l](value) && name[C2h](r3t) !== -s8c?setBuilder(name[g5r](g3t,B7H) + I3t):D8H;builder(allRowData,value);if(manyBuilder){manyBuilder(allRowData,value[o7H]);}if(action === S6h && (!editData[name] || !field[d1l](value,editData[name][idSrc]))){builder(changedRowData,value);changed=C7H;if(manyBuilder){manyBuilder(changedRowData,value[o7H]);}}}});if(!$[s3t](allRowData)){allData[idSrc]=allRowData;}if(!$[o1l](changedRowData)){changedData[idSrc]=changedRowData;}});if(action === F8H || changedSubmit === F6r || changedSubmit === m3t && changed){submitParams[D2H]=allData;}else if(changedSubmit === c3t && changed){submitParams[D2H]=changedData;}else {var P2l=h0H;P2l+=p3t;P2l+=K6H;P2l+=m9c;var H1l=l3h;H1l+=f0H;H1l+=A4H;var C1l=t3t;C1l+=L3t;C1l+=o7h;this[c9c][p1r]=D8H;if(opts[C9h] === i6r && (hide === undefined || hide)){var j1l=A0H;j1l+=a4r;j1l+=m9c;this[j1l](j7H);}else if(typeof opts[C1l] === D59.G9c){opts[C9h](this);}if(successCallback){var U1l=X4H;U1l+=s3H;U1l+=s9c;U1l+=s9c;successCallback[U1l](this);}this[k3t](j7H);this[H1l](P2l);return;}}else if(action === i2l){$[m7H](editFields,function(idSrc,edit){var F2l=r9c;D59.f59();F2l+=s3H;F2l+=M9c;F2l+=s3H;submitParams[F2l][idSrc]=edit[D2H];});}this[a3t](D2l,action,submitParams);submitParamsLocal=$[K2H](C7H,{},submitParams);if(formatdata){formatdata(submitParams);}if(this[J2l](T3t,[submitParams,action]) === j7H){this[k3t](j7H);return;}var submitWire=this[c9c][y0H] || this[c9c][f1h]?this[u2l]:this[l2l];submitWire[E9r](this,submitParams,function(json,notGood,xhr){D59.S59();that[f3t](json,notGood,submitParams,submitParamsLocal,that[c9c][p1r],editCount,hide,successCallback,errorCallback,xhr);},function(xhr,err,thrown){var M3t="_submitError";D59.f59();that[M3t](xhr,err,thrown,errorCallback,submitParams,that[c9c][p1r]);},submitParams);};Editor[I8H][Y3t]=function(data,success,error,submitParams){var d3t="taFn";var H3t="ndividual";var P6t='fields';var x3t="_fnSetObjectDa";var U3t="ifier";var h3t="dSr";var C3t="mod";var z2l=H9c;z2l+=h3t;z2l+=X4H;var K2l=x3t;K2l+=d3t;var A2l=L3H;A2l+=I5H;A2l+=F2H;var k2l=m9c;k2l+=P2H;k2l+=M9c;var O2l=m9c;O2l+=P2H;O2l+=M9c;var b2l=s3H;b2l+=X4H;b2l+=k2H;b2l+=G8H;var that=this;var action=data[b2l];var out={data:[]};var idGet=DataTable[O2l][o3t][j3t](this[c9c][M1h]);var idSet=DataTable[k2l][A2l][K2l](this[c9c][z2l]);if(action !== D4h){var E2l=r9c;E2l+=s3H;E2l+=M9c;E2l+=s3H;var B2l=m9c;B2l+=s3H;B2l+=X4H;B2l+=C3H;var X2l=C3t;X2l+=U3t;var R2l=H9c;R2l+=H3t;var originalData=this[c9c][r4H] === k3h?this[Y3h](P6t,this[L1r]()):this[Y3h](R2l,this[X2l]());$[B2l](data[E2l],function(key,vals){var i6t="_fnExt";var F6t="dataTableExt";var Q2l=l5H;Q2l+=a3H;Q2l+=c9c;Q2l+=C3H;var q2l=r9c;q2l+=s3H;q2l+=S8H;var w2l=i6t;w2l+=m9c;w2l+=I3H;var toSave;var extender=$[Z7H][F6t][o3t][w2l];if(action === S6h){var rowData=originalData[key][D2H];toSave=extender({},rowData,C7H);toSave=extender(toSave,vals,C7H);}else {toSave=extender({},vals,C7H);}var overrideId=idGet(toSave);if(action === F8H && overrideId === undefined){idSet(toSave,+new Date() + B7H + key);}else {idSet(toSave,overrideId);}out[q2l][Q2l](toSave);});}success(out);};Editor[S2l][f3t]=function(json,notGood,submitParams,submitParamsLocal,action,editCount,hide,successCallback,errorCallback,xhr){var k6t="yAjax";var t6t="tCr";var T6t="_da";var p6t='setData';var x6t="ostRe";var j6t='preRemove';var m6t="_dataSou";var a6t="eCreat";var h6t='commit';var u6t="fieldErro";var d6t="taSource";var K6t="eldErr";var b6t="Submit";var f6t="Sou";var Y6t='postEdit';var I6t="ount";var D6t="tComplete";var e6t='<br>';var g6t="tC";var r6t="mitSuccess";var R6t="uccessful";var z6t="submitU";var J6t="Erro";var O6t="_legac";var A6t='receive';var B6t="ieldErr";var X6t="erro";var o6t='prep';var M6t='preEdit';var C6t="nc";var l6t="post";var G8l=h0H;G8l+=x0H;G8l+=D6t;var r2l=D4H;r2l+=A5H;r2l+=x7H;r2l+=C3H;var e2l=o1r;e2l+=J6t;e2l+=g7h;var Z2l=u6t;Z2l+=g7h;var W2l=l1H;W2l+=d5H;W2l+=L3H;W2l+=d5H;var G2l=l6t;G2l+=b6t;var v2l=i3H;v2l+=l5h;v2l+=M9c;var y2l=O6t;y2l+=k6t;var n2l=Z0h;n2l+=k3r;var N2l=p9c;N2l+=J4H;var that=this;var setData;var fields=this[c9c][N2l];var opts=this[c9c][n2l];var modifier=this[c9c][L1r];this[y2l](A6t,action,json);this[v2l](G2l,[json,submitParams,action,xhr]);if(!json[W2l]){json[q9H]=D59.v9c;}if(!json[Z2l]){var V2l=I9c;V2l+=K6t;V2l+=N3h;V2l+=c9c;json[V2l]=[];}if(notGood || json[q9H] || json[e2l][r2l]){var U2l=z6t;U2l+=Q4H;U2l+=R6t;var C2l=Q8h;C2l+=A4H;var j2l=X6t;j2l+=d5H;var s2l=N3H;s2l+=B6t;s2l+=L3H;s2l+=g7h;var g2l=l1H;g2l+=d5H;g2l+=L3H;g2l+=d5H;var globalError=[];if(json[g2l]){var I2l=l5H;I2l+=a3H;I2l+=c9c;I2l+=C3H;globalError[I2l](json[q9H]);}$[m7H](json[s2l],function(i,err){var G6t="mate";var V6t="Error";var N6t="Err";var Q6t="Er";var S6t="onField";var w6t="own ";var E6t="Unkn";var y6t="posi";var v6t="yContent";var Z6t="tus";var W6t="onFieldError";var q6t="ield: ";var p2l=V0H;p2l+=c9c;p2l+=V5r;p2l+=u3t;var field=fields[err[a4h]];if(!field){var c2l=A5H;c2l+=s3H;c2l+=P5H;var m2l=E6t;m2l+=w6t;m2l+=N3H;m2l+=q6t;throw new Error(m2l + err[c2l]);}else if(field[p2l]()){var t2l=Q6t;t2l+=Q9H;field[q9H](err[p7h] || t2l);if(i === I8c){var L2l=S6t;L2l+=N6t;L2l+=L3H;L2l+=d5H;if(opts[L2l] === L9H){var x2l=n6t;x2l+=a3H;x2l+=c9c;var h2l=M9c;h2l+=L3H;h2l+=l5H;var Y2l=y6t;Y2l+=V3H;var M2l=A5H;M2l+=L3H;M2l+=r9c;M2l+=m9c;var f2l=E6H;f2l+=d5H;f2l+=V8H;f2l+=l1H;var T2l=D3H;T2l+=L3H;T2l+=r9c;T2l+=v6t;var a2l=S0H;a2l+=G6t;that[a2l]($(that[k8H][T2l],that[c9c][f2l]),{scrollTop:$(field[M2l]())[Y2l]()[h2l]},R9c);field[x2l]();}else if(typeof opts[W6t] === D59.G9c){opts[W6t](that,err);}}}else {var o2l=d9H;o2l+=s3H;o2l+=Z6t;var d2l=g9h;d2l+=A7H;globalError[c7H](field[a4h]() + d2l + (err[o2l] || V6t));}});this[j2l](globalError[G2h](e6t));this[C2l](U2l,[json]);if(errorCallback){var H2l=X4H;H2l+=A5r;H2l+=s9c;errorCallback[H2l](that,json);}}else {var v8l=h0H;v8l+=r6t;var N8l=I2h;N8l+=g6t;N8l+=I6t;var X8l=s6t;X8l+=m9c;var P8l=X4H;P8l+=B4H;var store={};if(json[D2H] && (action === P8l || action === O3h)){var R8l=m6t;R8l+=j3H;R8l+=m9c;var F8l=x8H;F8l+=x7H;F8l+=C3H;var i8l=l5H;i8l+=a0H;i8l+=l5H;this[Y3h](i8l,action,modifier,submitParamsLocal,json,store);for(var i=I8c;i < json[D2H][F8l];i++){var O8l=m9c;O8l+=V0H;O8l+=M9c;var D8l=r9c;D8l+=x4h;setData=json[D8l][i];var id=this[Y3h](c6t,setData);this[b0h](p6t,[json,setData,action]);if(action === a9r){var b8l=v5h;b8l+=t6t;b8l+=L6t;b8l+=m9c;var l8l=Q8h;l8l+=m9c;l8l+=A5H;l8l+=M9c;var u8l=l5H;u8l+=d5H;u8l+=a6t;u8l+=m9c;var J8l=i3H;J8l+=c9r;this[J8l](u8l,[json,setData,id]);this[Y3h](F8H,fields,setData,store);this[l8l]([F8H,b8l],[json,setData,id]);}else if(action === O8l){var z8l=I2h;z8l+=M9c;var K8l=i3H;K8l+=c9r;var A8l=m9c;A8l+=r9c;A8l+=H9c;A8l+=M9c;var k8l=T6t;k8l+=S8H;k8l+=f6t;k8l+=d1r;this[b0h](M6t,[json,setData,id]);this[k8l](A8l,modifier,fields,setData,store);this[K8l]([z8l,Y6t],[json,setData,id]);}}this[R8l](h6t,action,modifier,json[D2H],store);}else if(action === X8l){var S8l=J8h;S8l+=X2r;var Q8l=l5H;Q8l+=x6t;Q8l+=K3H;Q8l+=S4r;var q8l=d5H;q8l+=o8r;q8l+=L3H;q8l+=F3r;var w8l=Q8h;w8l+=A4H;var E8l=i0H;E8l+=s3H;E8l+=d6t;var B8l=l3h;B8l+=f0H;B8l+=G6r;B8l+=M9c;this[Y3h](o6t,action,modifier,submitParamsLocal,json,store);this[B8l](j6t,[json,this[Z3h]()]);this[E8l](D4h,modifier,fields,store);this[w8l]([q8l,Q8l],[json,this[Z3h]()]);this[Y3h](S8l,action,modifier,json[D2H],store);}if(editCount === this[c9c][N8l]){var y8l=T9h;y8l+=C6t;y8l+=b9r;y8l+=A5H;var n8l=s3H;n8l+=a5h;n8l+=Q4r;var action=this[c9c][p1r];this[c9c][n8l]=D8H;if(opts[C9h] === i6r && (hide === undefined || hide)){this[y8h](json[D2H]?C7H:j7H,action);}else if(typeof opts[C9h] === y8l){opts[C9h](this);}}if(successCallback){successCallback[E9r](that,json);}this[b0h](v8l,[json,setData,action]);}this[k3t](j7H);this[b0h](G8l,[json,setData,action]);};Editor[W8l][Z8l]=function(xhr,err,thrown,errorCallback,submitParams,action){var U6t="Com";var H6t='postSubmit';var P0t="system";var i0t='submitError';D59.f59();var e8l=I6H;e8l+=U6t;e8l+=l5H;e8l+=o7h;var V8l=l3h;V8l+=I7h;this[b0h](H6t,[D8H,submitParams,action,xhr]);this[q9H](this[T3r][q9H][P0t]);this[k3t](j7H);if(errorCallback){errorCallback[E9r](this,xhr,err,thrown);}this[V8l]([i0t,e8l],[xhr,err,thrown,submitParams]);};Editor[r8l][g8l]=function(fn){var J0t="oFe";var u0t="atures";var F0t="aTabl";var D0t="Api";var b0t="mitComple";var a8l=M5t;a8l+=D3H;a8l+=D4H;var L8l=V0H;L8l+=W4H;var t8l=k9H;t8l+=h5t;var s8l=S8H;s8l+=D3H;s8l+=s9c;s8l+=m9c;var I8l=l9h;I8l+=F0t;I8l+=m9c;var that=this;var dt=this[c9c][m1r]?new $[Z7H][I8l][D0t](this[c9c][s8l]):D8H;var ssp=j7H;if(dt){var m8l=J0t;m8l+=u0t;ssp=dt[B2H]()[I8c][m8l][l0t];}if(this[c9c][P8H]){var p8l=h0H;p8l+=b0t;p8l+=J5H;var c8l=L3H;c8l+=A5H;c8l+=m9c;this[c8l](p8l,function(){var O0t='draw';D59.f59();if(ssp){dt[d6h](O0t,fn);}else {setTimeout(function(){D59.S59();fn();},f8c);}});return C7H;}else if(this[t8l]() === U3h || this[L8l]() === a8l){var M8l=D3H;M8l+=N8h;this[d6h](i6r,function(){var k0t='submitComplete';if(!that[c9c][P8H]){setTimeout(function(){D59.f59();if(that[c9c]){fn();}},f8c);}else {that[d6h](k0t,function(e,json){D59.S59();if(ssp && json){var f8l=r9c;f8l+=K4r;f8l+=E6H;var T8l=L3H;T8l+=G3r;dt[T8l](f8l,fn);}else {setTimeout(function(){D59.S59();if(that[c9c]){fn();}},f8c);}});}})[M8l]();return C7H;}return j7H;};Editor[I8H][A0t]=function(name,arr){for(var i=I8c,ien=arr[o7H];i < ien;i++){if(name == arr[i]){return i;}}return -s8c;};Editor[Y8l]={"table":D8H,"ajaxUrl":D8H,"fields":[],"display":h8l,"ajax":D8H,"idSrc":x8l,"events":{},"i18n":{"create":{"button":d8l,"title":K0t,"submit":o8l},"edit":{"button":j8l,"title":z0t,"submit":C8l},"remove":{"button":R0t,"title":U8l,"submit":H8l,"confirm":{"_":P9l,"1":i9l}},"error":{"system":F9l},multi:{title:D9l,info:X0t,restore:B0t,noMulti:E0t},datetime:{previous:w0t,next:q0t,months:[Q0t,S0t,J9l,u9l,N0t,n0t,y0t,v0t,G0t,l9l,b9l,O9l],weekdays:[k9l,A9l,W0t,Z0t,K9l,V0t,z9l],amPm:[R9l,X9l],hours:e0t,minutes:r0t,seconds:B9l,unknown:E0h}},formOptions:{bubble:$[K2H]({},Editor[A8H][H3r],{title:j7H,message:j7H,buttons:g0t,submit:c3t}),inline:$[K2H]({},Editor[E9l][w9l],{buttons:j7H,submit:q9l}),main:$[K2H]({},Editor[A8H][Q9l])},legacyAjax:j7H,actionName:I0t};(function(){var m0t="dataSourc";var p4t="cancelled";var L0t="drawType";var K7t="dataSrc";var O7t='[data-editor-value]';var q4t="attach";var s0t="dataTab";var c4t="rowIds";var n36=C3H;n36+=M9c;n36+=m5t;var D56=s0t;D56+=D4H;var S9l=m0t;S9l+=R9H;var __dataSources=Editor[S9l]={};var __dtIsSsp=function(dt,editor){var t0t="gs";var c0t="Feature";var p0t="ettin";var n9l=L3H;n9l+=c0t;n9l+=c9c;var N9l=c9c;N9l+=p0t;N9l+=t0t;return dt[N9l]()[I8c][n9l][l0t] && editor[c9c][n8h][L0t] !== i9H;};var __dtApi=function(table){var a0t="taTable";var y9l=D5H;y9l+=a0t;D59.f59();return $(table)[y9l]();};var __dtHighlight=function(node){node=$(node);D59.f59();setTimeout(function(){var T0t="high";var f0t="light";var v9l=T0t;v9l+=f0t;node[M8H](v9l);setTimeout(function(){var Y0t="noH";var h0t="ighlight";var M0t="ghlight";var W9l=f2r;W9l+=M0t;var G9l=Y0t;D59.f59();G9l+=h0t;node[M8H](G9l)[N9H](W9l);setTimeout(function(){var d0t='noHighlight';var x0t="eClas";var Z9l=s6t;D59.f59();Z9l+=x0t;Z9l+=c9c;node[Z9l](d0t);},X9c);},R9c);},o8c);};var __dtRowSelector=function(out,dt,identifier,fields,idFn){var r9l=B5h;r9l+=v3H;var e9l=W5H;e9l+=i4H;e9l+=o0t;e9l+=c9c;var V9l=d5H;V9l+=j0t;dt[V9l](identifier)[e9l]()[r9l](function(idx){var C0t="nable to find row identifier";var U0t='row';var x8c=14;D59.f59();var s9l=A5H;s9l+=d6H;var g9l=r9c;g9l+=s3H;g9l+=M9c;g9l+=s3H;var row=dt[g0H](idx);var data=row[g9l]();var idSrc=idFn(data);if(idSrc === undefined){var I9l=q5h;I9l+=C0t;Editor[q9H](I9l,x8c);}out[idSrc]={idSrc:idSrc,data:data,node:row[s9l](),fields:fields,type:U0t};});};var __dtFieldsFromIdx=function(dt,fields,idx){var l4t="atically determine field from source. Ple";var P4t="tyObje";var H0t="isEm";var i4t="mDa";var F4t="Fie";var D4t="aoColumns";var u4t="Unable to autom";var b4t="se specify the field name.";var L9l=H0t;L9l+=l5H;L9l+=P4t;L9l+=a5h;var p9l=i4t;p9l+=M9c;p9l+=s3H;var c9l=a9c;c9l+=L5H;c9l+=I4H;c9l+=r9c;var m9l=m9c;m9l+=i9h;m9l+=F4t;m9l+=m4H;var field;var col=dt[B2H]()[I8c][D4t][idx];var dataSrc=col[m9l] !== undefined?col[c9l]:col[p9l];var resolvedFields={};var run=function(field,dataSrc){D59.f59();if(field[a4h]() === dataSrc){resolvedFields[field[a4h]()]=field;}};$[m7H](fields,function(name,fieldInst){var J4t="sA";var t9l=H9c;t9l+=J4t;t9l+=d5H;t9l+=W9r;if($[t9l](dataSrc)){for(var i=I8c;i < dataSrc[o7H];i++){run(fieldInst,dataSrc[i]);}}else {run(fieldInst,dataSrc);}});if($[L9l](resolvedFields)){var T9l=u4t;T9l+=l4t;T9l+=s3H;T9l+=b4t;var a9l=l1H;a9l+=d5H;a9l+=L3H;a9l+=d5H;Editor[a9l](T9l,M8c);}return resolvedFields;};var __dtCellSelector=function(out,dt,identifier,allFields,idFn,forceFields){var k4t="lls";var Y9l=m9c;Y9l+=s1r;var M9l=H9c;M9l+=A5H;M9l+=O4t;M9l+=R9H;var f9l=X4H;f9l+=m9c;f9l+=k4t;dt[f9l](identifier)[M9l]()[Y9l](function(idx){var K4t="fixedNod";var E4t="displa";var R4t="jec";var w4t="yFiel";var X4t="olum";var z4t="tach";var A4t="xedNode";var P56=N3H;P56+=H9c;P56+=A4t;var H9l=K4t;D59.S59();H9l+=m9c;var U9l=v4H;U9l+=m9c;U9l+=M9c;var C9l=n2H;C9l+=z4t;var j9l=n2H;j9l+=M9c;j9l+=H7H;j9l+=C3H;var d9l=L3H;d9l+=D3H;d9l+=R4t;d9l+=M9c;var x9l=X4H;x9l+=X4t;x9l+=A5H;var h9l=X4H;h9l+=m9c;h9l+=s9c;h9l+=s9c;var cell=dt[h9l](idx);var row=dt[g0H](idx[g0H]);var data=row[D2H]();var idSrc=idFn(data);var fields=forceFields || __dtFieldsFromIdx(dt,allFields,idx[x9l]);var isNode=typeof identifier === d9l && identifier[B4t] || identifier instanceof $;var prevDisplayFields,prevAttach;if(out[idSrc]){var o9l=E4t;o9l+=w4t;o9l+=E5r;prevAttach=out[idSrc][q4t];prevDisplayFields=out[idSrc][o9l];}__dtRowSelector(out,dt,idx[g0H],allFields,idFn);out[idSrc][j9l]=prevAttach || [];out[idSrc][C9l][c7H](isNode?$(identifier)[U9l](I8c):cell[H9l]?cell[P56]():cell[W5h]());out[idSrc][d3h]=prevDisplayFields || ({});$[K2H](out[idSrc][d3h],fields);});};var __dtColumnSelector=function(out,dt,identifier,fields,idFn){var F56=H9c;F56+=A5H;F56+=r9c;F56+=Q4t;var i56=D0H;i56+=s9c;i56+=V4H;dt[i56](D8H,identifier)[F56]()[m7H](function(idx){__dtCellSelector(out,dt,idx,fields,idFn);});};var __dtjqId=function(id){var S4t='\\$1';return typeof id === r5r?e3h + id[g5r](/(:|\.|\[|\]|,)/g,S4t):e3h + id;};__dataSources[D56]={id:function(data){var n4t="etObjectDataF";var N4t="fnG";var u56=i3H;u56+=N4t;u56+=n4t;u56+=A5H;var J56=f9c;J56+=M9c;var idFn=DataTable[J56][o3t][u56](this[c9c][M1h]);return idFn(data);},individual:function(identifier,fieldNames){var y4t="_fnGetObjec";var v4t="tDataFn";var O56=S8H;O56+=X0H;O56+=m9c;var b56=y4t;b56+=v4t;var l56=m9c;l56+=P2H;l56+=M9c;var idFn=DataTable[l56][o3t][b56](this[c9c][M1h]);var dt=__dtApi(this[c9c][O56]);var fields=this[c9c][l2r];var out={};var forceFields;var responsiveNode;if(fieldNames){var A56=m9c;A56+=s3H;A56+=X4H;A56+=C3H;var k56=Z9h;k56+=d5H;k56+=O4H;if(!$[k56](fieldNames)){fieldNames=[fieldNames];}forceFields={};$[A56](fieldNames,function(i,name){D59.f59();forceFields[name]=fields[name];});}__dtCellSelector(out,dt,identifier,fields,idFn,forceFields);return out;},fields:function(identifier){var W4t="umn";var B56=X4H;B56+=r3H;B56+=V4H;var X56=d5H;X56+=L3H;X56+=E6H;X56+=c9c;var R56=I9c;R56+=s9r;var z56=L3H;z56+=I5H;z56+=l5H;z56+=H9c;var K56=m9c;K56+=P2H;K56+=M9c;var idFn=DataTable[K56][z56][j3t](this[c9c][M1h]);var dt=__dtApi(this[c9c][m1r]);var fields=this[c9c][R56];var out={};if($[S5r](identifier) && (identifier[X56] !== undefined || identifier[G4t] !== undefined || identifier[B56] !== undefined)){var E56=d5H;E56+=L3H;E56+=E6H;E56+=c9c;if(identifier[E56] !== undefined){var w56=d5H;w56+=L3H;w56+=V5h;__dtRowSelector(out,dt,identifier[w56],fields,idFn);}if(identifier[G4t] !== undefined){var q56=X4H;q56+=U5H;q56+=W4t;q56+=c9c;__dtColumnSelector(out,dt,identifier[q56],fields,idFn);}if(identifier[Z4t] !== undefined){__dtCellSelector(out,dt,identifier[Z4t],fields,idFn);}}else {__dtRowSelector(out,dt,identifier,fields,idFn);}return out;},create:function(fields,data){var Q56=V4t;Q56+=s9c;Q56+=m9c;var dt=__dtApi(this[c9c][Q56]);if(!__dtIsSsp(dt,this)){var N56=X9H;N56+=r9c;var S56=b5H;S56+=E6H;var row=dt[S56][N56](data);__dtHighlight(row[W5h]());}},edit:function(identifier,fields,data,store){var e4t="tOpt";var m4t="_fnExtend";var s4t="ataTableExt";var I4t="owId";D59.S59();var n56=I2h;n56+=e4t;n56+=c9c;var that=this;var dt=__dtApi(this[c9c][m1r]);if(!__dtIsSsp(dt,this) || this[c9c][n56][L0t] === i9H){var Z56=s3H;Z56+=A5H;Z56+=y6H;var y56=X0h;y56+=s9c;y56+=s9c;var rowId=__dataSources[q7H][E2H][y56](this,data);var row;try{var v56=d5H;v56+=L3H;v56+=E6H;row=dt[v56](__dtjqId(rowId));}catch(e){row=dt;}if(!row[r4t]()){var G56=d5H;G56+=g4t;row=dt[G56](function(rowIdx,rowData,rowNode){var W56=H9c;W56+=r9c;return rowId == __dataSources[q7H][W56][E9r](that,rowData);});}if(row[Z56]()){var I56=d5H;I56+=I4t;I56+=c9c;var g56=g5t;g56+=M9c;g56+=s3H;var r56=L3H;r56+=I5H;r56+=l5H;r56+=H9c;var e56=r9c;e56+=s4t;var V56=N3H;V56+=A5H;var extender=$[V56][e56][r56][m4t];var toSave=extender({},row[g56](),C7H);toSave=extender(toSave,data,C7H);row[D2H](toSave);var idx=$[q5r](rowId,store[I56]);store[c4t][A2r](idx,s8c);}else {var s56=d5H;s56+=L3H;s56+=E6H;row=dt[s56][Q8r](data);}__dtHighlight(row[W5h]());}},remove:function(identifier,fields,store){var t4t="very";var m56=S8H;m56+=D3H;m56+=s9c;m56+=m9c;var that=this;var dt=__dtApi(this[c9c][m56]);var cancelled=store[p4t];if(cancelled[o7H] === I8c){var p56=a0H;p56+=K3H;p56+=S4r;var c56=d5H;c56+=j0t;dt[c56](identifier)[p56]();}else {var Y56=g0H;Y56+=c9c;var t56=m9c;t56+=t4t;var indexes=[];dt[g5h](identifier)[t56](function(){var L4t="Tabl";var T56=r9c;T56+=x4h;D59.f59();var a56=X4H;a56+=s3H;a56+=B0h;var L56=r9c;L56+=x4h;L56+=L4t;L56+=m9c;var id=__dataSources[L56][E2H][a56](that,this[T56]());if($[q5r](id,cancelled) === -s8c){var M56=H9c;M56+=A5H;M56+=r9c;M56+=f9c;var f56=l5H;f56+=a3H;f56+=c9c;f56+=C3H;indexes[f56](this[M56]());}});dt[Y56](indexes)[h8r]();}},prep:function(action,identifier,submit,json,store){var d56=d5H;d56+=K4h;if(action === S6h){var cancelled=json[p4t] || [];store[c4t]=$[H5h](submit[D2H],function(val,key){var T4t="EmptyO";var a4t="nArr";var f4t="bjec";var x56=H9c;x56+=a4t;x56+=O4H;var h56=B3r;D59.S59();h56+=T4t;h56+=f4t;h56+=M9c;return !$[h56](submit[D2H][key]) && $[x56](key,cancelled) === -s8c?key:undefined;});}else if(action === d56){store[p4t]=json[p4t] || [];}},commit:function(action,identifier,data,store){var Y4t="wI";var o4t="oF";var d4t="rSide";var x4t="erve";var C4t="aw";var M4t="itO";var j4t="eatu";var l36=a9c;D59.f59();l36+=M4t;l36+=E2r;var C56=V7h;C56+=c3r;var j56=d5H;j56+=L3H;j56+=E6H;j56+=J9h;var o56=a9c;o56+=H9c;o56+=M9c;var that=this;var dt=__dtApi(this[c9c][m1r]);if(!__dtIsSsp(dt,this) && action === o56 && store[j56][C56]){var F36=V7h;F36+=c3r;var U56=b5H;U56+=Y4t;U56+=r9c;U56+=c9c;var ids=store[U56];var row;var compare=function(id){return function(rowIdx,rowData,rowNode){var h4t="aTable";var i36=X4H;i36+=s3H;i36+=s9c;D59.S59();i36+=s9c;var P36=H9c;P36+=r9c;var H56=g5t;H56+=M9c;H56+=h4t;return id == __dataSources[H56][P36][i36](that,rowData);};};for(var i=I8c,ien=ids[F36];i < ien;i++){var u36=D3H;u36+=m3H;u36+=x4t;u36+=d4t;var J36=o4t;J36+=j4t;J36+=Q1r;var D36=N7r;D36+=y6H;try{row=dt[g0H](__dtjqId(ids[i]));}catch(e){row=dt;}if(!row[r4t]()){row=dt[g0H](compare(ids[i]));}if(row[D36]() && !dt[B2H]()[I8c][J36][u36]){row[h8r]();}}}var drawType=this[c9c][l36][L0t];if(drawType !== i9H){var b36=r9c;b36+=d5H;b36+=C4t;dt[b36](drawType);}}};function __html_id(identifier){var H4t="[data-ed";D59.S59();var U4t='keyless';var D7t="r-id` or `id` of: ";var F7t="uld not find an element with `data-edito";var P7t="itor-id=\"";var context=document;if(identifier !== U4t){var O36=H4t;O36+=P7t;context=$(O36 + identifier + o8h);if(context[o7H] === I8c){var k36=k7h;k36+=v4H;context=typeof identifier === k36?$(__dtjqId(identifier)):$(identifier);}if(context[o7H] === I8c){var A36=i7t;A36+=F7t;A36+=D7t;throw A36 + identifier;}}return context;}function __html_el(identifier,name){var J7t='[data-editor-field="';var context=__html_id(identifier);return $(J7t + name + o8h,context);}function __html_els(identifier,names){var K36=D4H;K36+=A5H;K36+=v4H;K36+=c3r;var out=$();for(var i=I8c,ien=names[K36];i < ien;i++){var z36=s3H;z36+=r9c;z36+=r9c;out=out[z36](__html_el(identifier,names[i]));}return out;}function __html_get(identifier,dataSrc){var l7t="data-editor-v";var u7t="htm";D59.f59();var X36=u7t;X36+=s9c;var R36=l7t;R36+=s3H;R36+=s9c;R36+=Z9H;var el=__html_el(identifier,dataSrc);return el[b7t](O7t)[o7H]?el[k7t](R36):el[X36]();}function __html_set(identifier,fields,data){var B36=m9c;B36+=s3H;B36+=X4H;B36+=C3H;D59.f59();$[B36](fields,function(name,field){var R7t="r-valu";var z7t="data-edito";var A7t="alFromDat";var E36=f0H;E36+=A7t;E36+=s3H;var val=field[E36](data);if(val !== undefined){var w36=V7h;w36+=M9c;w36+=C3H;var el=__html_el(identifier,field[K7t]());if(el[b7t](O7t)[w36]){var q36=z7t;q36+=R7t;q36+=m9c;el[k7t](q36,val);}else {var N36=C3H;N36+=X3r;N36+=s9c;el[m7H](function(){var B7t="firs";var X7t="childNodes";var w7t="removeChild";var E7t="tChild";var Q36=s9c;Q36+=i5h;Q36+=c3r;while(this[X7t][Q36]){var S36=B7t;S36+=E7t;this[w7t](this[S36]);}})[N36](val);}}});}__dataSources[n36]={id:function(data){var v36=L3H;v36+=I5H;v36+=l5H;v36+=H9c;var y36=m9c;y36+=P2H;y36+=M9c;var idFn=DataTable[y36][v36][j3t](this[c9c][M1h]);return idFn(data);},initField:function(cfg){var Q7t="-edi";var S7t="tor-label=\"";var q7t="[d";var Z36=V7h;Z36+=c3r;var W36=r9c;W36+=s3H;W36+=S8H;var G36=q7t;G36+=x4h;G36+=Q7t;G36+=S7t;var label=$(G36 + (cfg[W36] || cfg[a4h]) + o8h);if(!cfg[c2H] && label[Z36]){var V36=s9c;V36+=s3H;V36+=O1H;cfg[V36]=label[F5r]();}},individual:function(identifier,fieldNames){var G7t='addBack';var e7t="yless";var y7t='data-editor-field';var g7t="atically determine field name from data source";var W7t='[data-editor-id]';var r7t="Cannot autom";var v7t="addBack";var n7t="lf";var N7t="dSe";var Z7t='editor-id';var t36=B5h;t36+=X4H;t36+=C3H;var p36=m9c;p36+=s1r;var c36=g8H;c36+=s9c;var m36=N3H;m36+=H9c;m36+=s9r;var attachEl;if(identifier instanceof $ || identifier[B4t]){var g36=r9c;g36+=s3H;g36+=S8H;var r36=s3H;r36+=A5H;r36+=N7t;r36+=n7t;attachEl=identifier;if(!fieldNames){var e36=s3H;e36+=M9c;e36+=M9c;e36+=d5H;fieldNames=[$(identifier)[e36](y7t)];}var back=$[Z7H][v7t]?G7t:r36;identifier=$(identifier)[H8H](W7t)[back]()[g36](Z7t);}D59.f59();if(!identifier){var I36=V7t;I36+=e7t;identifier=I36;}if(fieldNames && !$[M1r](fieldNames)){fieldNames=[fieldNames];}if(!fieldNames || fieldNames[o7H] === I8c){var s36=r7t;s36+=g7t;throw s36;}var out=__dataSources[F5r][m36][c36](this,identifier);var fields=this[c9c][l2r];var forceFields={};$[p36](fieldNames,function(i,name){forceFields[name]=fields[name];});$[t36](out,function(id,set){var s7t='cell';var I7t="splayFields";var m7t="toArray";var a36=V0H;D59.f59();a36+=I7t;var L36=o1r;L36+=c9c;set[G6H]=s7t;set[q4t]=attachEl?$(attachEl):__html_els(identifier,fieldNames)[m7t]();set[L36]=fields;set[a36]=forceFields;});return out;},fields:function(identifier){D59.f59();var c7t="sArray";var h36=d5H;h36+=L3H;h36+=E6H;var T36=H9c;T36+=c7t;var out={};var self=__dataSources[F5r];if($[T36](identifier)){for(var i=I8c,ien=identifier[o7H];i < ien;i++){var M36=X0h;M36+=B0h;var f36=p9c;f36+=J4H;var res=self[f36][M36](this,identifier[i]);out[identifier[i]]=res[identifier[i]];}return out;}var data={};var fields=this[c9c][l2r];if(!identifier){var Y36=i1H;Y36+=m9c;Y36+=H4r;Y36+=i9r;identifier=Y36;}$[m7H](fields,function(name,field){D59.f59();var p7t="valToData";var val=__html_get(identifier,field[K7t]());field[p7t](data,val === D8H?undefined:val);});out[identifier]={idSrc:identifier,data:data,node:document,fields:fields,type:h36};return out;},create:function(fields,data){if(data){var d36=g8H;d36+=s9c;var x36=C0r;x36+=K3H;x36+=s9c;var id=__dataSources[x36][E2H][d36](this,data);try{var o36=s9c;o36+=m9c;o36+=f0h;o36+=c3r;if(__html_id(id)[o36]){__html_set(id,fields,data);}}catch(e){;}}},edit:function(identifier,fields,data){var t7t="less";var C36=V7t;C36+=y6H;C36+=t7t;var j36=C3H;j36+=M9c;D59.S59();j36+=m5t;var id=__dataSources[j36][E2H][E9r](this,data) || C36;__html_set(id,fields,data);},remove:function(identifier,fields){D59.f59();var U36=i3r;U36+=L3H;U36+=F3r;__html_id(identifier)[U36]();}};})();Editor[H36]={"wrapper":P3H,"processing":{"indicator":L7t,"active":P66},"header":{"wrapper":a7t,"content":T7t},"body":{"wrapper":i66,"content":f7t},"footer":{"wrapper":F66,"content":M7t},"form":{"wrapper":D66,"content":Y7t,"tag":D59.v9c,"info":J66,"error":h7t,"buttons":u66,"button":x7t,"buttonInternal":l66},"field":{"wrapper":d7t,"typePrefix":o7t,"namePrefix":b66,"label":j7t,"input":O66,"inputControl":k66,"error":A66,"msg-label":C7t,"msg-error":K66,"msg-message":z66,"msg-info":U7t,"multiValue":H7t,"multiInfo":R66,"multiRestore":P1t,"multiNoEdit":X66,"disabled":n8H,"processing":L7t},"actions":{"create":B66,"edit":i1t,"remove":E66},"inline":{"wrapper":w66,"liner":q66,"buttons":Q66},"bubble":{"wrapper":F1t,"liner":D1t,"table":S66,"close":N66,"pointer":n66,"bg":J1t}};(function(){var q1t="edito";var O1t="eSi";var E1t="ools";var y1t="editor_edit";var P2t="formTitle";var A1t="lectedSingle";var B1t="eT";var f1t="mB";var w1t="editor_";var S1t="BUT";var h1t="cr";var X1t="abl";var g1t="subm";var F2t='buttons-edit';var N1t="ON";var z2t="indexes";var B2t='selectedSingle';var v1t="select_single";var C1t="uttons";var O2t='selected';var z1t="lecte";var R1t="-create";var G1t="abe";var X2t="editSingle";var H1t="formMessage";var l1t="Sing";var K1t="buttons-r";var Q1t="r_cr";var k1t="ngle";var O46=u1t;O46+=I3H;var b46=h8r;b46+=l1t;b46+=D4H;var l46=m9c;l46+=b1t;l46+=A5H;l46+=r9c;var u46=s6t;u46+=O1t;u46+=k1t;var J46=q5H;J46+=A1t;var D46=m9c;D46+=Z2r;var t06=K1t;t06+=K4h;var m06=d5H;m06+=j0t;var N06=q5H;N06+=z1t;N06+=r9c;var k06=b5t;k06+=g8h;k06+=R1t;var u06=m9c;u06+=b1t;u06+=A5H;u06+=r9c;var J06=m9c;J06+=P2H;J06+=M9c;var y66=c3H;y66+=X1t;y66+=B1t;y66+=E1t;if(DataTable[y66]){var f66=w1t;f66+=a0H;f66+=n0h;var s66=k5H;s66+=m4r;var W66=M9c;W66+=m9c;W66+=P2H;W66+=M9c;var G66=q1t;G66+=Q1t;G66+=L6t;G66+=m9c;var v66=S1t;v66+=c3H;v66+=N1t;v66+=m3H;var ttButtons=DataTable[F2h][v66];var ttButtonBase={sButtonText:D8H,editor:D8H,formTitle:D8H};ttButtons[G66]=$[K2H](C7H,ttButtons[W66],ttButtonBase,{formButtons:[{label:D8H,fn:function(e){this[I6H]();}}],fnClick:function(button,config){var n1t="ormButt";var I66=p1H;I66+=D4H;var e66=C1H;e66+=O1H;var V66=N3H;V66+=n1t;V66+=L3H;V66+=Q4H;var Z66=a9c;Z66+=L5H;Z66+=L3H;Z66+=d5H;var editor=config[Z66];var i18nCreate=editor[T3r][a9r];var buttons=config[V66];if(!buttons[I8c][e66]){var g66=c9c;g66+=S5H;g66+=K3H;g66+=L5H;var r66=s9c;r66+=s3H;r66+=X5h;r66+=s9c;buttons[I8c][r66]=i18nCreate[g66];}editor[a9r]({title:i18nCreate[I66],buttons:buttons});}});ttButtons[y1t]=$[s66](C7H,ttButtons[v1t],ttButtonBase,{formButtons:[{label:D8H,fn:function(e){this[I6H]();}}],fnClick:function(button,config){var W1t="Buttons";var e1t="tSele";var r1t="ctedInd";var V1t="fnGe";var T66=M9c;T66+=H9c;T66+=M9c;T66+=D4H;var L66=s9c;L66+=G1t;D59.S59();L66+=s9c;var t66=W3H;t66+=W1t;var p66=H9c;p66+=Z1t;p66+=A5H;var c66=s9c;c66+=G6r;c66+=v4H;c66+=c3r;var m66=V1t;m66+=e1t;m66+=r1t;m66+=Q4t;var selected=this[m66]();if(selected[c66] !== s8c){return;}var editor=config[H0h];var i18nEdit=editor[p66][O3h];var buttons=config[t66];if(!buttons[I8c][L66]){var a66=g1t;a66+=H9c;a66+=M9c;buttons[I8c][c2H]=i18nEdit[a66];}editor[O3h](selected[I8c],{title:i18nEdit[T66],buttons:buttons});}});ttButtons[f66]=$[K2H](C7H,ttButtons[I1t],ttButtonBase,{question:D8H,formButtons:[{label:D8H,fn:function(e){var M66=U8r;D59.S59();M66+=M9c;var that=this;this[M66](function(json){var c1t="fnSelectNone";var m1t="nGetInstance";var d66=M9c;d66+=s1t;var x66=N3H;x66+=m1t;var h66=c3H;h66+=X1t;h66+=B1t;h66+=E1t;var Y66=N3H;Y66+=A5H;var tt=$[Y66][q7H][h66][x66]($(that[c9c][d66])[V7H]()[m1r]()[W5h]());tt[c1t]();});}}],fnClick:function(button,config){var Y1t="fnGetSelectedIndexes";var L1t="onfir";var p1t="irm";var a1t="onf";var M1t="utton";var F06=s9c;F06+=Y1H;var i06=o8H;i06+=F1H;i06+=p1t;var P06=s9c;P06+=t1t;var H66=X4H;H66+=L1t;H66+=K3H;var U66=d9H;U66+=d5H;U66+=v1h;var C66=X4H;C66+=a1t;C66+=T1t;C66+=K3H;var j66=z1h;j66+=f1t;j66+=M1t;j66+=c9c;var o66=m9c;o66+=r9c;o66+=g9c;var rows=this[Y1t]();if(rows[o7H] === I8c){return;}var editor=config[o66];var i18nRemove=editor[T3r][h8r];var buttons=config[j66];var question=typeof i18nRemove[C66] === U66?i18nRemove[H66]:i18nRemove[J4h][rows[o7H]]?i18nRemove[J4h][rows[P06]]:i18nRemove[i06][i3H];if(!buttons[I8c][F06]){var D06=s9c;D06+=G1t;D06+=s9c;buttons[I8c][D06]=i18nRemove[I6H];}editor[h8r](rows,{message:question[g5r](/%d/g,rows[o7H]),title:i18nRemove[d0h],buttons:buttons});}});}var _buttons=DataTable[J06][q8r];D59.f59();$[u06](_buttons,{create:{text:function(dt,node,config){var d1t='buttons.create';var O06=q6h;O06+=A5H;var b06=h1t;b06+=L6t;b06+=m9c;var l06=r1h;l06+=x1t;return dt[l06](d1t,config[H0h][T3r][b06][O06]);},className:k06,editor:D8H,formButtons:{text:function(editor){var z06=g1t;D59.S59();z06+=L5H;var K06=t9r;K06+=n2H;K06+=m9c;var A06=r1h;A06+=D59.N9c;A06+=A5H;return editor[A06][K06][z06];},action:function(e){var R06=c9c;R06+=a3H;R06+=D3H;R06+=X2r;this[R06]();}},formMessage:D8H,formTitle:D8H,action:function(e,dt,node,config){var U1t="preOp";var j1t="formB";var o1t="age";var S06=M9c;S06+=L5H;S06+=s9c;S06+=m9c;var Q06=h1t;Q06+=L6t;D59.S59();Q06+=m9c;var q06=Q1H;q06+=o1t;var w06=j1t;w06+=C1t;var E06=U1t;E06+=G6r;var B06=G8H;B06+=m9c;var X06=m9c;X06+=r9c;X06+=L5H;X06+=N3h;var that=this;var editor=config[X06];this[P8H](C7H);editor[B06](E06,function(){D59.S59();that[P8H](j7H);})[a9r]({buttons:config[w06],message:config[H1t] || editor[T3r][a9r][q06],title:config[P2t] || editor[T3r][Q06][S06]});}},edit:{extend:N06,text:function(dt,node,config){var i2t='buttons.edit';var n06=a9c;n06+=H9c;n06+=M9c;return dt[T3r](i2t,config[H0h][T3r][n06][U3r]);},className:F2t,editor:D8H,formButtons:{text:function(editor){D59.S59();return editor[T3r][O3h][I6H];},action:function(e){var y06=c9c;y06+=S5H;y06+=X2r;this[y06]();}},formMessage:D8H,formTitle:D8H,action:function(e,dt,node,config){var J2t="messa";var l2t="dexe";var b2t="formButtons";var s06=m9c;s06+=i9h;var I06=H9c;I06+=D2t;I06+=x1t;var g06=J2t;g06+=v4H;g06+=m9c;var r06=m9c;r06+=i9h;var e06=D4H;e06+=A5H;e06+=d8H;var V06=s9c;V06+=t1t;var Z06=H9c;Z06+=A5H;Z06+=O4t;Z06+=R9H;var W06=u2t;W06+=o0t;W06+=c9c;var G06=W5H;G06+=l2t;G06+=c9c;var v06=d5H;v06+=g4t;v06+=c9c;var that=this;var editor=config[H0h];var rows=dt[v06]({selected:C7H})[G06]();var columns=dt[G4t]({selected:C7H})[W06]();var cells=dt[Z4t]({selected:C7H})[Z06]();var items=columns[V06] || cells[e06]?{rows:rows,columns:columns,cells:cells}:rows;this[P8H](C7H);editor[d6h](l3t,function(){that[P8H](j7H);})[r06](items,{buttons:config[b2t],message:config[H1t] || editor[T3r][O3h][g06],title:config[P2t] || editor[I06][s06][d0h]});}},remove:{extend:O2t,limitTo:[m06],text:function(dt,node,config){var k2t='buttons.remove';var p06=D3H;p06+=a3H;p06+=M9c;p06+=H8r;var c06=H9c;c06+=A2H;return dt[c06](k2t,config[H0h][T3r][h8r][p06]);},className:t06,editor:D8H,formButtons:{text:function(editor){var A2t="mov";var T06=c9c;T06+=a3H;T06+=q5t;T06+=M9c;var a06=a0H;a06+=A2t;a06+=m9c;var L06=r1h;L06+=D59.N9c;L06+=A5H;return editor[L06][a06][T06];},action:function(e){this[I6H]();}},formMessage:function(editor,dt){var K2t="confi";var j06=J6h;j06+=u6h;var o06=K2t;o06+=d5H;o06+=K3H;var d06=r8r;d06+=C3H;var x06=D4H;x06+=f0h;x06+=M9c;x06+=C3H;var h06=K2t;h06+=R8h;var Y06=U0r;Y06+=T1t;Y06+=K3H;var M06=D2h;M06+=F3r;var f06=H9c;f06+=D2t;f06+=D59.N9c;f06+=A5H;var rows=dt[g5h]({selected:C7H})[z2t]();var i18n=editor[f06][M06];var question=typeof i18n[Y06] === r5r?i18n[J4h]:i18n[h06][rows[x06]]?i18n[J4h][rows[d06]]:i18n[o06][i3H];return question[j06](/%d/g,rows[o7H]);},formTitle:D8H,action:function(e,dt,node,config){var R2t="Me";D59.f59();var F46=a0H;F46+=K3H;F46+=L3H;F46+=F3r;var i46=r1h;i46+=D59.N9c;i46+=A5H;var P46=N3H;P46+=n3H;P46+=R2t;P46+=s6h;var H06=z1h;H06+=f1t;H06+=C1t;var U06=y1h;U06+=H9c;U06+=f0h;var C06=a9c;C06+=L5H;C06+=N3h;var that=this;var editor=config[C06];this[U06](C7H);editor[d6h](l3t,function(){that[P8H](j7H);})[h8r](dt[g5h]({selected:C7H})[z2t](),{buttons:config[H06],message:config[P46],title:config[P2t] || editor[i46][F46][d0h]});}}});_buttons[X2t]=$[D46]({},_buttons[O3h]);_buttons[X2t][K2H]=J46;_buttons[u46]=$[l46]({},_buttons[h8r]);_buttons[b46][O46]=B2t;})();Editor[z2H]={};Editor[k46]=function(input,opts){var u8t="Editor datetime: Without momentjs only the format 'YYYY-MM-DD'";var G2t="ndar";var z8t='<button>';var N2t="ance";var T2t="span/";var a2t="month\"/>";var x2t="on>";var i8t="mom";var S8t='-error';var C2t="t\">";var t2t="/d";var G8t=/[haA]/;var c2t="div cla";var Y2t="ton>";var n2t="r-dateime-";var A8t='-date">';var M2t="</but";var W2t="-er";var e2t="-minutes";var d2t="revio";var g2t="v cl";var m2t="e\">";var y8t=/[YMD]|L(?!T)|l/;var B8t='<span/>';var o2t="-icon";var U2t="Y";var w8t='-calendar"/>';var v8t=/[Hhm]|LT|LTS/;var w2t="lendar";var l8t="can be used";var j2t="Le";var Q8t='-seconds"/>';var p2t="select class=\"";var F8t="Pre";var L2t="iv";var h2t="utton>";var R8t='-iconRight">';var f2t="label\"";var s2t="-tim";var Q2t="xOf";var K8t='-title">';var I2t="ass=";var J8t="teTime";var Z2t="\"/>";var X8t='<select class="';var E2t="_construct";var q8t='-hours"/>';var V2t=" c";var P8t="DD";var E8t='-year"/>';var H2t="Y-MM-";var X76=E2t;X76+=N3h;var R76=X0h;R76+=w2t;var z76=r9c;z76+=J5r;var K76=r9c;K76+=L3H;K76+=K3H;var A76=r9c;A76+=L3H;A76+=K3H;var k76=m9c;k76+=Z6H;var O76=y6r;O76+=A5H;O76+=r9c;var b76=M9c;b76+=H9c;b76+=K3H;b76+=m9c;var l76=r9c;l76+=L3H;l76+=K3H;var u76=s3H;u76+=l5H;u76+=z4H;u76+=r9c;var J76=g5t;J76+=J5H;var D76=s3H;D76+=d5h;D76+=G6r;D76+=r9c;var F76=N3H;F76+=L3H;F76+=q2t;var i76=u2t;i76+=Q2t;var P76=S2t;P76+=c9c;P76+=M9c;P76+=N2t;var H46=I2h;H46+=M9c;H46+=L3H;H46+=n2t;var U46=y2t;U46+=H9c;U46+=K3H;U46+=m9c;var C46=v2t;C46+=X0h;C46+=D4H;C46+=G2t;var j46=I9c;j46+=A5H;j46+=r9c;var o46=y2t;o46+=L5H;o46+=s9c;o46+=m9c;var d46=N3H;d46+=H9c;d46+=A5H;d46+=r9c;var x46=v2t;x46+=g5t;x46+=J5H;var h46=I9c;h46+=I3H;var Y46=W2t;Y46+=Q9H;Y46+=Z2t;var M46=Z1h;M46+=V2t;M46+=s9c;M46+=f1H;var f46=s1H;f46+=r9c;f46+=R1H;var T46=e2t;T46+=e7H;T46+=r2t;var a46=E1H;a46+=g2t;a46+=I2t;a46+=e7H;var L46=s2t;L46+=m2t;var t46=X1H;t46+=c2t;t46+=q8H;t46+=j1H;var p46=z1H;p46+=R1H;var c46=X1H;c46+=B1H;var m46=X1H;m46+=l6h;m46+=A6r;var s46=X1H;s46+=p2t;var I46=v2t;I46+=s9c;I46+=Y1H;I46+=z6r;var g46=X1H;g46+=t2t;g46+=L2t;g46+=S1H;var r46=v2t;r46+=a2t;var e46=X1H;e46+=T2t;e46+=S1H;var V46=v2t;V46+=f2t;V46+=S1H;var Z46=X1H;Z46+=t2t;Z46+=R1H;var W46=M2t;W46+=Y2t;var G46=A5H;G46+=f9c;G46+=M9c;var v46=X1H;v46+=D3H;v46+=h2t;var y46=g0r;y46+=S3H;y46+=o2r;var n46=z1H;n46+=R1H;var N46=M2t;N46+=M9c;N46+=x2t;var S46=l5H;S46+=d2t;S46+=t9H;var Q46=o2t;D59.S59();Q46+=j2t;Q46+=N3H;Q46+=C2t;var q46=e7H;q46+=S1H;var B46=x9c;B46+=U2t;B46+=H2t;B46+=P8t;var X46=W3H;X46+=n2H;var R46=i8t;R46+=m9c;R46+=A5H;R46+=M9c;var z46=H9c;z46+=Z1t;z46+=A5H;var K46=X4H;K46+=N3r;K46+=F8t;K46+=D8t;var A46=D5H;A46+=J8t;this[X4H]=$[K2H](C7H,{},Editor[A46][o3r],opts);var classPrefix=this[X4H][K46];var i18n=this[X4H][z46];if(!window[R46] && this[X4H][X46] !== B46){var E46=u8t;E46+=A7H;E46+=l8t;throw E46;}var timeBlock=function(type){var O8t='-timeblock">';var b8t="lass=\"";var w46=Z1h;w46+=V2t;w46+=b8t;return w46 + classPrefix + O8t + d2H;};var gap=function(){var k8t='<span>:</span>';return k8t;};var structure=$(V2H + classPrefix + q46 + V2H + classPrefix + A8t + V2H + classPrefix + K8t + V2H + classPrefix + Q46 + z8t + i18n[S46] + N46 + n46 + y46 + classPrefix + R8t + v46 + i18n[G46] + W46 + Z46 + V2H + classPrefix + V46 + e46 + X8t + classPrefix + r46 + g46 + V2H + classPrefix + I46 + B8t + s46 + classPrefix + E8t + m46 + c46 + V2H + classPrefix + w8t + p46 + t46 + classPrefix + L46 + V2H + classPrefix + q8t + a46 + classPrefix + T46 + V2H + classPrefix + Q8t + f46 + M46 + classPrefix + Y46 + d2H);this[k8H]={container:structure,date:structure[h46](E6h + classPrefix + x46),title:structure[d46](E6h + classPrefix + o46),calendar:structure[j46](E6h + classPrefix + C46),time:structure[r5h](E6h + classPrefix + U46),error:structure[r5h](E6h + classPrefix + S8t),input:$(input)};this[c9c]={d:D8H,display:D8H,minutesRange:D8H,secondsRange:D8H,namespace:H46 + Editor[N8t][P76]++,parts:{date:this[X4H][n8t][y9h](y8t) !== D8H,time:this[X4H][n8t][y9h](v8t) !== D8H,seconds:this[X4H][n8t][i76](E7H) !== -s8c,hours12:this[X4H][F76][y9h](G8t) !== D8H}};this[k8H][f8H][D76](this[k8H][J76])[u76](this[l76][b76])[O76](this[k8H][k76]);this[A76][Y9c][D5r](this[K76][d0h])[D5r](this[z76][R76]);this[X76]();};$[B76](Editor[N8t][E76],{destroy:function(){var W8t=".editor-dateti";var N76=W8t;N76+=K3H;N76+=m9c;var S76=L3H;S76+=N3H;S76+=N3H;var Q76=c9H;Q76+=M9c;var q76=m9c;q76+=Z8t;q76+=g6H;var w76=L3H;w76+=N3H;w76+=N3H;this[d4r]();this[k8H][f8H][w76]()[q76]();this[k8H][Q76][S76](N76);},errorMsg:function(msg){var n76=m9c;n76+=d5H;D59.f59();n76+=d5H;n76+=N3h;var error=this[k8H][n76];if(msg){error[F5r](msg);}else {var y76=m9c;y76+=Z8t;y76+=M9c;y76+=y6H;error[y76]();}},hide:function(){var v76=i3H;v76+=W3h;this[v76]();},max:function(date){this[X4H][V8t]=date;this[e8t]();this[r8t]();},min:function(date){var I8t="Calan";var s8t="inDat";var g8t="_se";var W76=g8t;W76+=M9c;W76+=I8t;W76+=k2r;var G76=K3H;G76+=s8t;G76+=m9c;this[X4H][G76]=date;D59.f59();this[e8t]();this[W76]();},owns:function(node){var V76=r9c;V76+=L3H;V76+=K3H;var Z76=m8t;Z76+=c9c;return $(node)[Z76]()[b7t](this[V76][f8H])[o7H] > I8c;},val:function(set,write){var T8t="rin";var M8t="now";var d8t="mentLocal";var U8t=/(\d{4})\-(\d{2})\-(\d{2})/;var h8t="omen";var D9t="setUTCDate";var i9t="riteOu";var j8t="isValid";var f8t="--";var c8t="_setT";var o8t="moment";var L8t="St";var F9t="tput";var C8t="toDate";var t8t="isp";var f76=c8t;f76+=p8t;var T76=r9c;T76+=t8t;T76+=s9c;T76+=O4H;var a76=U6H;a76+=L8t;a76+=a8t;a76+=f0h;var L76=r9c;L76+=B3r;L76+=h5t;var r76=c9c;r76+=M9c;r76+=T8t;r76+=v4H;var e76=f8t;e76+=M8t;if(set === undefined){return this[c9c][r9c];}if(set instanceof Date){this[c9c][r9c]=this[Y8t](set);}else if(set === D8H || set === B7H){this[c9c][r9c]=D8H;}else if(set === e76){this[c9c][r9c]=new Date();}else if(typeof set === r76){var g76=K3H;g76+=h8t;g76+=M9c;if(window[g76]){var m76=x8t;m76+=X4H;m76+=M9c;var s76=e3H;s76+=d8t;s76+=m9c;var I76=m9H;I76+=X4H;var m=window[o8t][I76](set,this[X4H][n8t],this[X4H][s76],this[X4H][m76]);this[c9c][r9c]=m[j8t]()?m[C8t]():D8H;}else {var match=set[y9h](U8t);this[c9c][r9c]=match?new Date(Date[H8t](match[s8c],match[m8c] - s8c,match[c8c])):D8H;}}if(write || write === undefined){if(this[c9c][r9c]){var c76=P9t;c76+=i9t;c76+=F9t;this[c76]();}else {var t76=f0H;t76+=A5r;var p76=r9c;p76+=L3H;p76+=K3H;this[p76][L2H][t76](set);}}if(!this[c9c][r9c]){this[c9c][r9c]=this[Y8t](new Date());}this[c9c][L76]=new Date(this[c9c][r9c][a76]());this[c9c][T76][D9t](s8c);this[J9t]();this[r8t]();this[f76]();},_constructor:function(){var y9t="ain";var n9t='keyup.editor-datetime';var l9t="autocomple";var u9t="cus.editor-datetime click.editor-datetime";var R9t="seconds";var S9t=':visible';var U9t="_writeOutput";var v9t='select';var F5S="_setTime";var T9t="setUT";var I9t="has";var E9t="onds";var q9t='off';var X9t="ov";var B9t="-sec";var k9t="_optionsTi";var U16=Q3H;U16+=C8r;U16+=i1H;var S16=r9c;S16+=L3H;S16+=K3H;var K16=k3H;K16+=u9t;var A16=l9t;A16+=J5H;var k16=b9t;k16+=d5H;var O16=H9c;O16+=O9t;var b16=r9c;b16+=L3H;b16+=K3H;var l16=k9t;l16+=i4h;l16+=m9c;var o76=M9c;o76+=n7r;o76+=m9c;var d76=M2h;d76+=d5H;d76+=M9c;d76+=c9c;var x76=r9c;x76+=s3H;x76+=M9c;x76+=m9c;var that=this;var classPrefix=this[X4H][A9t];var onChange=function(){var K9t="nChange";var h76=H9c;h76+=A5H;h76+=l5H;h76+=m9H;var Y76=X4H;Y76+=s3H;Y76+=s9c;Y76+=s9c;var M76=L3H;M76+=K9t;that[X4H][M76][Y76](that,that[k8H][h76][m5h](),that[c9c][r9c],that[k8H][L2H]);};if(!this[c9c][z9t][x76]){this[k8H][Y9c][b8H](P9H,i9H);}if(!this[c9c][d76][o76]){var C76=g7r;C76+=s9c;C76+=s3H;C76+=y6H;var j76=X4H;j76+=c9c;j76+=c9c;this[k8H][h9c][j76](C76,i9H);}if(!this[c9c][z9t][R9t]){var u16=d5H;u16+=o8r;u16+=X9t;u16+=m9c;var J16=m9c;J16+=r9h;var D16=M9c;D16+=H9c;D16+=K3H;D16+=m9c;var F16=r9c;F16+=J5r;var i16=a0H;i16+=e3H;i16+=f0H;i16+=m9c;var P16=B9t;P16+=E9t;var H76=r9c;H76+=H9c;H76+=f0H;H76+=f5h;var U76=M9c;U76+=p8t;this[k8H][U76][p0r](H76 + classPrefix + P16)[i16]();this[F16][D16][p0r](w9t)[J16](s8c)[u16]();}this[l16]();this[b16][O16][k16](A16,q9t)[G8H](K16,function(){var N9t=':disabled';var E16=U8H;E16+=K3H;var B16=H9c;B16+=c9c;var X16=H9c;X16+=Q9t;X16+=m9H;D59.f59();var R16=U8H;R16+=K3H;var z16=U8H;z16+=K3H;if(that[z16][f8H][B3r](S9t) || that[R16][X16][B16](N9t)){return;}that[m5h](that[E16][L2H][m5h](),j7H);that[r6r]();})[G8H](n9t,function(){var q16=o8H;q16+=G7r;q16+=y9t;q16+=l1H;var w16=U8H;w16+=K3H;if(that[w16][q16][B3r](S9t)){var Q16=f0H;Q16+=s3H;Q16+=s9c;that[Q16](that[k8H][L2H][m5h](),j7H);}});this[S16][f8H][G8H](z5h,v9t,function(){var P5S="eOutput";var f9t="CFullYea";var i5S="etSeconds";var a9t="ander";var s9t="asClass";var p9t='-month';var L9t="_setCal";var x9t="hours12";var V9t="cond";var r9t="inu";var Y9t="riteOutput";var m9t="-h";var g9t="tes";var H9t="_writ";var Z9t="-s";var t9t="_correctMonth";var e9t="-m";var c9t="urs";var j9t="Time";var M9t='-ampm';var G9t="itio";var h9t="etTim";var o9t="setUTCHours";var d9t="ontainer";var C16=t0h;C16+=a4r;C16+=G9t;C16+=A5H;var j16=n6t;j16+=a3H;j16+=c9c;var o16=W5H;o16+=W9t;o16+=M9c;var d16=r9c;d16+=L3H;d16+=K3H;var Y16=Z9t;Y16+=m9c;Y16+=V9t;Y16+=c9c;var f16=e9t;f16+=r9t;f16+=g9t;var T16=I9t;D59.S59();T16+=V2h;T16+=C2r;T16+=c9c;var Z16=C3H;Z16+=s9t;var W16=m9t;W16+=L3H;W16+=c9t;var n16=v2t;n16+=y6H;n16+=B5h;n16+=d5H;var N16=e9H;N16+=S3H;N16+=c9c;var select=$(this);var val=select[m5h]();if(select[N16](classPrefix + p9t)){that[t9t](that[c9c][o9H],val);that[J9t]();that[r8t]();}else if(select[K9H](classPrefix + n16)){var G16=L9t;G16+=a9t;var v16=T9t;v16+=f9t;v16+=d5H;var y16=g7r;y16+=s9c;y16+=O4H;that[c9c][y16][v16](val);that[J9t]();that[G16]();}else if(select[K9H](classPrefix + W16) || select[Z16](classPrefix + M9t)){var a16=P9t;a16+=Y9t;var L16=t4r;L16+=h9t;L16+=m9c;var V16=M2h;V16+=d5H;V16+=k3r;if(that[c9c][V16][x9t]){var t16=l5H;t16+=K3H;var p16=f0H;p16+=s3H;p16+=s9c;var c16=v2t;c16+=s3H;c16+=Z8t;c16+=K3H;var m16=N3H;m16+=H9c;m16+=A5H;m16+=r9c;var s16=w9H;s16+=y9t;s16+=l1H;var I16=r9c;I16+=L3H;I16+=K3H;var g16=v2t;g16+=x9H;g16+=c9t;var r16=X4H;r16+=d9t;var e16=U8H;e16+=K3H;var hours=$(that[e16][r16])[r5h](E6h + classPrefix + g16)[m5h]() * s8c;var pm=$(that[I16][s16])[m16](E6h + classPrefix + c16)[p16]() === t16;that[c9c][r9c][o9t](hours === Y8c && !pm?I8c:pm && hours !== Y8c?hours + Y8c:hours);}else {that[c9c][r9c][o9t](val);}that[L16]();that[a16](C7H);onChange();}else if(select[T16](classPrefix + f16)){var M16=i3H;M16+=Z7r;M16+=j9t;that[c9c][r9c][C9t](val);that[M16]();that[U9t](C7H);onChange();}else if(select[K9H](classPrefix + Y16)){var x16=H9t;x16+=P5S;var h16=c9c;h16+=i5S;that[c9c][r9c][h16](val);that[F5S]();that[x16](C7H);onChange();}that[d16][o16][j16]();that[C16]();})[G8H](U16,function(e){var M5S='setUTCHours';var j5S="CFull";var u5S="toLow";var R5S='range';var e5S="lu";var S5S="_setCa";var O5S="ntNo";var I5S="disab";var a5S="etUT";var k5S="arget";var C5S="Year";D59.f59();var l5S="erCase";var K5S="hasC";var G5S='-time';var H5S='day';var h5S='setSeconds';var w5S="nth";var L5S="getUTCHours";var s5S="esRa";var E5S="UTCM";var b5S="pare";var r5S='unit';var y5S="Month";var Y5S='setUTCMinutes';var D5S="opP";var J5S="ropagation";var N5S="nder";var A5S="ngt";var B5S="etTit";var n5S="orrect";var x5S="writeOu";var q5S="UTCMont";var U5S="setUTCDat";var o5S="CMonth";var Z5S="second";var F26=d9H;F26+=D5S;F26+=J5S;var i26=u5S;i26+=l5S;var P26=b5S;P26+=O5S;P26+=i4H;var H16=M9c;H16+=k5S;var d=that[c9c][r9c];var nodeName=e[n0r][B4t][G9h]();var target=nodeName === w9t?e[H16][P26]:e[n0r];nodeName=target[B4t][i26]();if(nodeName === v9t){return;}e[F26]();if(nodeName === s0h){var w26=s9c;w26+=m9c;w26+=A5S;w26+=C3H;var u26=I9t;u26+=B9H;u26+=s3H;u26+=q8H;var J26=K5S;J26+=N3r;var D26=n6h;D26+=m9c;D26+=A5H;D26+=M9c;var button=$(target);var parent=button[D26]();if(parent[J26](z5S) && !parent[u26](R5S)){button[G8r]();return;}if(parent[K9H](classPrefix + X5S)){var A26=W5H;A26+=W9t;A26+=M9c;var k26=r9c;k26+=L3H;k26+=K3H;var O26=t4r;O26+=B5S;O26+=D4H;var b26=p8r;b26+=E5S;b26+=L3H;b26+=w5S;var l26=Z7r;l26+=q5S;l26+=C3H;that[c9c][o9H][l26](that[c9c][o9H][b26]() - s8c);that[O26]();that[r8t]();that[k26][A26][Y6H]();}else if(parent[K9H](classPrefix + Q5S)){var E26=k3H;E26+=g0h;E26+=c9c;var B26=W5H;B26+=l5H;B26+=m9H;var X26=r9c;X26+=L3H;X26+=K3H;var R26=S5S;R26+=C1H;R26+=N5S;var z26=g7r;z26+=s9c;z26+=O4H;var K26=W8r;K26+=n5S;K26+=y5S;that[K26](that[c9c][z26],that[c9c][o9H][v5S]() + s8c);that[J9t]();that[R26]();that[X26][B26][E26]();}else if(button[H8H](E6h + classPrefix + G5S)[w26]){var e26=W5S;e26+=m9H;e26+=R9H;var Z26=l5H;Z26+=K3H;var W26=s3H;W26+=K3H;var y26=Z5S;y26+=c9c;var Q26=V5S;Q26+=e5S;Q26+=m9c;var q26=r9c;q26+=s3H;q26+=S8H;var val=button[q26](Q26);var unit=button[D2H](r5S);if(unit === g5S){var N26=d5H;N26+=G3H;var S26=I5S;S26+=D4H;S26+=r9c;if(parent[K9H](S26) && parent[K9H](N26)){var n26=W5S;n26+=m9H;n26+=s5S;n26+=m5S;that[c9c][n26]=val;that[F5S]();return;}else {that[c9c][c5S]=D8H;}}if(unit === y26){var G26=p5S;G26+=v4H;G26+=m9c;var v26=V0H;v26+=c9c;v26+=s1t;v26+=r9c;if(parent[K9H](v26) && parent[K9H](G26)){that[c9c][t5S]=val;that[F5S]();return;}else {that[c9c][t5S]=D8H;}}if(val === W26){if(d[L5S]() >= Y8c){val=d[L5S]() - Y8c;}else {return;}}else if(val === Z26){if(d[L5S]() < Y8c){var V26=v4H;V26+=a5S;V26+=V2h;V26+=T5S;val=d[V26]() + Y8c;}else {return;}}var set=unit === f5S?M5S:unit === e26?Y5S:h5S;d[set](val);that[F5S]();that[U9t](C7H);onChange();}else {var L26=i3H;L26+=x5S;L26+=M9c;L26+=d5S;var t26=Z7r;t26+=H8t;t26+=K5H;t26+=m9c;var p26=K3H;p26+=G8H;p26+=M9c;p26+=C3H;var c26=r9c;c26+=s3H;c26+=M9c;c26+=s3H;var m26=T9t;m26+=o5S;var s26=y6H;s26+=m9c;s26+=v6h;var I26=r9c;I26+=s3H;I26+=S8H;var g26=T9t;g26+=j5S;g26+=C5S;var r26=U5S;r26+=m9c;if(!d){d=that[Y8t](new Date());}d[r26](s8c);d[g26](button[I26](s26));d[m26](button[c26](p26));d[t26](button[D2H](H5S));that[L26](C7H);if(!that[c9c][z9t][h9c]){setTimeout(function(){that[d4r]();},f8c);}else {that[r8t]();}onChange();}}else {var a26=H9c;a26+=Q9t;a26+=a3H;a26+=M9c;that[k8H][a26][Y6H]();}});},_compareDates:function(a,b){var J3S="_dateToUtcString";var i3S="To";var F3S="Utc";var P3S="_date";var D3S="String";var T26=P3S;T26+=i3S;T26+=F3S;T26+=D3S;return this[J3S](a) === this[T26](b);},_correctMonth:function(date,month){var O3S="setUTCMonth";var u3S="etUTCDate";var A3S="UTCDat";var k3S="TCMonth";var f26=v4H;f26+=u3S;var days=this[l3S](date[b3S](),month);var correctDays=date[f26]() > days;date[O3S](month);if(correctDays){var Y26=Z7r;Y26+=q5h;Y26+=k3S;var M26=q5H;M26+=M9c;M26+=A3S;M26+=m9c;date[M26](days);date[Y26](month);}},_daysInMonth:function(year,month){var P9c=28;D59.S59();var F9c=30;var D9c=31;var i9c=29;var isLeap=year % p8c === I8c && (year % A9c !== I8c || year % z9c === I8c);var months=[D9c,isLeap?i9c:P9c,D9c,F9c,D9c,F9c,D9c,D9c,F9c,D9c,F9c,D9c];return months[month];},_dateToUtc:function(s){var K3S="getMi";var E3S="getHours";var z3S="nut";var R3S="getD";var w3S="getSeconds";var B3S="getMonth";var x26=K3S;x26+=z3S;x26+=R9H;var h26=R3S;h26+=X6H;return new Date(Date[H8t](s[X3S](),s[B3S](),s[h26](),s[E3S](),s[x26](),s[w3S]()));},_dateToUtcString:function(d){var q3S="tU";var Q3S="TCDate";var S3S="_pa";var j26=v1H;j26+=q3S;j26+=Q3S;var o26=S3S;o26+=r9c;var d26=N3S;d26+=v6h;return d[d26]() + E0h + this[n3S](d[v5S]() + s8c) + E0h + this[o26](d[j26]());},_hide:function(){var v3S="k.";var W3S="E_Body_Content";var G3S="div.DT";var Z3S="scroll";var J86=y3S;J86+=X4H;J86+=v3S;var D86=G3S;D86+=W3S;var F86=Z3S;F86+=f5h;var i86=L3H;i86+=N3H;i86+=N3H;var P86=L3H;P86+=N3H;P86+=N3H;var H26=L3H;H26+=N3H;H26+=N3H;var U26=v4r;U26+=s3H;U26+=v3H;var C26=r9c;C26+=J5r;var namespace=this[c9c][E4h];this[C26][f8H][U26]();$(window)[H26](E6h + namespace);$(document)[P86](V3S + namespace);$(e3S)[i86](F86 + namespace);$(D86)[Q6h](r3S + namespace);$(c0r)[Q6h](J86 + namespace);},_hours24To12:function(val){return val === I8c?Y8c:val > Y8c?val - Y8c:val;},_htmlDay:function(day){var f3S='<td class="empty"></td>';var t3S="n ";var H3S='</button>';var m3S="\" data-";var p3S="-b";var U3S="day";var s3S="pan>";var M3S='selectable';var c3S="th=\"";var j3S="month";var h3S='" class="';var d3S='-day" type="button" ';var I3S="<s";var Y3S="lected";var L3S="<td data-";var a3S="cted";var C3S='" data-day="';var o3S='data-year="';var T3S="toda";var P6S='</td>';var S86=g3S;S86+=S1H;var Q86=r9c;Q86+=s3H;Q86+=y6H;var q86=I3S;q86+=s3S;var w86=e7H;D59.S59();w86+=S1H;var E86=m3S;E86+=K3H;E86+=G8H;E86+=c3S;var B86=y6H;B86+=m9c;B86+=s3H;B86+=d5H;var X86=p3S;X86+=q4H;X86+=L3H;X86+=t3S;var R86=e7H;R86+=S1H;var z86=r9c;z86+=s3H;z86+=y6H;var K86=L3S;K86+=g5t;K86+=y6H;K86+=j1H;var k86=q5H;k86+=s9c;k86+=m9c;k86+=a3S;var b86=T3S;b86+=y6H;var u86=m9c;u86+=K3H;u86+=U5r;u86+=y6H;if(day[u86]){return f3S;}var classes=[M3S];var classPrefix=this[X4H][A9t];if(day[n8H]){var l86=V0H;l86+=v0H;l86+=n5H;l86+=r9c;classes[c7H](l86);}if(day[b86]){var O86=C0H;O86+=E6H;classes[c7H](O86);}if(day[k86]){var A86=q5H;A86+=Y3S;classes[c7H](A86);}return K86 + day[z86] + h3S + classes[G2h](r2H) + R86 + x3S + classPrefix + X86 + classPrefix + d3S + o3S + day[B86] + E86 + day[j3S] + C3S + day[U3S] + w86 + q86 + day[Q86] + S86 + H3S + P6S;},_htmlMonth:function(year,month){var r6S='<thead>';var n6S="_compareDates";var K6S="Day";var F6S="tbody>";var w6S="nutes";var z6S="UT";var X6S="setUTCHour";var l6S="howWeekNumbe";var v6S="_htmlDay";var q6S="setUTC";var D6S="</thead";var N6S="nArra";var B6S="setSeconds";var W6S="_htmlWeekOfYear";var j8c=23;var E6S="setUTCMi";var i6S="le>";var g6S="_htmlMonthHead";var y6S="disableDays";var e6S=' weekNumber';var O6S="max";var J6S="<table";var u6S=" class=\"";var S6S="CD";var b6S="ssPre";var j86=s1H;j86+=V4t;j86+=i6S;var o86=s1H;o86+=F6S;var d86=K0h;d86+=L3H;d86+=H9c;d86+=A5H;var x86=D6S;x86+=S1H;var h86=J6S;h86+=u6S;var p86=c9c;p86+=l6S;p86+=d5H;var c86=y2t;c86+=L7H;c86+=s9c;c86+=m9c;var m86=D9r;m86+=b6S;m86+=D8t;var v86=O6S;v86+=k6S;var y86=K3H;y86+=W5H;y86+=C9c;y86+=X6H;var n86=A6S;n86+=K6S;var N86=z6S;N86+=V2h;var now=this[Y8t](new Date()),days=this[l3S](year,month),before=new Date(Date[N86](year,month,s8c))[n86](),data=[],row=[];if(this[X4H][R6S] > I8c){before-=this[X4H][R6S];if(before < I8c){before+=L8c;}}var cells=days + before,after=cells;while(after > L8c){after-=L8c;}cells+=L8c - after;var minDate=this[X4H][y86];var maxDate=this[X4H][v86];if(minDate){var G86=X6S;G86+=c9c;minDate[G86](I8c);minDate[C9t](I8c);minDate[B6S](I8c);}if(maxDate){var Z86=E6S;Z86+=w6S;var W86=q6S;W86+=T5S;maxDate[W86](j8c);maxDate[Z86](b9c);maxDate[B6S](b9c);}for(var i=I8c,r=I8c;i < cells;i++){var I86=l5H;I86+=a3H;I86+=c9c;I86+=C3H;var g86=p8H;g86+=j4h;g86+=A5H;var r86=Q6S;r86+=c3H;r86+=S6S;r86+=O4H;var e86=H9c;e86+=N6S;e86+=y6H;var V86=g2h;V86+=S3h;V86+=s3H;V86+=y6H;var day=new Date(Date[H8t](year,month,s8c + (i - before))),selected=this[c9c][r9c]?this[n6S](day,this[c9c][r9c]):j7H,today=this[n6S](day,now),empty=i < before || i >= days + before,disabled=minDate && day < minDate || maxDate && day > maxDate;var disableDays=this[X4H][y6S];if($[V86](disableDays) && $[e86](day[r86](),disableDays) !== -s8c){disabled=C7H;}else if(typeof disableDays === g86 && disableDays(day) === C7H){disabled=C7H;}var dayConfig={day:s8c + (i - before),month:month,year:year,selected:selected,today:today,disabled:disabled,empty:empty};row[I86](this[v6S](dayConfig));if(++r === L8c){var s86=k0h;s86+=A5H;if(this[X4H][G6S]){row[m8H](this[W6S](i - before,month,year));}data[c7H](Z6S + row[s86](B7H) + V6S);row=[];r=I8c;}}var classPrefix=this[X4H][m86];var className=classPrefix + c86;if(this[X4H][p86]){className+=e6S;}if(minDate){var f86=X0H;f86+=u3r;var T86=A5H;T86+=L3H;T86+=A5H;T86+=m9c;var a86=X4H;a86+=q8H;var L86=N3H;L86+=W5H;L86+=r9c;var t86=M9c;t86+=L5H;t86+=s9c;t86+=m9c;var underMin=minDate >= new Date(Date[H8t](year,month,s8c,I8c,I8c,I8c));this[k8H][t86][L86](U0h + classPrefix + X5S)[a86](P9H,underMin?T86:f86);}if(maxDate){var Y86=t3r;Y86+=t4H;var M86=r9c;M86+=L3H;M86+=K3H;var overMax=maxDate < new Date(Date[H8t](year,month + s8c,s8c,I8c,I8c,I8c));this[M86][d0h][r5h](U0h + classPrefix + Q5S)[b8H](P9H,overMax?i9H:Y86);}return h86 + className + I2H + r6S + this[g6S]() + x86 + I6S + data[d86](B7H) + o86 + j86;},_htmlMonthHead:function(){var c6S='<th></th>';var p6S='</th>';var C86=r1h;C86+=D59.N9c;C86+=A5H;var a=[];var firstDay=this[X4H][R6S];var i18n=this[X4H][C86];var dayName=function(day){var m6S="ays";var s6S="weekd";var U86=s6S;U86+=m6S;day+=firstDay;while(day >= L8c){day-=L8c;}D59.S59();return i18n[U86][day];};if(this[X4H][G6S]){a[c7H](c6S);}for(var i=I8c;i < L8c;i++){var H86=X1H;H86+=M9c;H86+=C3H;H86+=S1H;a[c7H](H86 + dayName(i) + p6S);}return a[G2h](B7H);},_htmlWeekOfYear:function(d,m,y){var h6S='<td class="';var L6S="we";var Y6S="getDay";var f6S="setDate";var M6S="getDate";var q9c=86400000;D59.S59();var T6S="cei";var t6S="/td";var a6S="ek\">";var F96=X1H;F96+=t6S;F96+=S1H;var i96=v2t;i96+=L6S;i96+=a6S;var P96=T6S;P96+=s9c;var date=new Date(y,m,d,I8c,I8c,I8c,I8c);date[f6S](date[M6S]() + p8c - (date[Y6S]() || L8c));var oneJan=new Date(y,I8c,s8c);var weekNum=Math[P96](((date - oneJan) / q9c + s8c) / L8c);return h6S + this[X4H][A9t] + i96 + weekNum + F96;},_options:function(selector,values,labels){var o6S='<option value="';var x6S='select.';var j6S='</option>';var J96=N3H;J96+=H9c;J96+=I3H;var D96=r9c;D96+=L3H;D96+=K3H;if(!labels){labels=values;}var select=this[D96][f8H][J96](x6S + this[X4H][A9t] + E0h + selector);D59.S59();select[d6S]();for(var i=I8c,ien=values[o7H];i < ien;i++){var u96=e7H;u96+=S1H;select[D5r](o6S + values[i] + u96 + labels[i] + j6S);}},_optionSet:function(selector,val){var i0S="unknown";var H6S="ct.";var C6S="sPref";var U6S="ix";var X96=H9c;X96+=D2t;X96+=x1t;var R96=M9c;R96+=k5H;var z96=D4H;z96+=f0h;z96+=c3r;var K96=C0r;K96+=K3H;K96+=s9c;var A96=X4H;A96+=f2r;A96+=x2r;var k96=h1r;k96+=C6S;k96+=U6S;var O96=q5H;O96+=s9c;O96+=m9c;O96+=H6S;var b96=o8H;b96+=D3r;b96+=a9H;D59.S59();var l96=r9c;l96+=J5r;var select=this[l96][b96][r5h](O96 + this[X4H][k96] + E0h + selector);var span=select[m8t]()[A96](w9t);select[m5h](val);var selected=select[r5h](P0S);span[K96](selected[z96] !== I8c?selected[R96]():this[X4H][X96][i0S]);},_optionsTime:function(unit,count,val,allowed,range){var s0S='<table class="';var m0S='</table>';var O0S='-table';var S0S='am';var e0S="fl";var g0S="e\"><tbody>";var b0S="n=\"";var D0S="</th></tr></t";var u0S="<thead><tr>";var I0S='</tbody></thead><table class="';var t8c=6;var l0S="th colspa";var Z0S="r>";var k0S="</t";var W0S="<t";var V0S="</tr";var F0S="/tbody>";var J0S="head>";var r0S="-nospac";var x96=X1H;x96+=F0S;var h96=D0S;h96+=J0S;var Y96=u0S;Y96+=X1H;Y96+=l0S;Y96+=b0S;var M96=e7H;M96+=S1H;var q96=H9c;q96+=D2t;q96+=D59.N9c;q96+=A5H;var w96=t0h;w96+=X9H;var E96=N3H;E96+=H9c;E96+=I3H;var B96=r9c;B96+=L3H;B96+=K3H;var classPrefix=this[X4H][A9t];var container=this[B96][f8H][E96](U0h + classPrefix + E0h + unit);var i,j;var render=count === Y8c?function(i){return i;}:this[w96];var classPrefix=this[X4H][A9t];var className=classPrefix + O0S;var i18n=this[X4H][q96];if(!container[o7H]){return;}var a=B7H;var span=f8c;D59.S59();var button=function(value,label,className){var w0S="inA";var y0S='<td class="selectable ';var B0S="-bu";var R0S="utton\" da";var E0S="ton ";var N0S='pm';var z0S="y\" type=\"b";var v0S='" data-value="';var K0S="-da";var X0S="ta-unit=\"";var Q0S="umber";var n0S=" disable";var q0S="rra";var e96=k0S;e96+=r9c;e96+=S1H;var V96=s1H;V96+=U3r;V96+=S1H;var Z96=s1H;Z96+=A0S;Z96+=S1H;var W96=e7H;W96+=S1H;var G96=K0S;G96+=z0S;G96+=R0S;G96+=X0S;var v96=B0S;v96+=M9c;v96+=E0S;var y96=e7H;y96+=S1H;var N96=w0S;N96+=q0S;N96+=y6H;var S96=I1t;S96+=m9c;S96+=r9c;var Q96=A5H;Q96+=Q0S;if(count === Y8c && val >= Y8c && typeof value === Q96){value+=Y8c;}var selected=val === value || value === S0S && val < Y8c || value === N0S && val >= Y8c?S96:B7H;D59.f59();if(allowed && $[N96](value,allowed) === -s8c){var n96=n0S;n96+=r9c;selected+=n96;}if(className){selected+=r2H + className;}return y0S + selected + y96 + x3S + classPrefix + v96 + classPrefix + G96 + unit + v0S + value + W96 + G0S + label + Z96 + V96 + e96;};if(count === Y8c){var c96=s3H;c96+=K3H;c96+=b5h;c96+=K3H;var m96=l5H;m96+=K3H;var s96=W0S;s96+=Z0S;var I96=X1H;I96+=l6h;I96+=M9c;I96+=Z0S;var g96=s3H;g96+=K3H;g96+=b5h;g96+=K3H;var r96=W0S;r96+=Z0S;a+=r96;for(i=s8c;i <= t8c;i++){a+=button(i,render(i));}a+=button(S0S,i18n[g96][I8c]);a+=I96;a+=s96;for(i=L8c;i <= Y8c;i++){a+=button(i,render(i));}a+=button(m96,i18n[c96][s8c]);a+=V6S;span=L8c;}else if(count === C8c){var c=I8c;for(j=I8c;j < p8c;j++){var p96=k0S;p96+=Z0S;a+=Z6S;for(i=I8c;i < t8c;i++){a+=button(c,render(c));c++;}a+=p96;}span=t8c;}else {var f96=V0S;f96+=S1H;var T96=e0S;T96+=L3H;T96+=L3H;T96+=d5H;var a96=r0S;a96+=g0S;var t96=W0S;t96+=d5H;t96+=S1H;a+=t96;for(j=I8c;j < O9c;j+=f8c){var L96=p5S;L96+=v1H;a+=button(j,render(j),L96);}a+=V6S;a+=I0S + className + r2H + className + a96;var start=range !== D8H?range:Math[T96](val / f8c) * f8c;a+=Z6S;for(j=start + s8c;j < start + f8c;j++){a+=button(j,render(j));}a+=f96;span=t8c;}container[d6S]()[D5r](s0S + className + M96 + Y96 + span + I2H + i18n[unit] + h96 + I6S + a + x96 + m0S);},_optionsTitle:function(){var c0S="_ra";var t0S="ths";var p0S="mon";var a0S="yea";var M0S="yearRange";var f0S="tFullYear";var T0S="rRa";var L0S="_o";var Y0S="_range";var F5c=c0S;F5c+=A5H;F5c+=v4H;F5c+=m9c;var i5c=p0S;i5c+=t0S;var P5c=p0S;P5c+=M9c;P5c+=C3H;var H96=L0S;H96+=l5H;H96+=V3H;H96+=c9c;var U96=a0S;U96+=T0S;U96+=m5S;var C96=v1H;C96+=f0S;var j96=v1H;j96+=f0S;var o96=W5S;o96+=C9c;o96+=X6H;var d96=J2h;d96+=A5H;var i18n=this[X4H][d96];var min=this[X4H][o96];var max=this[X4H][V8t];var minYear=min?min[X3S]():D8H;var maxYear=max?max[j96]():D8H;var i=minYear !== D8H?minYear:new Date()[X3S]() - this[X4H][M0S];var j=maxYear !== D8H?maxYear:new Date()[C96]() + this[X4H][U96];this[H96](P5c,this[Y0S](I8c,M8c),i18n[i5c]);this[h0S](x0S,this[F5c](i,j));},_pad:function(i){var d0S='0';return i < f8c?d0S + i:i;},_position:function(){var J4S="eight";var O4S="ntal";var D4S="terH";var C0S="scr";var o0S="idth";var k4S="eClass";var i4S="Width";var F4S="arts";var U0S="oll";var H0S="Top";var b4S="rizo";var j0S="eft";var P4S="out";var u4S="rizont";var A4S='top';var Q5c=E6H;Q5c+=o0S;var q5c=s9c;q5c+=j0S;var w5c=C0S;w5c+=U0S;w5c+=H0S;var E5c=P4S;E5c+=l1H;E5c+=i4S;var B5c=D4H;B5c+=I8h;var A5c=k2H;A5c+=P5H;var k5c=r9c;k5c+=s3H;k5c+=M9c;k5c+=m9c;var O5c=l5H;O5c+=F4S;var b5c=L3H;b5c+=a3H;b5c+=D4S;b5c+=J4S;var l5c=r9c;l5c+=J5r;var u5c=L3H;u5c+=n8r;u5c+=q5H;u5c+=M9c;var J5c=H9c;J5c+=A5H;J5c+=l5H;J5c+=m9H;var D5c=r9c;D5c+=L3H;D5c+=K3H;var offset=this[D5c][J5c][u5c]();var container=this[k8H][f8H];var inputHeight=this[l5c][L2H][b5c]();if(this[c9c][O5c][k5c] && this[c9c][z9t][A5c] && $(window)[M7r]() > X9c){var z5c=x9H;z5c+=u4S;z5c+=A5r;var K5c=X9H;K5c+=l4S;K5c+=C1H;K5c+=q8H;container[K5c](z5c);}else {var X5c=x9H;X5c+=b4S;X5c+=O4S;var R5c=s6t;R5c+=k4S;container[R5c](X5c);}container[b8H]({top:offset[h7r] + inputHeight,left:offset[B5c]})[y4r](c0r);var calHeight=container[P4r]();var calWidth=container[E5c]();var scrollTop=$(window)[w5c]();if(offset[h7r] + inputHeight + calHeight - scrollTop > $(window)[a7r]()){var newTop=offset[h7r] - calHeight;container[b8H](A4S,newTop < I8c?I8c:newTop);}if(calWidth + offset[q5c] > $(window)[Q5c]()){var N5c=s9c;N5c+=m9c;N5c+=N3H;N5c+=M9c;var S5c=X4H;S5c+=c9c;S5c+=c9c;var newLeft=$(window)[M7r]() - calWidth;container[S5c](N5c,newLeft < I8c?I8c:newLeft);}},_range:function(start,end,inc){var a=[];D59.f59();if(!inc){inc=s8c;}for(var i=start;i <= end;i+=inc){var n5c=l5H;n5c+=a3H;n5c+=c9c;n5c+=C3H;a[n5c](i);}return a;},_setCalander:function(){var K4S="calendar";var z4S="_htmlMonth";var y5c=k9H;y5c+=x5h;y5c+=y6H;if(this[c9c][y5c]){var V5c=V0H;V5c+=l8H;V5c+=y6H;var Z5c=N3S;Z5c+=v6h;var W5c=g7r;W5c+=p4r;var G5c=o8r;G5c+=l5H;G5c+=g6H;var v5c=r9c;v5c+=L3H;v5c+=K3H;this[v5c][K4S][G5c]()[D5r](this[z4S](this[c9c][W5c][Z5c](),this[c9c][V5c][v5S]()));}},_setTitle:function(){var q4S="onSe";var w4S="_opti";var R4S="Ful";var E4S="nSe";var X4S="lYear";D59.f59();var B4S="_op";var s5c=A6S;s5c+=R4S;s5c+=X4S;var I5c=r9c;I5c+=H9c;I5c+=W4H;var g5c=B4S;g5c+=b9r;g5c+=E4S;g5c+=M9c;var r5c=K3H;r5c+=L3H;r5c+=G7r;r5c+=C3H;var e5c=w4S;e5c+=q4S;e5c+=M9c;this[e5c](r5c,this[c9c][o9H][v5S]());this[g5c](x0S,this[c9c][I5c][s5c]());},_setTime:function(){var Z4S="getUTCHou";var N4S="econd";var n4S="_opt";var G4S="ours12";var I4S="hoursAvailable";var Q4S="seco";var S4S="tS";var W4S="optionsTi";var s4S="getUTCMinutes";var v4S="minut";var y4S="ionsTime";var d5c=Q4S;d5c+=A5H;d5c+=E5r;var x5c=v1H;x5c+=S4S;x5c+=N4S;x5c+=c9c;var h5c=q5H;h5c+=o8H;h5c+=A5H;h5c+=E5r;var Y5c=n4S;Y5c+=y4S;var M5c=v4S;M5c+=R9H;var f5c=h0S;f5c+=c3H;f5c+=p8t;var T5c=C3H;T5c+=G4S;var a5c=M2h;a5c+=d5H;a5c+=M9c;a5c+=c9c;var L5c=i3H;L5c+=W4S;L5c+=K3H;L5c+=m9c;var m5c=Z4S;m5c+=g7h;var that=this;var d=this[c9c][r9c];var hours=d?d[m5c]():I8c;var allowed=function(prop){var r4S="Avai";var g4S='Available';var V4S="Incr";var e4S="ment";var t5c=V4S;t5c+=m9c;t5c+=e4S;var p5c=i3H;p5c+=p5S;p5c+=v1H;var c5c=r4S;c5c+=C1H;c5c+=D3H;c5c+=D4H;return that[X4H][prop + g4S]?that[X4H][prop + c5c]:that[p5c](I8c,b9c,that[X4H][prop + t5c]);};this[L5c](f5S,this[c9c][a5c][T5c]?Y8c:C8c,hours,this[X4H][I4S]);this[f5c](g5S,O9c,d?d[s4S]():I8c,allowed(M5c),this[c9c][c5S]);this[Y5c](h5c,O9c,d?d[x5c]():I8c,allowed(d5c),this[c9c][t5S]);},_show:function(){var m4S="scro";var a4S="_h";var L4S=' resize.';var c4S="ll.";var t4S="_position";var p4S="div.DTE_Body_C";var P3c=L3H;P3c+=A5H;D59.f59();var H5c=L3H;H5c+=A5H;var C5c=m4S;C5c+=c4S;var j5c=L3H;j5c+=A5H;var o5c=p4S;o5c+=G8H;o5c+=J5H;o5c+=G7r;var that=this;var namespace=this[c9c][E4h];this[t4S]();$(window)[G8H](r3S + namespace + L4S + namespace,function(){that[d4r]();});$(o5c)[j5c](C5c + namespace,function(){D59.S59();var T4S="ide";var U5c=a4S;U5c+=T4S;that[U5c]();});$(e3S)[H5c](r3S + namespace,function(){that[d4r]();});$(document)[P3c](V3S + namespace,function(e){var T8c=9;var M4S="Code";var F3c=f4S;F3c+=i7t;F3c+=i4H;var i3c=V7t;i3c+=y6H;i3c+=M4S;if(e[i3c] === T8c || e[F3c] === H8c || e[w9r] === h8c){var D3c=a4S;D3c+=H9c;D3c+=i4H;that[D3c]();}});setTimeout(function(){D59.f59();var J3c=y3S;J3c+=X4H;J3c+=i1H;J3c+=f5h;$(c0r)[G8H](J3c + namespace,function(e){var Y4S="filt";var h4S="tar";var k3c=r9c;k3c+=L3H;k3c+=K3H;var O3c=r9c;O3c+=L3H;O3c+=K3H;var b3c=Y4S;b3c+=m9c;b3c+=d5H;var l3c=M2h;l3c+=M2r;l3c+=k3r;var u3c=h4S;u3c+=p8r;var parents=$(e[u3c])[l3c]();if(!parents[b3c](that[O3c][f8H])[o7H] && e[n0r] !== that[k3c][L2H][I8c]){that[d4r]();}});},f8c);},_writeOutput:function(focus){var x4S="momen";var o4S="momentStrict";var E3c=f0H;E3c+=s3H;E3c+=s9c;var B3c=Q6S;B3c+=c3H;B3c+=V2h;B3c+=k6S;var X3c=W3H;X3c+=n2H;var R3c=k3H;R3c+=q2t;var z3c=a3H;z3c+=M9c;z3c+=X4H;var K3c=x4S;K3c+=M9c;var A3c=K3H;A3c+=J5r;A3c+=G6r;A3c+=M9c;var date=this[c9c][r9c];var out=window[A3c]?window[K3c][z3c](date,undefined,this[X4H][d4S],this[X4H][o4S])[R3c](this[X4H][X3c]):date[b3S]() + E0h + this[n3S](date[v5S]() + s8c) + E0h + this[n3S](date[B3c]());this[k8H][L2H][E3c](out);D59.S59();if(focus){var w3c=W5H;w3c+=l5H;w3c+=m9H;this[k8H][w3c][Y6H]();}}});Editor[q3c][Q3c]=I8c;Editor[S3c][o3r]={classPrefix:N3c,disableDays:D8H,firstDay:s8c,format:n3c,hoursAvailable:D8H,i18n:Editor[o3r][T3r][y3c],maxDate:D8H,minDate:D8H,minutesAvailable:D8H,minutesIncrement:s8c,momentStrict:C7H,momentLocale:j4S,onChange:function(){},secondsAvailable:D8H,secondsIncrement:s8c,showWeekNumber:j7H,yearRange:f8c};(function(){var C4S="dM";var F2S="placeholder";var F8S="_inp";var s2S="tor_v";var W2S="_editor_val";var B9S="_closeFn";var t1S='text';var V1S="_val";var X1S="_enabled";var l1S="fin";var i7S="Ty";var W1S="prop";var e2S="checkbox";var d2S="ipOpts";var c8S="datepicke";var H2S='input:checked';var R2S="_addOptions";var h8S="datepicker";var A8S="na";var M2S='<label for="';var H4S="passw";var n9S="_pi";var b9S="_picker";var n1S="hange";var f2S='_';var u8S='input';var G1S="_input";var e1S="readonly";var F7S="dTypes";var J8S="checked";var Q1S='div.clearValue button';var r1S="_inpu";var j1S="safeId";var U7S="los";var L9S=" file";var S8S="cked";var S2S="opti";var X7S="tr";var d1S="textarea";var B7S="_en";var U4S="etime";var l2S="optionsPair";var Z1S="_v";var D7S="_i";var C9S="_container";var v2S="separator";var P7S="idde";var s2c=b7h;s2c+=C4S;s2c+=r4t;var J2c=a3H;J2c+=V5r;J2c+=L7h;J2c+=r9c;var Q1c=f9c;Q1c+=M9c;Q1c+=m9c;Q1c+=I3H;var q1c=l9h;q1c+=U4S;var c7c=f9c;c7c+=b1h;c7c+=r9c;var m7c=r9c;m7c+=s3H;m7c+=J5H;var t4c=m9c;t4c+=P2H;t4c+=b1h;t4c+=r9c;var p4c=d5H;p4c+=s3H;p4c+=V0H;p4c+=L3H;var E0c=m9c;E0c+=P2H;E0c+=b1h;E0c+=r9c;var z0c=k5H;z0c+=m9c;z0c+=A5H;z0c+=r9c;var u0c=m9c;u0c+=P2H;u0c+=Q4h;var J0c=H4S;J0c+=N3h;J0c+=r9c;var C6c=m9c;C6c+=f2h;C6c+=G6r;C6c+=r9c;var a6c=C3H;a6c+=P7S;a6c+=A5H;var c6c=o1r;c6c+=i7S;c6c+=l5H;c6c+=m9c;var m6c=m9c;m6c+=f2h;m6c+=G6r;m6c+=r9c;var v3c=N3H;v3c+=g9r;v3c+=F7S;var fieldTypes=Editor[v3c];function _buttonText(conf,text){var J7S="Ch";var l7S="uploadText";var u7S="oose file...";var b7S='div.upload button';D59.f59();var V3c=C0r;V3c+=K3H;V3c+=s9c;var Z3c=I9c;Z3c+=I3H;var W3c=D7S;W3c+=A5H;W3c+=W9t;W3c+=M9c;if(text === D8H || text === undefined){var G3c=J7S;G3c+=u7S;text=conf[l7S] || G3c;}conf[W3c][Z3c](b7S)[V3c](text);}function _commonUpload(editor,conf,dropCallback,multiple){var w7S="lass=\"cell\">";var m7S="ss=";var Z7S="cond\">";var j7S="type=f";var G7S="ass=\"ro";var H7S="rag";var x7S='input[type=file]';var u1S="div.dr";var Q7S="drop\">";var k1S='drop';var v7S="de\">";var z7S="Fil";var F1S="ragexit";var L7S="buttonInterna";var J1S="drop a file here to upload";var b1S="dragDropText";var d7S="ttr";var n7S="<div class=\"c";var C7S="ile]";var f7S='multiple';var e7S="n class=\"";var W7S="w se";var a7S='<div class="editor_upload">';var S7S="<spa";var B1S='over';var P1S="draglea";var O1S='div.drop';var V7S="<butto";var R7S="eR";var r7S=" /";var i1S="ve d";var w1S='dragover.DTE_Upload drop.DTE_Upload';var N7S="n/></div>";var s7S="load limitHide\">";var Y7S='<div class="cell clearValue">';var M7S='/>';var E7S="/di";var t7S="s=\"eu_table\">";var I7S="<div class=\"cell up";var y7S="ell limitHi";var k7S="file]";var q1S="v.rendered";var h7S='<div class="rendered"/>';var T7S='<input type="file" ';D59.f59();var o7S="nput[";var K7S="Dro";var O7S="input[type=";var q7S="<div class=\"";var D1S="Drag and ";var g7S="<button cl";var A7S="drag";var c7S="\"row\">";var p7S=" clas";var V6c=L3H;V6c+=A5H;var Z6c=O7S;Z6c+=k7S;var W6c=N3H;W6c+=H9c;W6c+=I3H;var n6c=N3H;n6c+=H9c;n6c+=A5H;n6c+=r9c;var i6c=A7S;i6c+=K7S;i6c+=l5H;var P6c=z7S;P6c+=R7S;P6c+=o0h;var j3c=s3H;j3c+=M9c;j3c+=X7S;var h3c=B7S;h3c+=s3H;h3c+=A9H;var Y3c=i3H;Y3c+=H9c;Y3c+=A5H;Y3c+=d5S;var M3c=X1H;M3c+=E7S;M3c+=M1H;var f3c=j2r;f3c+=w7S;var T3c=s1H;T3c+=V0H;T3c+=f0H;T3c+=S1H;var a3c=q7S;a3c+=Q7S;a3c+=S7S;a3c+=N7S;var L3c=n7S;L3c+=y7S;L3c+=v7S;var t3c=g0r;t3c+=G7S;t3c+=W7S;t3c+=Z7S;var p3c=e7H;p3c+=A7H;p3c+=l6h;p3c+=S1H;var c3c=V7S;c3c+=e7S;var m3c=e7H;m3c+=r7S;m3c+=S1H;var s3c=g7S;s3c+=f1H;var I3c=I7S;I3c+=s7S;var g3c=x1H;g3c+=D9r;g3c+=m7S;g3c+=c7S;var r3c=Z1h;r3c+=p7S;r3c+=t7S;var e3c=L7S;e3c+=s9c;var btnClass=editor[b9H][W3H][e3c];var container=$(a7S + r3c + g3c + I3c + s3c + btnClass + m3c + T7S + (multiple?f7S:B7H) + M7S + d2H + Y7S + c3c + btnClass + p3c + d2H + d2H + t3c + L3c + a3c + T3c + f3c + h7S + M3c + d2H + d2H + d2H);conf[Y3c]=container;conf[h3c]=C7H;if(conf[E2H]){var o3c=H9c;o3c+=r9c;var d3c=v0H;d3c+=G0H;var x3c=N3H;x3c+=H9c;x3c+=A5H;x3c+=r9c;container[x3c](x7S)[k7t](c6t,Editor[d3c](conf[o3c]));}if(conf[j3c]){var H3c=s3H;H3c+=d7S;var U3c=s3H;U3c+=M9c;U3c+=M9c;U3c+=d5H;var C3c=H9c;C3c+=o7S;C3c+=j7S;C3c+=C7S;container[r5h](C3c)[U3c](conf[H3c]);}_buttonText(conf);if(window[P6c] && conf[i6c] !== j7H){var q6c=X4H;q6c+=U7S;q6c+=m9c;var w6c=L3H;w6c+=A5H;var E6c=L3H;E6c+=l5H;E6c+=G6r;var R6c=r9c;R6c+=H7S;R6c+=S4r;R6c+=d5H;var z6c=L3H;z6c+=A5H;var K6c=P1S;K6c+=i1S;K6c+=F1S;var A6c=L3H;A6c+=A5H;var u6c=L3H;u6c+=A5H;var J6c=D1S;J6c+=J1S;var D6c=u1S;D6c+=S2H;D6c+=A7H;D6c+=A0S;var F6c=l1S;F6c+=r9c;container[F6c](D6c)[A9r](conf[b1S] || J6c);var dragDrop=container[r5h](O1S);dragDrop[u6c](k1S,function(e){var A1S="veCl";var R1S="dataTransfer";var z1S="nal";var K1S="origi";var l6c=B7S;l6c+=J9H;if(conf[l6c]){var k6c=L3H;k6c+=F3r;k6c+=d5H;var O6c=D2h;O6c+=A1S;O6c+=s3H;O6c+=q8H;var b6c=K1S;b6c+=z1S;b6c+=S9h;Editor[Z4h](editor,conf,e[b6c][R1S][p7H],_buttonText,dropCallback);dragDrop[O6c](k6c);}return j7H;})[A6c](K6c,function(e){D59.f59();if(conf[X1S]){dragDrop[N9H](B1S);}return j7H;})[z6c](R6c,function(e){var E1S="nable";var X6c=l3h;X6c+=E1S;X6c+=r9c;if(conf[X6c]){var B6c=X9H;B6c+=l4S;B6c+=s9c;B6c+=E9H;dragDrop[B6c](B1S);}return j7H;});editor[G8H](E6c,function(){D59.S59();$(c0r)[G8H](w1S,function(e){D59.f59();return j7H;});})[w6c](q6c,function(){D59.S59();$(c0r)[Q6h](w1S);});}else {var N6c=V0H;N6c+=q1S;var S6c=C0H;S6c+=K7S;S6c+=l5H;var Q6c=s3H;Q6c+=M8r;Q6c+=N3r;container[Q6c](S6c);container[D5r](container[r5h](N6c));}container[n6c](Q1S)[G8H](B8H,function(e){var N1S="pes";var S1S="fieldTy";var y6c=B7S;y6c+=J9H;e[q9r]();if(conf[y6c]){var G6c=a3H;G6c+=l5H;G6c+=s9c;G6c+=s4h;var v6c=S1S;v6c+=N1S;Editor[v6c][G6c][Z7r][E9r](editor,conf,B7H);}});container[W6c](Z6c)[V6c](z5h,function(){var e6c=N3H;e6c+=H9c;D59.f59();e6c+=D4H;e6c+=c9c;Editor[Z4h](editor,conf,this[e6c],_buttonText,function(ids){D59.f59();var g6c=f0H;g6c+=s3H;g6c+=s9c;var r6c=I9c;r6c+=A5H;r6c+=r9c;dropCallback[E9r](editor,ids);container[r6c](x7S)[g6c](B7H);});});return container;}function _triggerChange(input){setTimeout(function(){D59.f59();var v1S="ger";var y1S="rig";var s6c=X4H;s6c+=n1S;var I6c=M9c;I6c+=y1S;I6c+=v1S;input[I6c](s6c,{editor:C7H,editorSet:C7H});;},I8c);}var baseFieldType=$[m6c](C7H,{},Editor[A8H][c6c],{get:function(conf){D59.f59();return conf[G1S][m5h]();},set:function(conf,val){var p6c=f0H;p6c+=s3H;p6c+=s9c;conf[G1S][p6c](val);_triggerChange(conf[G1S]);},enable:function(conf){D59.f59();conf[G1S][W1S](z5S,j7H);},disable:function(conf){var L6c=r9c;L6c+=B3r;L6c+=J9H;var t6c=i3H;t6c+=W5H;t6c+=l5H;t6c+=m9H;conf[t6c][W1S](L6c,C7H);},canReturnSubmit:function(conf,node){return C7H;}});fieldTypes[a6c]={create:function(conf){var T6c=Z1S;T6c+=A5r;conf[T6c]=conf[W4h];return D8H;},get:function(conf){D59.f59();return conf[V1S];},set:function(conf,val){var f6c=i3H;f6c+=f0H;D59.f59();f6c+=A5r;conf[f6c]=val;}};fieldTypes[e1S]=$[K2H](C7H,{},baseFieldType,{create:function(conf){var c1S="<i";var g1S="read";var I1S="only";var s1S="saf";var m1S="eI";var p1S="nput/>";var j6c=r1S;j6c+=M9c;var o6c=s3H;o6c+=I1r;o6c+=d5H;var d6c=g1S;d6c+=I1S;var x6c=s1S;x6c+=m1S;x6c+=r9c;var h6c=f9c;h6c+=M9c;h6c+=m4r;var Y6c=s3H;Y6c+=M9c;Y6c+=M9c;Y6c+=d5H;var M6c=c1S;D59.f59();M6c+=p1S;conf[G1S]=$(M6c)[Y6c]($[h6c]({id:Editor[x6c](conf[E2H]),type:t1S,readonly:d6c},conf[o6c] || ({})));return conf[j6c][I8c];}});fieldTypes[A9r]=$[C6c](C7H,{},baseFieldType,{create:function(conf){var a1S="af";var L1S="tex";var T1S="eId";var f1S="<input";var D0c=L1S;D0c+=M9c;var F0c=H9c;F0c+=r9c;var i0c=c9c;i0c+=a1S;i0c+=T1S;var P0c=m9c;P0c+=b1t;P0c+=A5H;P0c+=r9c;var H6c=b9t;H6c+=d5H;var U6c=f1S;U6c+=r2t;conf[G1S]=$(U6c)[H6c]($[P0c]({id:Editor[i0c](conf[F0c]),type:D0c},conf[k7t] || ({})));D59.f59();return conf[G1S][I8c];}});fieldTypes[J0c]=$[u0c](C7H,{},baseFieldType,{create:function(conf){var Y1S="swo";var h1S="fe";var M1S="pas";var x1S='<input/>';var K0c=D7S;K0c+=A5H;K0c+=l5H;K0c+=m9H;var A0c=M1S;A0c+=Y1S;A0c+=d5H;A0c+=r9c;var k0c=H9c;k0c+=r9c;var O0c=v0H;O0c+=h1S;O0c+=q6H;var b0c=u1t;D59.S59();b0c+=A5H;b0c+=r9c;var l0c=i3H;l0c+=W5H;l0c+=W9t;l0c+=M9c;conf[l0c]=$(x1S)[k7t]($[b0c]({id:Editor[O0c](conf[k0c]),type:A0c},conf[k7t] || ({})));return conf[K0c][I8c];}});fieldTypes[d1S]=$[z0c](C7H,{},baseFieldType,{create:function(conf){var o1S='<textarea/>';var B0c=D7S;B0c+=A5H;B0c+=W9t;B0c+=M9c;var X0c=s3H;X0c+=M9c;X0c+=M9c;X0c+=d5H;var R0c=H9c;R0c+=r9c;conf[G1S]=$(o1S)[k7t]($[K2H]({id:Editor[j1S](conf[R0c])},conf[X0c] || ({})));return conf[B0c][I8c];},canReturnSubmit:function(conf,node){return j7H;}});fieldTypes[I1t]=$[E0c](C7H,{},baseFieldType,{_addOptions:function(conf,opts,append){var D2S="Disabled";var P2S="placeho";var u2S="hidden";var U1S="dito";var H1S="r_v";var C1S="holde";var J2S="placeholderValue";var i2S="lderDisabl";var w0c=S2H;w0c+=M9c;w0c+=j4h;w0c+=Q4H;var elOpts=conf[G1S][I8c][w0c];var countOffset=I8c;if(!append){var q0c=x5h;q0c+=D0H;q0c+=C1S;q0c+=d5H;elOpts[o7H]=I8c;if(conf[q0c] !== undefined){var N0c=l3h;N0c+=U1S;N0c+=H1S;N0c+=A5r;var S0c=P2S;S0c+=i2S;S0c+=a9c;var Q0c=F2S;Q0c+=D2S;var placeholderValue=conf[J2S] !== undefined?conf[J2S]:B7H;countOffset+=s8c;elOpts[I8c]=new Option(conf[F2S],placeholderValue);var disabled=conf[Q0c] !== undefined?conf[S0c]:C7H;elOpts[I8c][u2S]=disabled;elOpts[I8c][n8H]=disabled;elOpts[I8c][N0c]=placeholderValue;}}else {countOffset=elOpts[o7H];}if(opts){Editor[N4h](opts,conf[l2S],function(val,label,i,attr){var b2S="r_va";var n0c=l3h;n0c+=U1S;n0c+=b2S;n0c+=s9c;var option=new Option(label,val);option[n0c]=val;D59.S59();if(attr){var y0c=n2H;y0c+=X7S;$(option)[y0c](attr);}elOpts[i + countOffset]=option;});}},create:function(conf){var O2S="Opts";var k2S='<select/>';var A2S='change.dte';var m0c=H9c;D59.S59();m0c+=l5H;m0c+=O2S;var s0c=S2H;s0c+=U9r;var V0c=L3H;V0c+=A5H;var Z0c=b9t;Z0c+=d5H;var W0c=W8H;W0c+=s9c;W0c+=k2H;W0c+=u8h;var G0c=m9c;G0c+=f2h;G0c+=G6r;G0c+=r9c;var v0c=i3H;v0c+=s9H;v0c+=m9H;conf[v0c]=$(k2S)[k7t]($[G0c]({id:Editor[j1S](conf[E2H]),multiple:conf[W0c] === C7H},conf[Z0c] || ({})))[V0c](A2S,function(e,d){var K2S="ec";var z2S="astSe";var e0c=O3h;e0c+=L3H;D59.S59();e0c+=d5H;if(!d || !d[e0c]){var I0c=v4H;I0c+=m9c;I0c+=M9c;var g0c=q5H;g0c+=s9c;g0c+=K2S;g0c+=M9c;var r0c=i3H;r0c+=s9c;r0c+=z2S;r0c+=M9c;conf[r0c]=fieldTypes[g0c][I0c](conf);}});fieldTypes[I1t][R2S](conf,conf[s0c] || conf[m0c]);return conf[G1S][I8c];},update:function(conf,options,append){D59.S59();var X2S="astSet";var B2S="dOptio";var p0c=g4h;p0c+=X2S;var c0c=s2r;c0c+=r9c;c0c+=B2S;c0c+=Q4H;fieldTypes[I1t][c0c](conf,options,append);var lastSet=conf[p0c];if(lastSet !== undefined){var t0c=q5H;t0c+=D4H;t0c+=X4H;t0c+=M9c;fieldTypes[t0c][Z7r](conf,lastSet,C7H);}_triggerChange(conf[G1S]);},get:function(conf){var w2S="multiple";var q2S="parator";var Q2S="ato";var Y0c=D4H;Y0c+=f0h;Y0c+=c3r;var T0c=U6H;T0c+=V3t;var L0c=i3H;L0c+=L2H;var val=conf[L0c][r5h](P0S)[H5h](function(){var E2S="itor_";var a0c=i3H;a0c+=a9c;a0c+=E2S;a0c+=m5h;return this[a0c];})[T0c]();if(conf[w2S]){var M0c=q5H;M0c+=q2S;var f0c=q5H;f0c+=n6h;f0c+=Q2S;f0c+=d5H;return conf[f0c]?val[G2h](conf[M0c]):val;}return val[Y0c]?val[I8c]:D8H;},set:function(conf,val,localUpdate){var Z2S="selected";var G2S='option';var N2S="separat";var y2S="_lastSet";var n2S="tipl";var P4c=x8H;P4c+=v4H;P4c+=M9c;P4c+=C3H;var H0c=W8H;H0c+=H3H;H0c+=u8h;var U0c=S2S;U0c+=G8H;var C0c=s9c;C0c+=t1t;var j0c=k5h;j0c+=y6H;var x0c=N2S;x0c+=N3h;var h0c=W8H;h0c+=s9c;h0c+=n2S;h0c+=m9c;if(!localUpdate){conf[y2S]=val;}if(conf[h0c] && conf[x0c] && !$[M1r](val)){var o0c=b4H;o0c+=s9c;o0c+=H9c;o0c+=M9c;var d0c=d9H;d0c+=d5H;d0c+=H9c;d0c+=f0h;val=typeof val === d0c?val[o0c](conf[v2S]):[];}else if(!$[j0c](val)){val=[val];}var i,len=val[C0c],found,allFound=j7H;var options=conf[G1S][r5h](G2S);conf[G1S][r5h](U0c)[m7H](function(){found=j7H;for(i=I8c;i < len;i++){if(this[W2S] == val[i]){found=C7H;allFound=C7H;break;}}this[Z2S]=found;});if(conf[F2S] && !allFound && !conf[H0c] && options[P4c]){options[I8c][Z2S]=C7H;}if(!localUpdate){var i4c=S2t;i4c+=d5S;_triggerChange(conf[i4c]);}return allFound;},destroy:function(conf){var V2S="change.dt";var D4c=V2S;D4c+=m9c;D59.f59();var F4c=D7S;F4c+=A5H;F4c+=d5S;conf[F4c][Q6h](D4c);}});fieldTypes[e2S]=$[K2H](C7H,{},baseFieldType,{_addOptions:function(conf,opts,append){var g2S="air";var r2S="optionsP";var val,label;var jqInput=conf[G1S];var offset=I8c;if(!append){jqInput[d6S]();}else {var J4c=W5H;J4c+=W9t;J4c+=M9c;offset=$(J4c,jqInput)[o7H];}if(opts){var u4c=r2S;u4c+=g2S;Editor[N4h](opts,conf[u4c],function(val,label,i,attr){var a2S='<div>';var m2S="last";var T2S='<input id="';var I2S="_ed";var c2S="</l";var Y2S='input:last';var L2S="kbox\" /";var t2S=" type=\"chec";var p2S="abel>";var z4c=I2S;z4c+=H9c;z4c+=s2S;z4c+=A5r;var K4c=f0H;K4c+=A5r;K4c+=Z9H;var A4c=s3H;A4c+=M9c;A4c+=M9c;D59.f59();A4c+=d5H;var k4c=L2H;k4c+=g9h;k4c+=m2S;var O4c=k6r;O4c+=f0H;O4c+=S1H;var b4c=c2S;b4c+=p2S;var l4c=e7H;l4c+=t2S;l4c+=L2S;l4c+=S1H;jqInput[D5r](a2S + T2S + Editor[j1S](conf[E2H]) + f2S + (i + offset) + l4c + M2S + Editor[j1S](conf[E2H]) + f2S + (i + offset) + I2H + label + b4c + O4c);$(k4c,jqInput)[A4c](K4c,val)[I8c][z4c]=val;if(attr){var R4c=b9t;R4c+=d5H;$(Y2S,jqInput)[R4c](attr);}});}},create:function(conf){var h2S="_addOp";var x2S="kbox";var w4c=N5r;w4c+=H9c;w4c+=l3H;var E4c=h2S;E4c+=M9c;E4c+=W2r;var B4c=X4H;B4c+=j0r;B4c+=X4H;B4c+=x2S;var X4c=x1H;X4c+=l6h;X4c+=S1H;conf[G1S]=$(X4c);fieldTypes[B4c][E4c](conf,conf[w4c] || conf[d2S]);return conf[G1S][I8c];},get:function(conf){var j2S="tor";D59.f59();var U2S="tedValue";var C2S="unselec";var o2S="separa";var P8S="unselectedValue";var v4c=K0h;v4c+=L3H;v4c+=H9c;v4c+=A5H;var y4c=o2S;y4c+=j2S;var n4c=C2S;n4c+=U2S;var q4c=N3H;q4c+=M6r;var out=[];var selected=conf[G1S][q4c](H2S);if(selected[o7H]){var Q4c=m9c;Q4c+=s3H;Q4c+=X4H;Q4c+=C3H;selected[Q4c](function(){var N4c=i3H;N4c+=I2h;N4c+=s2S;N4c+=A5r;var S4c=W9t;S4c+=a7h;out[S4c](this[N4c]);});}else if(conf[n4c] !== undefined){out[c7H](conf[P8S]);}return conf[v2S] === undefined || conf[y4c] === D8H?out:out[v4c](conf[v2S]);},set:function(conf,val){var D8S='|';var i8S="sArra";var Z4c=H9c;Z4c+=i8S;Z4c+=y6H;var W4c=s9H;W4c+=m9H;var G4c=F8S;G4c+=a3H;G4c+=M9c;var jqInputs=conf[G4c][r5h](W4c);if(!$[Z4c](val) && typeof val === r5r){var V4c=b4H;V4c+=U2h;val=val[V4c](conf[v2S] || D8S);}else if(!$[M1r](val)){val=[val];}var i,len=val[o7H],found;jqInputs[m7H](function(){found=j7H;for(i=I8c;i < len;i++){if(this[W2S] == val[i]){found=C7H;break;}}this[J8S]=found;});D59.S59();_triggerChange(jqInputs);},enable:function(conf){D59.f59();var g4c=k9H;g4c+=J9H;var r4c=V6H;r4c+=S2H;var e4c=N3H;e4c+=H9c;e4c+=A5H;e4c+=r9c;conf[G1S][e4c](u8S)[r4c](g4c,j7H);},disable:function(conf){var l8S="disabl";var s4c=l8S;s4c+=m9c;s4c+=r9c;var I4c=l5H;I4c+=d5H;I4c+=L3H;D59.f59();I4c+=l5H;conf[G1S][r5h](u8S)[I4c](s4c,C7H);},update:function(conf,options,append){var b8S="eckbox";var c4c=v4H;c4c+=m9c;c4c+=M9c;var m4c=v3H;m4c+=b8S;var checkbox=fieldTypes[m4c];var currVal=checkbox[c4c](conf);checkbox[R2S](conf,options,append);checkbox[Z7r](conf,currVal);}});fieldTypes[p4c]=$[t4c](C7H,{},baseFieldType,{_addOptions:function(conf,opts,append){var L4c=S2t;L4c+=d5S;var val,label;var jqInput=conf[L4c];var offset=I8c;if(!append){jqInput[d6S]();}else {var a4c=c9H;a4c+=M9c;offset=$(a4c,jqInput)[o7H];}if(opts){var T4c=l5H;T4c+=u0h;T4c+=g7h;Editor[T4c](opts,conf[l2S],function(val,label,i,attr){var z8S="type=\"radio\" name=\"";var K8S="\" ";var B8S="ut:last";var R8S="afe";var X8S="<input id=";var O8S="tor_val";var k8S=":last";var P7c=l3h;P7c+=r9c;P7c+=H9c;P7c+=O8S;D59.f59();var H4c=m5h;H4c+=Z9H;var U4c=s3H;U4c+=M9c;U4c+=X7S;var C4c=H9c;C4c+=Q9t;C4c+=m9H;C4c+=k8S;var j4c=s1H;j4c+=c2H;j4c+=S1H;var o4c=H9c;o4c+=r9c;var d4c=e7H;d4c+=A7H;d4c+=l6h;d4c+=S1H;var x4c=A8S;x4c+=K3H;x4c+=m9c;var h4c=K8S;h4c+=z8S;var Y4c=c9c;Y4c+=R8S;Y4c+=h1H;Y4c+=r9c;var M4c=X8S;M4c+=e7H;var f4c=X1H;f4c+=A6r;jqInput[D5r](f4c + M4c + Editor[Y4c](conf[E2H]) + f2S + (i + offset) + h4c + conf[x4c] + d4c + M2S + Editor[j1S](conf[o4c]) + f2S + (i + offset) + I2H + label + j4c + d2H);$(C4c,jqInput)[U4c](H4c,val)[I8c][P7c]=val;if(attr){var i7c=s9H;i7c+=B8S;$(i7c,jqInput)[k7t](attr);}});}},create:function(conf){var w8S="radio";D59.S59();var E8S="iv /";var q8S='open';var k7c=i3H;k7c+=W5H;k7c+=W9t;k7c+=M9c;var J7c=S2S;J7c+=L3H;J7c+=A5H;J7c+=c9c;var D7c=l6r;D7c+=E8S;D7c+=S1H;var F7c=r1S;F7c+=M9c;conf[F7c]=$(D7c);fieldTypes[w8S][R2S](conf,conf[J7c] || conf[d2S]);this[G8H](q8S,function(){var b7c=B3h;b7c+=C3H;var l7c=H9c;l7c+=A5H;l7c+=d5S;var u7c=N3H;D59.f59();u7c+=H9c;u7c+=A5H;u7c+=r9c;conf[G1S][u7c](l7c)[b7c](function(){var Q8S="reC";var O7c=t0h;O7c+=Q8S;O7c+=j0r;O7c+=S8S;if(this[O7c]){this[J8S]=C7H;}});});return conf[k7c][I8c];},get:function(conf){var N8S="ditor_val";var K7c=l3h;K7c+=N8S;var A7c=D7S;A7c+=O9t;var el=conf[A7c][r5h](H2S);return el[o7H]?el[I8c][K7c]:undefined;},set:function(conf,val){var y8S="che";D59.f59();var n8S="nput:";var S7c=H9c;S7c+=n8S;S7c+=y8S;S7c+=S8S;var Q7c=N3H;Q7c+=H9c;Q7c+=I3H;var q7c=F8S;q7c+=a3H;q7c+=M9c;var z7c=m9c;z7c+=H7H;z7c+=C3H;var that=this;conf[G1S][r5h](u8S)[z7c](function(){var V8S="_pr";var Z8S="_preChecked";var r8S="hecked";var I8S="ked";var g8S="chec";var W8S="eck";var v8S="_edito";var e8S="eC";var G8S="eChecked";var X7c=v8S;X7c+=d5H;X7c+=Z1S;X7c+=A5r;var R7c=i3H;R7c+=V6H;R7c+=G8S;this[R7c]=j7H;if(this[X7c] == val){var B7c=X4H;B7c+=C3H;B7c+=W8S;B7c+=a9c;this[B7c]=C7H;this[Z8S]=C7H;}else {var w7c=V8S;w7c+=e8S;w7c+=r8S;var E7c=g8S;E7c+=I8S;this[E7c]=j7H;this[w7c]=j7H;}});_triggerChange(conf[q7c][Q7c](S7c));},enable:function(conf){var y7c=k9H;y7c+=s3H;y7c+=X0H;y7c+=a9c;D59.f59();var n7c=l5H;n7c+=d5H;n7c+=L3H;n7c+=l5H;var N7c=N3H;N7c+=W5H;N7c+=r9c;conf[G1S][N7c](u8S)[n7c](y7c,j7H);},disable:function(conf){var W7c=w3H;W7c+=l5H;var G7c=W5H;G7c+=l5H;G7c+=a3H;G7c+=M9c;var v7c=l1S;v7c+=r9c;conf[G1S][v7c](G7c)[W7c](z5S,C7H);},update:function(conf,options,append){var s8S="[va";var m8S="lue=\"";var s7c=V5S;s7c+=s9c;s7c+=a3H;s7c+=m9c;var I7c=s3H;I7c+=M9c;I7c+=M9c;D59.S59();I7c+=d5H;var g7c=m9c;g7c+=r9h;var r7c=s8S;r7c+=m8S;var e7c=N3H;e7c+=d3H;e7c+=X3H;var V7c=v4H;V7c+=m9c;V7c+=M9c;var Z7c=d5H;Z7c+=s3H;Z7c+=V0H;Z7c+=L3H;var radio=fieldTypes[Z7c];var currVal=radio[V7c](conf);radio[R2S](conf,options,append);var inputs=conf[G1S][r5h](u8S);radio[Z7r](conf,inputs[e7c](r7c + currVal + o8h)[o7H]?currVal:inputs[g7c](I8c)[I7c](s7c));}});fieldTypes[m7c]=$[c7c](C7H,{},baseFieldType,{create:function(conf){var a8S="que";var t8S="<in";var p8S="exten";var T8S="ryu";var f8S="RFC_28";var L8S="dateFor";var M8S="22";var Y8S="Format";var l1c=D7S;l1c+=A5H;l1c+=W9t;l1c+=M9c;var M7c=c8S;M7c+=d5H;var f7c=s3H;f7c+=M9c;f7c+=M9c;f7c+=d5H;var T7c=M9c;T7c+=m9c;T7c+=P2H;T7c+=M9c;var a7c=p8S;a7c+=r9c;var L7c=b9t;L7c+=d5H;var t7c=t8S;t7c+=d5S;t7c+=d2r;var p7c=D7S;p7c+=A5H;p7c+=l5H;p7c+=m9H;conf[p7c]=$(t7c)[L7c]($[a7c]({id:Editor[j1S](conf[E2H]),type:T7c},conf[f7c]));if($[M7c]){var h7c=L8S;h7c+=N0H;var Y7c=K0h;Y7c+=a8S;Y7c+=T8S;Y7c+=H9c;conf[G1S][M8H](Y7c);if(!conf[h7c]){var d7c=f8S;d7c+=M8S;var x7c=Y9c;x7c+=Y8S;conf[x7c]=$[h8S][d7c];}setTimeout(function(){var x8S="#ui-datep";var o8S="Ima";var j8S="dateFormat";var d8S="icker-div";var i1c=H9H;i1c+=m9c;var P1c=r9c;P1c+=H9c;P1c+=b4H;P1c+=p4r;var H7c=x8S;H7c+=d8S;var U7c=L3H;U7c+=l5H;U7c+=M9c;U7c+=c9c;var j7c=g5t;j7c+=J5H;j7c+=o8S;j7c+=v1H;var o7c=k5H;o7c+=m9c;o7c+=A5H;o7c+=r9c;$(conf[G1S])[h8S]($[o7c]({dateFormat:conf[j8S],buttonImage:conf[j7c],buttonImageOnly:C7H,onSelect:function(){var C7c=i3H;C7c+=s9H;C7c+=a3H;C7c+=M9c;D59.f59();conf[C7c][Y6H]()[N1r]();}},conf[U7c]));$(H7c)[b8H](P1c,i1c);},f8c);}else {var u1c=g5t;u1c+=M9c;u1c+=m9c;var J1c=M9c;J1c+=o0H;J1c+=m9c;var D1c=s3H;D1c+=M9c;D1c+=M9c;D1c+=d5H;var F1c=i3H;F1c+=c9H;F1c+=M9c;conf[F1c][D1c](J1c,u1c);}return conf[l1c][I8c];},set:function(conf,val){D59.f59();var C8S='hasDatepicker';if($[h8S] && conf[G1S][K9H](C8S)){var k1c=X4H;k1c+=n1S;var O1c=c9c;O1c+=z6H;O1c+=K5H;O1c+=m9c;var b1c=S2t;b1c+=W9t;b1c+=M9c;conf[b1c][h8S](O1c,val)[k1c]();}else {var A1c=f0H;A1c+=s3H;A1c+=s9c;$(conf[G1S])[A1c](val);}},enable:function(conf){D59.S59();if($[h8S]){var K1c=S2t;K1c+=W9t;K1c+=M9c;conf[K1c][h8S](X3h);}else {$(conf[G1S])[W1S](z5S,j7H);}},disable:function(conf){var P9S="disa";var U8S="datepic";var H8S="ker";var z1c=U8S;z1c+=H8S;if($[z1c]){var X1c=P9S;X1c+=n5H;var R1c=c8S;R1c+=d5H;conf[G1S][R1c](X1c);}else {var B1c=F8S;B1c+=m9H;$(conf[B1c])[W1S](z5S,C7H);}},owns:function(conf,node){var i9S='div.ui-datepicker';var F9S='div.ui-datepicker-header';D59.f59();var w1c=D4H;w1c+=f0h;w1c+=c3r;var E1c=n6h;E1c+=A4H;E1c+=c9c;return $(node)[E1c](i9S)[w1c] || $(node)[H8H](F9S)[o7H]?C7H:j7H;}});fieldTypes[q1c]=$[Q1c](C7H,{},baseFieldType,{create:function(conf){var K9S="keyInput";var u9S="safe";var D9S="Fn";var z9S="wn";var J9S="eti";var l9S='<input />';var O9S="displayFormat";var t1c=S2t;t1c+=l5H;t1c+=a3H;t1c+=M9c;var p1c=X4H;p1c+=U7S;p1c+=m9c;var c1c=L3H;c1c+=A5H;var r1c=y8h;r1c+=D9S;var V1c=r9c;V1c+=n2H;V1c+=J9S;V1c+=P5H;var Z1c=N3H;Z1c+=N3h;Z1c+=L0r;Z1c+=M9c;var W1c=S2t;W1c+=l5H;W1c+=a3H;W1c+=M9c;var G1c=K5H;G1c+=m9c;G1c+=c3H;G1c+=p8t;var v1c=n2H;v1c+=M9c;v1c+=d5H;var y1c=H9c;y1c+=r9c;var n1c=u9S;n1c+=h1H;n1c+=r9c;var N1c=s3H;N1c+=M9c;N1c+=M9c;N1c+=d5H;var S1c=F8S;S1c+=m9H;conf[S1c]=$(l9S)[N1c]($[K2H](C7H,{id:Editor[n1c](conf[y1c]),type:t1S},conf[v1c]));conf[b9S]=new Editor[G1c](conf[W1c],$[K2H]({format:conf[O9S] || conf[Z1c],i18n:this[T3r][V1c],onChange:function(){setTimeout(function(){var k9S="gge";D59.f59();var e1c=M9c;e1c+=a8t;e1c+=k9S;e1c+=d5H;conf[G1S][e1c](z5h);},I8c);}},conf[N8H]));conf[r1c]=function(){var A9S="icker";var g1c=i3H;g1c+=l5H;g1c+=A9S;conf[g1c][W3h]();};if(conf[K9S] === j7H){var s1c=f4S;s1c+=U8H;s1c+=z9S;var I1c=L3H;I1c+=A5H;conf[G1S][I1c](s1c,function(e){var R9S="ntDef";var X9S="ault";var m1c=w5h;m1c+=F3r;m1c+=R9S;m1c+=X9S;e[m1c]();});}this[c1c](p1c,conf[B9S]);return conf[t1c][I8c];},get:function(conf){var E9S="eFormat";var w9S="ireFormat";var M1c=E6H;M1c+=T1t;M1c+=E9S;var f1c=x8t;f1c+=a5h;D59.f59();var T1c=k3H;T1c+=d5H;T1c+=K3H;T1c+=n2H;var a1c=E6H;a1c+=w9S;var L1c=f0H;L1c+=s3H;L1c+=s9c;var val=conf[G1S][L1c]();var inst=conf[b9S][X4H];return conf[a1c] && moment?moment(val,inst[T1c],inst[d4S],inst[f1c])[n8t](conf[M1c]):val;},set:function(conf,val){var v9S="wireFormat";var S9S="ntStrict";var y9S="picker";var N9S="wireFo";var q9S="orma";var Q9S="mome";var j1c=N3H;j1c+=q9S;j1c+=M9c;var o1c=Q9S;o1c+=S9S;var d1c=N9S;d1c+=q2t;var x1c=f0H;x1c+=s3H;x1c+=s9c;var h1c=n9S;h1c+=X4H;h1c+=V7t;h1c+=d5H;var Y1c=i3H;Y1c+=y9S;var inst=conf[Y1c][X4H];conf[h1c][x1c](conf[v9S] && moment?moment(val,conf[d1c],inst[d4S],inst[o1c])[n8t](inst[j1c]):val);_triggerChange(conf[G1S]);},owns:function(conf,node){var G9S="cker";var U1c=x5r;D59.S59();U1c+=c9c;var C1c=n9S;C1c+=G9S;return conf[C1c][U1c](node);},errorMessage:function(conf,msg){var W9S="Msg";var H1c=m9c;H1c+=S3h;H1c+=N3h;D59.f59();H1c+=W9S;conf[b9S][H1c](msg);},destroy:function(conf){var Z9S="ick";var i2c=t0h;i2c+=Z9S;i2c+=m9c;i2c+=d5H;var P2c=X4H;P2c+=Z4H;P2c+=q5H;this[Q6h](P2c,conf[B9S]);conf[G1S][Q6h](O5t);conf[i2c][T5h]();},minDate:function(conf,min){D59.f59();var V9S="_picke";var F2c=V9S;F2c+=d5H;conf[F2c][W5S](min);},maxDate:function(conf,max){var D2c=K3H;D2c+=t4h;conf[b9S][D2c](max);}});fieldTypes[J2c]=$[K2H](C7H,{},baseFieldType,{create:function(conf){D59.S59();var editor=this;var container=_commonUpload(editor,conf,function(val){var e9S="Upl";var r9S="plo";var O2c=A8S;O2c+=K3H;O2c+=m9c;var b2c=T4h;b2c+=d9H;b2c+=e9S;b2c+=s4h;var l2c=i3H;l2c+=Q0h;l2c+=G6r;l2c+=M9c;var u2c=a3H;u2c+=r9S;u2c+=X9H;Editor[z2H][u2c][Z7r][E9r](editor,conf,val[I8c]);editor[l2c](b2c,[conf[O2c],val[I8c]]);});return container;},get:function(conf){var k2c=Z1S;k2c+=A5r;return conf[k2c];},set:function(conf,val){var g9S="oad.editor";var c9S='div.rendered';var T9S="<span";var t9S="No";var p9S="_va";var s9S="dler";var I9S="triggerHan";var Y9S='noClear';var f9S="ppend";var a9S="noFileTe";var m9S="learText";var M9S="clearText";var v2c=i3H;v2c+=f0H;v2c+=s3H;v2c+=s9c;var y2c=D7h;y2c+=s9c;y2c+=g9S;var n2c=I9S;n2c+=s9S;var N2c=H9c;N2c+=A5H;N2c+=W9t;N2c+=M9c;var S2c=X4H;S2c+=m9S;var K2c=i3H;K2c+=L2H;var A2c=i3H;D59.f59();A2c+=f0H;A2c+=s3H;A2c+=s9c;conf[A2c]=val;var container=conf[K2c];if(conf[o9H]){var z2c=i3H;z2c+=V5S;z2c+=s9c;var rendered=container[r5h](c9S);if(conf[z2c]){var X2c=p9S;X2c+=s9c;var R2c=C3H;R2c+=M9c;R2c+=K3H;R2c+=s9c;rendered[R2c](conf[o9H](conf[X2c]));}else {var Q2c=g3S;Q2c+=S1H;var q2c=t9S;q2c+=L9S;var w2c=a9S;w2c+=f2h;var E2c=T9S;E2c+=S1H;var B2c=s3H;B2c+=f9S;rendered[d6S]()[B2c](E2c + (conf[w2c] || q2c) + Q2c);}}var button=container[r5h](Q1S);if(val && conf[S2c]){button[F5r](conf[M9S]);container[N9H](Y9S);}else {container[M8H](Y9S);}conf[G1S][r5h](N2c)[n2c](y2c,[conf[v2c]]);},enable:function(conf){var Z2c=B7S;Z2c+=J9H;var W2c=H9c;W2c+=O9t;var G2c=i3H;G2c+=H9c;G2c+=A5H;G2c+=d5S;conf[G2c][r5h](W2c)[W1S](z5S,j7H);conf[Z2c]=C7H;},disable:function(conf){var h9S="_ena";var x9S="isabled";var I2c=h9S;I2c+=A9H;var g2c=r9c;g2c+=x9S;var r2c=l5H;r2c+=b5H;r2c+=l5H;var e2c=c9H;e2c+=M9c;var V2c=D7S;V2c+=A5H;V2c+=W9t;V2c+=M9c;conf[V2c][r5h](e2c)[r2c](g2c,C7H);conf[I2c]=j7H;},canReturnSubmit:function(conf,node){return j7H;}});fieldTypes[s2c]=$[K2H](C7H,{},baseFieldType,{_showHide:function(conf){var j9S="limit";var o9S="tLeft";var d9S="_lim";var U9S='div.limitHide';var M2c=x8H;M2c+=x7H;M2c+=C3H;var f2c=i3H;f2c+=f0H;f2c+=s3H;f2c+=s9c;var T2c=C9H;T2c+=X2r;var a2c=d9S;a2c+=H9c;a2c+=o9S;var L2c=X0H;L2c+=n5r;L2c+=i1H;var t2c=A5H;t2c+=L3H;t2c+=A5H;t2c+=m9c;var p2c=s9c;p2c+=H9c;p2c+=K3H;p2c+=L5H;var c2c=r9c;c2c+=B3r;c2c+=l5H;c2c+=p4r;var m2c=X4H;m2c+=c9c;m2c+=c9c;if(!conf[j9S]){return;}conf[C9S][r5h](U9S)[m2c](c2c,conf[V1S][o7H] >= conf[p2c]?t2c:L2c);conf[a2c]=conf[T2c] - conf[f2c][M2c];},create:function(conf){var u50='multi';var F50="ny";var P50="addCl";var H9S="button.";var P8c=H9S;P8c+=h8r;var H2c=y3S;H2c+=t4H;var U2c=P50;U2c+=E9H;var editor=this;var container=_commonUpload(editor,conf,function(val){var i50="loadMa";var D50="conc";var J50='postUpload';var C2c=A5H;C2c+=s3H;C2c+=K3H;C2c+=m9c;var j2c=i3H;j2c+=m9c;j2c+=I7h;var o2c=X4H;o2c+=x3r;var d2c=D7h;d2c+=i50;d2c+=F50;var x2c=D50;x2c+=n2H;var h2c=i3H;D59.S59();h2c+=f0H;h2c+=s3H;h2c+=s9c;var Y2c=i3H;Y2c+=f0H;Y2c+=s3H;Y2c+=s9c;conf[Y2c]=conf[h2c][x2c](val);Editor[z2H][d2c][Z7r][o2c](editor,conf,conf[V1S]);editor[j2c](J50,[conf[C2c],conf[V1S]]);},C7H);container[U2c](u50)[G8H](H2c,P8c,function(e){var O50="uploadMa";var b50="ga";var l50="stopPropa";var k50="dx";var i8c=l50;i8c+=b50;i8c+=V3H;e[i8c]();D59.S59();if(conf[X1S]){var u8c=i3H;u8c+=V5S;u8c+=s9c;var J8c=O50;J8c+=F50;var D8c=Z1S;D8c+=A5r;var F8c=H9c;F8c+=k50;var idx=$(this)[D2H](F8c);conf[D8c][A2r](idx,s8c);Editor[z2H][J8c][Z7r][E9r](editor,conf,conf[u8c]);}});conf[C9S]=container;D59.S59();return container;},get:function(conf){var l8c=Z1S;l8c+=s3H;l8c+=s9c;return conf[l8c];},set:function(conf,val){var K50="Upload c";var z50="lection";var E50='<ul/>';var Z50='upload.editor';var X50="div.ren";var G50="_showHide";var v50="noFileText";var B50="dere";var R50="s must have an array as a value";var W50="triggerHandler";var A50="oadMany";var S8c=S2t;S8c+=d5S;var Q8c=t7h;Q8c+=A50;var k8c=Z1S;k8c+=s3H;k8c+=s9c;var b8c=Z9h;b8c+=W9r;if(!val){val=[];}if(!$[b8c](val)){var O8c=K50;O8c+=U5H;O8c+=z50;O8c+=R50;throw O8c;}conf[k8c]=val;var that=this;var container=conf[G1S];if(conf[o9H]){var z8c=m9c;z8c+=K3H;z8c+=U5r;z8c+=y6H;var K8c=X50;K8c+=B50;K8c+=r9c;var A8c=N3H;A8c+=H9c;A8c+=A5H;A8c+=r9c;var rendered=container[A8c](K8c)[z8c]();if(val[o7H]){var list=$(E50)[y4r](rendered);$[m7H](val,function(i,file){var S50="n cla";var N50='<li>';var n50=' remove" data-idx="';var y50='</li>';var q50=" <bu";var w50=">&times;</butto";var Q50="tto";var E8c=e7H;E8c+=w50;E8c+=c1H;var B8c=N3H;B8c+=L3H;B8c+=d5H;B8c+=K3H;var X8c=q50;X8c+=Q50;X8c+=S50;X8c+=X1h;var R8c=r9c;R8c+=H9c;R8c+=b4H;R8c+=p4r;list[D5r](N50 + conf[R8c](file,i) + X8c + that[b9H][B8c][U3r] + n50 + i + E8c + y50);});}else {var q8c=X1H;q8c+=l6h;q8c+=A0S;q8c+=S1H;var w8c=f3H;w8c+=L3H;w8c+=L9S;w8c+=c9c;rendered[D5r](G0S + (conf[v50] || w8c) + q8c);}}Editor[z2H][Q8c][G50](conf);conf[S8c][r5h](u8S)[W50](Z50,[conf[V1S]]);},enable:function(conf){var n8c=l3h;n8c+=A5H;n8c+=s1t;n8c+=r9c;var N8c=H9c;N8c+=A5H;N8c+=d5S;conf[G1S][r5h](N8c)[W1S](z5S,j7H);conf[n8c]=C7H;},disable:function(conf){var V50="isabl";var W8c=r9c;W8c+=V50;W8c+=a9c;var G8c=H9c;G8c+=A5H;G8c+=l5H;G8c+=m9H;var v8c=l1S;v8c+=r9c;var y8c=i3H;y8c+=L2H;conf[y8c][v8c](G8c)[W1S](W8c,C7H);conf[X1S]=j7H;},canReturnSubmit:function(conf,node){return j7H;}});})();if(DataTable[Z8c][e50]){$[K2H](Editor[z2H],DataTable[k5H][e50]);}DataTable[k5H][V8c]=Editor[e8c];Editor[r8c]={};Editor[I8H][r50]=g8c;Editor[g50]=I50;return Editor;});

/*! Bootstrap integration for DataTables' Editor
 * ©2015 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-bs4', 'datatables.net-editor'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net-bs4')(root, $).$;
			}

			if ( ! $.fn.dataTable.Editor ) {
				require('datatables.net-editor')(root, $);
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


/*
 * Set the default display controller to be our bootstrap control 
 */
DataTable.Editor.defaults.display = "bootstrap";


/*
 * Alter the buttons that Editor adds to TableTools so they are suitable for bootstrap
 */
var i18nDefaults = DataTable.Editor.defaults.i18n;
i18nDefaults.create.title = '<h5 class="modal-title">'+i18nDefaults.create.title+'</h5>';
i18nDefaults.edit.title = '<h5 class="modal-title">'+i18nDefaults.edit.title+'</h5>';
i18nDefaults.remove.title = '<h5 class="modal-title">'+i18nDefaults.remove.title+'</h5>';

var tt = DataTable.TableTools;
if ( tt ) {
	tt.BUTTONS.editor_create.formButtons[0].className = "btn btn-primary";
	tt.BUTTONS.editor_edit.formButtons[0].className = "btn btn-primary";
	tt.BUTTONS.editor_remove.formButtons[0].className = "btn btn-danger";
}


/*
 * Change the default classes from Editor to be classes for Bootstrap
 */
$.extend( true, $.fn.dataTable.Editor.classes, {
	"header": {
		"wrapper": "DTE_Header modal-header"
	},
	"body": {
		"wrapper": "DTE_Body modal-body"
	},
	"footer": {
		"wrapper": "DTE_Footer modal-footer"
	},
	"form": {
		"tag": "form-horizontal",
		"button": "btn",
		"buttonInternal": "btn btn-outline-secondary"
	},
	"field": {
		"wrapper": "DTE_Field form-group row",
		"label":   "col-lg-4 col-form-label",
		"input":   "col-lg-8",
		"error":   "error is-invalid",
		"msg-labelInfo": "form-text text-secondary small",
		"msg-info":      "form-text text-secondary small",
		"msg-message":   "form-text text-secondary small",
		"msg-error":     "form-text text-danger small",
		"multiValue":    "card multi-value",
		"multiInfo":     "small",
		"multiRestore":  "card multi-restore"
	}
} );

$.extend( true, DataTable.ext.buttons, {
	create: {
		formButtons: {
			className: 'btn-primary'
		}
	},
	edit: {
		formButtons: {
			className: 'btn-primary'
		}
	},
	remove: {
		formButtons: {
			className: 'btn-danger'
		}
	}
} );


/*
 * Bootstrap display controller - this is effectively a proxy to the Bootstrap
 * modal control.
 */

DataTable.Editor.display.bootstrap = $.extend( true, {}, DataTable.Editor.models.displayController, {
	/*
	 * API methods
	 */
	"init": function ( dte ) {
		var conf = {
			// Note that `modal-dialog-scrollable` is BS4.3+ only. It has no effect on 4.0-4.2
			content: $(
				'<div class="modal fade DTED">'+
					'<div class="modal-dialog modal-dialog-scrollable" />'+
				'</div>'
			),
			close: $('<button class="close">&times;</div>')
				.on('click', function () {
					dte.close('icon');
				}),
			shown: false,
			fullyShow: false
		}

		// This is a bit horrible, but if you mousedown and then drag out of the modal container, we don't
		// want to trigger a background action.
		var allowBackgroundClick = false;
		$(document).on('mousedown', 'div.modal', function (e) {
			allowBackgroundClick = $(e.target).hasClass('modal') && conf.shown
				? true
				: false;
		} );

		$(document).on('click', 'div.modal', function (e) {
			if ( $(e.target).hasClass('modal') && allowBackgroundClick ) {
				dte.background();
			}
		} );

		// Add `form-control` to required elements
		dte.on( 'displayOrder.dtebs', function ( e, display, action, form ) {
			$.each( dte.s.fields, function ( key, field ) {
				$('input:not([type=checkbox]):not([type=radio]), select, textarea', field.node() )
					.addClass( 'form-control' );
			} );
		} );

		dte._bootstrapDisplay = conf;

		return DataTable.Editor.display.bootstrap;
	},

	"open": function ( dte, append, callback ) {
		var conf = dte._bootstrapDisplay;

		$(append).addClass('modal-content');

		if ( conf._shown ) {
			// Modal already up, so just draw in the new content
			var content = conf.content.find('div.modal-dialog');
			content.children().detach();
			content.append( append );

			if ( callback ) {
				callback();
			}
			return;
		}

		conf.shown = true;
		conf.fullyDisplayed = false;

		var content = conf.content.find('div.modal-dialog');
		content.children().detach();
		content.append( append );

		$('div.modal-header', append).append( conf.close );

		$(conf.content)
			.one('shown.bs.modal', function () {
				// Can only give elements focus when shown
				if ( dte.s.setFocus ) {
					dte.s.setFocus.focus();
				}

				conf.fullyDisplayed = true;

				if ( callback ) {
					callback();
				}
			})
			.one('hidden', function () {
				conf.shown = false;
			})
			.appendTo( 'body' )
			.modal( {
				backdrop: "static",
				keyboard: false
			} );
	},

	"close": function ( dte, callback ) {
		var conf = dte._bootstrapDisplay;

		if ( !conf.shown ) {
			if ( callback ) {
				callback();
			}
			return;
		}

		// Check if actually displayed or not before hiding. BS4 doesn't like `hide`
		// before it has been fully displayed
		if ( ! conf.fullyDisplayed ) {
			$(conf.content)
				.one('shown.bs.modal', function () {
					conf.close( dte, callback );
				} );

			return;
		}

		$(conf.content)
			.one( 'hidden.bs.modal', function () {
				$(this).detach();
			} )
			.modal('hide');

		conf.shown = false;
		conf.fullyDisplayed = false;

		if ( callback ) {
			callback();
		}
	},

	node: function ( dte ) {
		return dte._bootstrapDisplay.content[0];
	}
} );


return DataTable.Editor;
}));


/*! Buttons for DataTables 1.6.1
 * ©2016-2019 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


// Used for namespacing events added to the document by each instance, so they
// can be removed on destroy
var _instCounter = 0;

// Button namespacing counter for namespacing events on individual buttons
var _buttonCounter = 0;

var _dtButtons = DataTable.ext.buttons;

/**
 * [Buttons description]
 * @param {[type]}
 * @param {[type]}
 */
var Buttons = function( dt, config )
{
	// If not created with a `new` keyword then we return a wrapper function that
	// will take the settings object for a DT. This allows easy use of new instances
	// with the `layout` option - e.g. `topLeft: $.fn.dataTable.Buttons( ... )`.
	if ( !(this instanceof Buttons) ) {
		return function (settings) {
			return new Buttons( settings, dt ).container();
		};
	}

	// If there is no config set it to an empty object
	if ( typeof( config ) === 'undefined' ) {
		config = {};	
	}
	
	// Allow a boolean true for defaults
	if ( config === true ) {
		config = {};
	}

	// For easy configuration of buttons an array can be given
	if ( $.isArray( config ) ) {
		config = { buttons: config };
	}

	this.c = $.extend( true, {}, Buttons.defaults, config );

	// Don't want a deep copy for the buttons
	if ( config.buttons ) {
		this.c.buttons = config.buttons;
	}

	this.s = {
		dt: new DataTable.Api( dt ),
		buttons: [],
		listenKeys: '',
		namespace: 'dtb'+(_instCounter++)
	};

	this.dom = {
		container: $('<'+this.c.dom.container.tag+'/>')
			.addClass( this.c.dom.container.className )
	};

	this._constructor();
};


$.extend( Buttons.prototype, {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Public methods
	 */

	/**
	 * Get the action of a button
	 * @param  {int|string} Button index
	 * @return {function}
	 *//**
	 * Set the action of a button
	 * @param  {node} node Button element
	 * @param  {function} action Function to set
	 * @return {Buttons} Self for chaining
	 */
	action: function ( node, action )
	{
		var button = this._nodeToButton( node );

		if ( action === undefined ) {
			return button.conf.action;
		}

		button.conf.action = action;

		return this;
	},

	/**
	 * Add an active class to the button to make to look active or get current
	 * active state.
	 * @param  {node} node Button element
	 * @param  {boolean} [flag] Enable / disable flag
	 * @return {Buttons} Self for chaining or boolean for getter
	 */
	active: function ( node, flag ) {
		var button = this._nodeToButton( node );
		var klass = this.c.dom.button.active;
		var jqNode = $(button.node);

		if ( flag === undefined ) {
			return jqNode.hasClass( klass );
		}

		jqNode.toggleClass( klass, flag === undefined ? true : flag );

		return this;
	},

	/**
	 * Add a new button
	 * @param {object} config Button configuration object, base string name or function
	 * @param {int|string} [idx] Button index for where to insert the button
	 * @return {Buttons} Self for chaining
	 */
	add: function ( config, idx )
	{
		var buttons = this.s.buttons;

		if ( typeof idx === 'string' ) {
			var split = idx.split('-');
			var base = this.s;

			for ( var i=0, ien=split.length-1 ; i<ien ; i++ ) {
				base = base.buttons[ split[i]*1 ];
			}

			buttons = base.buttons;
			idx = split[ split.length-1 ]*1;
		}

		this._expandButton( buttons, config, base !== undefined, idx );
		this._draw();

		return this;
	},

	/**
	 * Get the container node for the buttons
	 * @return {jQuery} Buttons node
	 */
	container: function ()
	{
		return this.dom.container;
	},

	/**
	 * Disable a button
	 * @param  {node} node Button node
	 * @return {Buttons} Self for chaining
	 */
	disable: function ( node ) {
		var button = this._nodeToButton( node );

		$(button.node).addClass( this.c.dom.button.disabled );

		return this;
	},

	/**
	 * Destroy the instance, cleaning up event handlers and removing DOM
	 * elements
	 * @return {Buttons} Self for chaining
	 */
	destroy: function ()
	{
		// Key event listener
		$('body').off( 'keyup.'+this.s.namespace );

		// Individual button destroy (so they can remove their own events if
		// needed). Take a copy as the array is modified by `remove`
		var buttons = this.s.buttons.slice();
		var i, ien;
		
		for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
			this.remove( buttons[i].node );
		}

		// Container
		this.dom.container.remove();

		// Remove from the settings object collection
		var buttonInsts = this.s.dt.settings()[0];

		for ( i=0, ien=buttonInsts.length ; i<ien ; i++ ) {
			if ( buttonInsts.inst === this ) {
				buttonInsts.splice( i, 1 );
				break;
			}
		}

		return this;
	},

	/**
	 * Enable / disable a button
	 * @param  {node} node Button node
	 * @param  {boolean} [flag=true] Enable / disable flag
	 * @return {Buttons} Self for chaining
	 */
	enable: function ( node, flag )
	{
		if ( flag === false ) {
			return this.disable( node );
		}

		var button = this._nodeToButton( node );
		$(button.node).removeClass( this.c.dom.button.disabled );

		return this;
	},

	/**
	 * Get the instance name for the button set selector
	 * @return {string} Instance name
	 */
	name: function ()
	{
		return this.c.name;
	},

	/**
	 * Get a button's node of the buttons container if no button is given
	 * @param  {node} [node] Button node
	 * @return {jQuery} Button element, or container
	 */
	node: function ( node )
	{
		if ( ! node ) {
			return this.dom.container;
		}

		var button = this._nodeToButton( node );
		return $(button.node);
	},

	/**
	 * Set / get a processing class on the selected button
	 * @param {element} node Triggering button node
	 * @param  {boolean} flag true to add, false to remove, undefined to get
	 * @return {boolean|Buttons} Getter value or this if a setter.
	 */
	processing: function ( node, flag )
	{
		var dt = this.s.dt;
		var button = this._nodeToButton( node );

		if ( flag === undefined ) {
			return $(button.node).hasClass( 'processing' );
		}

		$(button.node).toggleClass( 'processing', flag );

		$(dt.table().node()).triggerHandler( 'buttons-processing.dt', [
			flag, dt.button( node ), dt, $(node), button.conf
		] );

		return this;
	},

	/**
	 * Remove a button.
	 * @param  {node} node Button node
	 * @return {Buttons} Self for chaining
	 */
	remove: function ( node )
	{
		var button = this._nodeToButton( node );
		var host = this._nodeToHost( node );
		var dt = this.s.dt;

		// Remove any child buttons first
		if ( button.buttons.length ) {
			for ( var i=button.buttons.length-1 ; i>=0 ; i-- ) {
				this.remove( button.buttons[i].node );
			}
		}

		// Allow the button to remove event handlers, etc
		if ( button.conf.destroy ) {
			button.conf.destroy.call( dt.button(node), dt, $(node), button.conf );
		}

		this._removeKey( button.conf );

		$(button.node).remove();

		var idx = $.inArray( button, host );
		host.splice( idx, 1 );

		return this;
	},

	/**
	 * Get the text for a button
	 * @param  {int|string} node Button index
	 * @return {string} Button text
	 *//**
	 * Set the text for a button
	 * @param  {int|string|function} node Button index
	 * @param  {string} label Text
	 * @return {Buttons} Self for chaining
	 */
	text: function ( node, label )
	{
		var button = this._nodeToButton( node );
		var buttonLiner = this.c.dom.collection.buttonLiner;
		var linerTag = button.inCollection && buttonLiner && buttonLiner.tag ?
			buttonLiner.tag :
			this.c.dom.buttonLiner.tag;
		var dt = this.s.dt;
		var jqNode = $(button.node);
		var text = function ( opt ) {
			return typeof opt === 'function' ?
				opt( dt, jqNode, button.conf ) :
				opt;
		};

		if ( label === undefined ) {
			return text( button.conf.text );
		}

		button.conf.text = label;

		if ( linerTag ) {
			jqNode.children( linerTag ).html( text(label) );
		}
		else {
			jqNode.html( text(label) );
		}

		return this;
	},


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Constructor
	 */

	/**
	 * Buttons constructor
	 * @private
	 */
	_constructor: function ()
	{
		var that = this;
		var dt = this.s.dt;
		var dtSettings = dt.settings()[0];
		var buttons =  this.c.buttons;

		if ( ! dtSettings._buttons ) {
			dtSettings._buttons = [];
		}

		dtSettings._buttons.push( {
			inst: this,
			name: this.c.name
		} );

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			this.add( buttons[i] );
		}

		dt.on( 'destroy', function ( e, settings ) {
			if ( settings === dtSettings ) {
				that.destroy();
			}
		} );

		// Global key event binding to listen for button keys
		$('body').on( 'keyup.'+this.s.namespace, function ( e ) {
			if ( ! document.activeElement || document.activeElement === document.body ) {
				// SUse a string of characters for fast lookup of if we need to
				// handle this
				var character = String.fromCharCode(e.keyCode).toLowerCase();

				if ( that.s.listenKeys.toLowerCase().indexOf( character ) !== -1 ) {
					that._keypress( character, e );
				}
			}
		} );
	},


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Private methods
	 */

	/**
	 * Add a new button to the key press listener
	 * @param {object} conf Resolved button configuration object
	 * @private
	 */
	_addKey: function ( conf )
	{
		if ( conf.key ) {
			this.s.listenKeys += $.isPlainObject( conf.key ) ?
				conf.key.key :
				conf.key;
		}
	},

	/**
	 * Insert the buttons into the container. Call without parameters!
	 * @param  {node} [container] Recursive only - Insert point
	 * @param  {array} [buttons] Recursive only - Buttons array
	 * @private
	 */
	_draw: function ( container, buttons )
	{
		if ( ! container ) {
			container = this.dom.container;
			buttons = this.s.buttons;
		}

		container.children().detach();

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			container.append( buttons[i].inserter );
			container.append( ' ' );

			if ( buttons[i].buttons && buttons[i].buttons.length ) {
				this._draw( buttons[i].collection, buttons[i].buttons );
			}
		}
	},

	/**
	 * Create buttons from an array of buttons
	 * @param  {array} attachTo Buttons array to attach to
	 * @param  {object} button Button definition
	 * @param  {boolean} inCollection true if the button is in a collection
	 * @private
	 */
	_expandButton: function ( attachTo, button, inCollection, attachPoint )
	{
		var dt = this.s.dt;
		var buttonCounter = 0;
		var buttons = ! $.isArray( button ) ?
			[ button ] :
			button;

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			var conf = this._resolveExtends( buttons[i] );

			if ( ! conf ) {
				continue;
			}

			// If the configuration is an array, then expand the buttons at this
			// point
			if ( $.isArray( conf ) ) {
				this._expandButton( attachTo, conf, inCollection, attachPoint );
				continue;
			}

			var built = this._buildButton( conf, inCollection );
			if ( ! built ) {
				continue;
			}

			if ( attachPoint !== undefined ) {
				attachTo.splice( attachPoint, 0, built );
				attachPoint++;
			}
			else {
				attachTo.push( built );
			}

			if ( built.conf.buttons ) {
				built.collection = $('<'+this.c.dom.collection.tag+'/>');

				built.conf._collection = built.collection;

				this._expandButton( built.buttons, built.conf.buttons, true, attachPoint );
			}

			// init call is made here, rather than buildButton as it needs to
			// be selectable, and for that it needs to be in the buttons array
			if ( conf.init ) {
				conf.init.call( dt.button( built.node ), dt, $(built.node), conf );
			}

			buttonCounter++;
		}
	},

	/**
	 * Create an individual button
	 * @param  {object} config            Resolved button configuration
	 * @param  {boolean} inCollection `true` if a collection button
	 * @return {jQuery} Created button node (jQuery)
	 * @private
	 */
	_buildButton: function ( config, inCollection )
	{
		var buttonDom = this.c.dom.button;
		var linerDom = this.c.dom.buttonLiner;
		var collectionDom = this.c.dom.collection;
		var dt = this.s.dt;
		var text = function ( opt ) {
			return typeof opt === 'function' ?
				opt( dt, button, config ) :
				opt;
		};

		if ( inCollection && collectionDom.button ) {
			buttonDom = collectionDom.button;
		}

		if ( inCollection && collectionDom.buttonLiner ) {
			linerDom = collectionDom.buttonLiner;
		}

		// Make sure that the button is available based on whatever requirements
		// it has. For example, Flash buttons require Flash
		if ( config.available && ! config.available( dt, config ) ) {
			return false;
		}

		var action = function ( e, dt, button, config ) {
			config.action.call( dt.button( button ), e, dt, button, config );

			$(dt.table().node()).triggerHandler( 'buttons-action.dt', [
				dt.button( button ), dt, button, config 
			] );
		};

		var tag = config.tag || buttonDom.tag;
		var clickBlurs = config.clickBlurs === undefined ? true : config.clickBlurs
		var button = $('<'+tag+'/>')
			.addClass( buttonDom.className )
			.attr( 'tabindex', this.s.dt.settings()[0].iTabIndex )
			.attr( 'aria-controls', this.s.dt.table().node().id )
			.on( 'click.dtb', function (e) {
				e.preventDefault();

				if ( ! button.hasClass( buttonDom.disabled ) && config.action ) {
					action( e, dt, button, config );
				}
				if( clickBlurs ) {
					button.blur();
				}
			} )
			.on( 'keyup.dtb', function (e) {
				if ( e.keyCode === 13 ) {
					if ( ! button.hasClass( buttonDom.disabled ) && config.action ) {
						action( e, dt, button, config );
					}
				}
			} );

		// Make `a` tags act like a link
		if ( tag.toLowerCase() === 'a' ) {
			button.attr( 'href', '#' );
		}

		// Button tags should have `type=button` so they don't have any default behaviour
		if ( tag.toLowerCase() === 'button' ) {
			button.attr( 'type', 'button' );
		}

		if ( linerDom.tag ) {
			var liner = $('<'+linerDom.tag+'/>')
				.html( text( config.text ) )
				.addClass( linerDom.className );

			if ( linerDom.tag.toLowerCase() === 'a' ) {
				liner.attr( 'href', '#' );
			}

			button.append( liner );
		}
		else {
			button.html( text( config.text ) );
		}

		if ( config.enabled === false ) {
			button.addClass( buttonDom.disabled );
		}

		if ( config.className ) {
			button.addClass( config.className );
		}

		if ( config.titleAttr ) {
			button.attr( 'title', text( config.titleAttr ) );
		}

		if ( config.attr ) {
			button.attr( config.attr );
		}

		if ( ! config.namespace ) {
			config.namespace = '.dt-button-'+(_buttonCounter++);
		}

		var buttonContainer = this.c.dom.buttonContainer;
		var inserter;
		if ( buttonContainer && buttonContainer.tag ) {
			inserter = $('<'+buttonContainer.tag+'/>')
				.addClass( buttonContainer.className )
				.append( button );
		}
		else {
			inserter = button;
		}

		this._addKey( config );

		// Style integration callback for DOM manipulation
		// Note that this is _not_ documented. It is currently
		// for style integration only
		if( this.c.buttonCreated ) {
			inserter = this.c.buttonCreated( config, inserter );
		}

		return {
			conf:         config,
			node:         button.get(0),
			inserter:     inserter,
			buttons:      [],
			inCollection: inCollection,
			collection:   null
		};
	},

	/**
	 * Get the button object from a node (recursive)
	 * @param  {node} node Button node
	 * @param  {array} [buttons] Button array, uses base if not defined
	 * @return {object} Button object
	 * @private
	 */
	_nodeToButton: function ( node, buttons )
	{
		if ( ! buttons ) {
			buttons = this.s.buttons;
		}

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			if ( buttons[i].node === node ) {
				return buttons[i];
			}

			if ( buttons[i].buttons.length ) {
				var ret = this._nodeToButton( node, buttons[i].buttons );

				if ( ret ) {
					return ret;
				}
			}
		}
	},

	/**
	 * Get container array for a button from a button node (recursive)
	 * @param  {node} node Button node
	 * @param  {array} [buttons] Button array, uses base if not defined
	 * @return {array} Button's host array
	 * @private
	 */
	_nodeToHost: function ( node, buttons )
	{
		if ( ! buttons ) {
			buttons = this.s.buttons;
		}

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			if ( buttons[i].node === node ) {
				return buttons;
			}

			if ( buttons[i].buttons.length ) {
				var ret = this._nodeToHost( node, buttons[i].buttons );

				if ( ret ) {
					return ret;
				}
			}
		}
	},

	/**
	 * Handle a key press - determine if any button's key configured matches
	 * what was typed and trigger the action if so.
	 * @param  {string} character The character pressed
	 * @param  {object} e Key event that triggered this call
	 * @private
	 */
	_keypress: function ( character, e )
	{
		// Check if this button press already activated on another instance of Buttons
		if ( e._buttonsHandled ) {
			return;
		}

		var run = function ( conf, node ) {
			if ( ! conf.key ) {
				return;
			}

			if ( conf.key === character ) {
				e._buttonsHandled = true;
				$(node).click();
			}
			else if ( $.isPlainObject( conf.key ) ) {
				if ( conf.key.key !== character ) {
					return;
				}

				if ( conf.key.shiftKey && ! e.shiftKey ) {
					return;
				}

				if ( conf.key.altKey && ! e.altKey ) {
					return;
				}

				if ( conf.key.ctrlKey && ! e.ctrlKey ) {
					return;
				}

				if ( conf.key.metaKey && ! e.metaKey ) {
					return;
				}

				// Made it this far - it is good
				e._buttonsHandled = true;
				$(node).click();
			}
		};

		var recurse = function ( a ) {
			for ( var i=0, ien=a.length ; i<ien ; i++ ) {
				run( a[i].conf, a[i].node );

				if ( a[i].buttons.length ) {
					recurse( a[i].buttons );
				}
			}
		};

		recurse( this.s.buttons );
	},

	/**
	 * Remove a key from the key listener for this instance (to be used when a
	 * button is removed)
	 * @param  {object} conf Button configuration
	 * @private
	 */
	_removeKey: function ( conf )
	{
		if ( conf.key ) {
			var character = $.isPlainObject( conf.key ) ?
				conf.key.key :
				conf.key;

			// Remove only one character, as multiple buttons could have the
			// same listening key
			var a = this.s.listenKeys.split('');
			var idx = $.inArray( character, a );
			a.splice( idx, 1 );
			this.s.listenKeys = a.join('');
		}
	},

	/**
	 * Resolve a button configuration
	 * @param  {string|function|object} conf Button config to resolve
	 * @return {object} Button configuration
	 * @private
	 */
	_resolveExtends: function ( conf )
	{
		var dt = this.s.dt;
		var i, ien;
		var toConfObject = function ( base ) {
			var loop = 0;

			// Loop until we have resolved to a button configuration, or an
			// array of button configurations (which will be iterated
			// separately)
			while ( ! $.isPlainObject(base) && ! $.isArray(base) ) {
				if ( base === undefined ) {
					return;
				}

				if ( typeof base === 'function' ) {
					base = base( dt, conf );

					if ( ! base ) {
						return false;
					}
				}
				else if ( typeof base === 'string' ) {
					if ( ! _dtButtons[ base ] ) {
						throw 'Unknown button type: '+base;
					}

					base = _dtButtons[ base ];
				}

				loop++;
				if ( loop > 30 ) {
					// Protect against misconfiguration killing the browser
					throw 'Buttons: Too many iterations';
				}
			}

			return $.isArray( base ) ?
				base :
				$.extend( {}, base );
		};

		conf = toConfObject( conf );

		while ( conf && conf.extend ) {
			// Use `toConfObject` in case the button definition being extended
			// is itself a string or a function
			if ( ! _dtButtons[ conf.extend ] ) {
				throw 'Cannot extend unknown button type: '+conf.extend;
			}

			var objArray = toConfObject( _dtButtons[ conf.extend ] );
			if ( $.isArray( objArray ) ) {
				return objArray;
			}
			else if ( ! objArray ) {
				// This is a little brutal as it might be possible to have a
				// valid button without the extend, but if there is no extend
				// then the host button would be acting in an undefined state
				return false;
			}

			// Stash the current class name
			var originalClassName = objArray.className;

			conf = $.extend( {}, objArray, conf );

			// The extend will have overwritten the original class name if the
			// `conf` object also assigned a class, but we want to concatenate
			// them so they are list that is combined from all extended buttons
			if ( originalClassName && conf.className !== originalClassName ) {
				conf.className = originalClassName+' '+conf.className;
			}

			// Buttons to be added to a collection  -gives the ability to define
			// if buttons should be added to the start or end of a collection
			var postfixButtons = conf.postfixButtons;
			if ( postfixButtons ) {
				if ( ! conf.buttons ) {
					conf.buttons = [];
				}

				for ( i=0, ien=postfixButtons.length ; i<ien ; i++ ) {
					conf.buttons.push( postfixButtons[i] );
				}

				conf.postfixButtons = null;
			}

			var prefixButtons = conf.prefixButtons;
			if ( prefixButtons ) {
				if ( ! conf.buttons ) {
					conf.buttons = [];
				}

				for ( i=0, ien=prefixButtons.length ; i<ien ; i++ ) {
					conf.buttons.splice( i, 0, prefixButtons[i] );
				}

				conf.prefixButtons = null;
			}

			// Although we want the `conf` object to overwrite almost all of
			// the properties of the object being extended, the `extend`
			// property should come from the object being extended
			conf.extend = objArray.extend;
		}

		return conf;
	},

	/**
	 * Display (and replace if there is an existing one) a popover attached to a button
	 * @param {string|node} content Content to show
	 * @param {DataTable.Api} hostButton DT API instance of the button
	 * @param {object} inOpts Options (see object below for all options)
	 */
	_popover: function ( content, hostButton, inOpts ) {
		var dt = hostButton;
		var buttonsSettings = this.c;
		var options = $.extend( {
			align: 'button-left', // button-right, dt-container
			autoClose: false,
			background: true,
			backgroundClassName: 'dt-button-background',
			contentClassName: buttonsSettings.dom.collection.className,
			collectionLayout: '',
			collectionTitle: '',
			dropup: false,
			fade: 400,
			rightAlignClassName: 'dt-button-right',
			tag: buttonsSettings.dom.collection.tag
		}, inOpts );
		var hostNode = hostButton.node();

		var close = function () {
			$('.dt-button-collection').stop().fadeOut( options.fade, function () {
				$(this).detach();
			} );

			$(dt.buttons( '[aria-haspopup="true"][aria-expanded="true"]' ).nodes())
				.attr('aria-expanded', 'false');

			$('div.dt-button-background').off( 'click.dtb-collection' );
			Buttons.background( false, options.backgroundClassName, options.fade, hostNode );

			$('body').off( '.dtb-collection' );
			dt.off( 'buttons-action.b-internal' );
		};

		if (content === false) {
			close();
		}

		var existingExpanded = $(dt.buttons( '[aria-haspopup="true"][aria-expanded="true"]' ).nodes());
		if ( existingExpanded.length ) {
			hostNode = existingExpanded.eq(0);

			close();
		}

		var display = $('<div/>')
			.addClass('dt-button-collection')
			.addClass(options.collectionLayout)
			.css('display', 'none');

		content = $(content)
			.addClass(options.contentClassName)
			.attr('role', 'menu')
			.appendTo(display);

		hostNode.attr( 'aria-expanded', 'true' );

		if ( hostNode.parents('body')[0] !== document.body ) {
			hostNode = document.body.lastChild;
		}

		if ( options.collectionTitle ) {
			display.prepend('<div class="dt-button-collection-title">'+options.collectionTitle+'</div>');
		}

		display
			.insertAfter( hostNode )
			.fadeIn( options.fade );

		var tableContainer = $( hostButton.table().container() );
		var position = display.css( 'position' );

		if ( options.align === 'dt-container' ) {
			hostNode = hostNode.parent();
			display.css('width', tableContainer.width());
		}

		if ( position === 'absolute' ) {
			var hostPosition = hostNode.position();

			display.css( {
				top: hostPosition.top + hostNode.outerHeight(),
				left: hostPosition.left
			} );

			// calculate overflow when positioned beneath
			var collectionHeight = display.outerHeight();
			var collectionWidth = display.outerWidth();
			var tableBottom = tableContainer.offset().top + tableContainer.height();
			var listBottom = hostPosition.top + hostNode.outerHeight() + collectionHeight;
			var bottomOverflow = listBottom - tableBottom;

			// calculate overflow when positioned above
			var listTop = hostPosition.top - collectionHeight;
			var tableTop = tableContainer.offset().top;
			var topOverflow = tableTop - listTop;

			// if bottom overflow is larger, move to the top because it fits better, or if dropup is requested
			var moveTop = hostPosition.top - collectionHeight - 5;
			if ( (bottomOverflow > topOverflow || options.dropup) && -moveTop < tableTop ) {
				display.css( 'top', moveTop);
			}

			// Right alignment is enabled on a class, e.g. bootstrap:
			// $.fn.dataTable.Buttons.defaults.dom.collection.className += " dropdown-menu-right"; 
			if ( display.hasClass( options.rightAlignClassName ) || options.align === 'button-right' ) {
				display.css( 'left', hostPosition.left + hostNode.outerWidth() - collectionWidth );
			}

			// Right alignment in table container
			var listRight = hostPosition.left + collectionWidth;
			var tableRight = tableContainer.offset().left + tableContainer.width();
			if ( listRight > tableRight ) {
				display.css( 'left', hostPosition.left - ( listRight - tableRight ) );
			}

			// Right alignment to window
			var listOffsetRight = hostNode.offset().left + collectionWidth;
			if ( listOffsetRight > $(window).width() ) {
				display.css( 'left', hostPosition.left - (listOffsetRight-$(window).width()) );
			}
		}
		else {
			// Fix position - centre on screen
			var top = display.height() / 2;
			if ( top > $(window).height() / 2 ) {
				top = $(window).height() / 2;
			}

			display.css( 'marginTop', top*-1 );
		}

		if ( options.background ) {
			Buttons.background( true, options.backgroundClassName, options.fade, hostNode );
		}

		// This is bonkers, but if we don't have a click listener on the
		// background element, iOS Safari will ignore the body click
		// listener below. An empty function here is all that is
		// required to make it work...
		$('div.dt-button-background').on( 'click.dtb-collection', function () {} );

		$('body')
			.on( 'click.dtb-collection', function (e) {
				// andSelf is deprecated in jQ1.8, but we want 1.7 compat
				var back = $.fn.addBack ? 'addBack' : 'andSelf';

				if ( ! $(e.target).parents()[back]().filter( content ).length ) {
					close();
				}
			} )
			.on( 'keyup.dtb-collection', function (e) {
				if ( e.keyCode === 27 ) {
					close();
				}
			} );

		if ( options.autoClose ) {
			setTimeout( function () {
				dt.on( 'buttons-action.b-internal', function (e, btn, dt, node) {
					if ( node[0] === hostNode[0] ) {
						return;
					}
					close();
				} );
			}, 0);
		}
	}
} );



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Statics
 */

/**
 * Show / hide a background layer behind a collection
 * @param  {boolean} Flag to indicate if the background should be shown or
 *   hidden 
 * @param  {string} Class to assign to the background
 * @static
 */
Buttons.background = function ( show, className, fade, insertPoint ) {
	if ( fade === undefined ) {
		fade = 400;
	}
	if ( ! insertPoint ) {
		insertPoint = document.body;
	}

	if ( show ) {
		$('<div/>')
			.addClass( className )
			.css( 'display', 'none' )
			.insertAfter( insertPoint )
			.stop()
			.fadeIn( fade );
	}
	else {
		$('div.'+className)
			.stop()
			.fadeOut( fade, function () {
				$(this)
					.removeClass( className )
					.remove();
			} );
	}
};

/**
 * Instance selector - select Buttons instances based on an instance selector
 * value from the buttons assigned to a DataTable. This is only useful if
 * multiple instances are attached to a DataTable.
 * @param  {string|int|array} Instance selector - see `instance-selector`
 *   documentation on the DataTables site
 * @param  {array} Button instance array that was attached to the DataTables
 *   settings object
 * @return {array} Buttons instances
 * @static
 */
Buttons.instanceSelector = function ( group, buttons )
{
	if ( group === undefined || group === null ) {
		return $.map( buttons, function ( v ) {
			return v.inst;
		} );
	}

	var ret = [];
	var names = $.map( buttons, function ( v ) {
		return v.name;
	} );

	// Flatten the group selector into an array of single options
	var process = function ( input ) {
		if ( $.isArray( input ) ) {
			for ( var i=0, ien=input.length ; i<ien ; i++ ) {
				process( input[i] );
			}
			return;
		}

		if ( typeof input === 'string' ) {
			if ( input.indexOf( ',' ) !== -1 ) {
				// String selector, list of names
				process( input.split(',') );
			}
			else {
				// String selector individual name
				var idx = $.inArray( $.trim(input), names );

				if ( idx !== -1 ) {
					ret.push( buttons[ idx ].inst );
				}
			}
		}
		else if ( typeof input === 'number' ) {
			// Index selector
			ret.push( buttons[ input ].inst );
		}
	};
	
	process( group );

	return ret;
};

/**
 * Button selector - select one or more buttons from a selector input so some
 * operation can be performed on them.
 * @param  {array} Button instances array that the selector should operate on
 * @param  {string|int|node|jQuery|array} Button selector - see
 *   `button-selector` documentation on the DataTables site
 * @return {array} Array of objects containing `inst` and `idx` properties of
 *   the selected buttons so you know which instance each button belongs to.
 * @static
 */
Buttons.buttonSelector = function ( insts, selector )
{
	var ret = [];
	var nodeBuilder = function ( a, buttons, baseIdx ) {
		var button;
		var idx;

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			button = buttons[i];

			if ( button ) {
				idx = baseIdx !== undefined ?
					baseIdx+i :
					i+'';

				a.push( {
					node: button.node,
					name: button.conf.name,
					idx:  idx
				} );

				if ( button.buttons ) {
					nodeBuilder( a, button.buttons, idx+'-' );
				}
			}
		}
	};

	var run = function ( selector, inst ) {
		var i, ien;
		var buttons = [];
		nodeBuilder( buttons, inst.s.buttons );

		var nodes = $.map( buttons, function (v) {
			return v.node;
		} );

		if ( $.isArray( selector ) || selector instanceof $ ) {
			for ( i=0, ien=selector.length ; i<ien ; i++ ) {
				run( selector[i], inst );
			}
			return;
		}

		if ( selector === null || selector === undefined || selector === '*' ) {
			// Select all
			for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
				ret.push( {
					inst: inst,
					node: buttons[i].node
				} );
			}
		}
		else if ( typeof selector === 'number' ) {
			// Main button index selector
			ret.push( {
				inst: inst,
				node: inst.s.buttons[ selector ].node
			} );
		}
		else if ( typeof selector === 'string' ) {
			if ( selector.indexOf( ',' ) !== -1 ) {
				// Split
				var a = selector.split(',');

				for ( i=0, ien=a.length ; i<ien ; i++ ) {
					run( $.trim(a[i]), inst );
				}
			}
			else if ( selector.match( /^\d+(\-\d+)*$/ ) ) {
				// Sub-button index selector
				var indexes = $.map( buttons, function (v) {
					return v.idx;
				} );

				ret.push( {
					inst: inst,
					node: buttons[ $.inArray( selector, indexes ) ].node
				} );
			}
			else if ( selector.indexOf( ':name' ) !== -1 ) {
				// Button name selector
				var name = selector.replace( ':name', '' );

				for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
					if ( buttons[i].name === name ) {
						ret.push( {
							inst: inst,
							node: buttons[i].node
						} );
					}
				}
			}
			else {
				// jQuery selector on the nodes
				$( nodes ).filter( selector ).each( function () {
					ret.push( {
						inst: inst,
						node: this
					} );
				} );
			}
		}
		else if ( typeof selector === 'object' && selector.nodeName ) {
			// Node selector
			var idx = $.inArray( selector, nodes );

			if ( idx !== -1 ) {
				ret.push( {
					inst: inst,
					node: nodes[ idx ]
				} );
			}
		}
	};


	for ( var i=0, ien=insts.length ; i<ien ; i++ ) {
		var inst = insts[i];

		run( selector, inst );
	}

	return ret;
};


/**
 * Buttons defaults. For full documentation, please refer to the docs/option
 * directory or the DataTables site.
 * @type {Object}
 * @static
 */
Buttons.defaults = {
	buttons: [ 'copy', 'excel', 'csv', 'pdf', 'print' ],
	name: 'main',
	tabIndex: 0,
	dom: {
		container: {
			tag: 'div',
			className: 'dt-buttons'
		},
		collection: {
			tag: 'div',
			className: ''
		},
		button: {
			// Flash buttons will not work with `<button>` in IE - it has to be `<a>`
			tag: 'ActiveXObject' in window ?
				'a' :
				'button',
			className: 'dt-button',
			active: 'active',
			disabled: 'disabled'
		},
		buttonLiner: {
			tag: 'span',
			className: ''
		}
	}
};

/**
 * Version information
 * @type {string}
 * @static
 */
Buttons.version = '1.6.1';


$.extend( _dtButtons, {
	collection: {
		text: function ( dt ) {
			return dt.i18n( 'buttons.collection', 'Collection' );
		},
		className: 'buttons-collection',
		init: function ( dt, button, config ) {
			button.attr( 'aria-expanded', false );
		},
		action: function ( e, dt, button, config ) {
			e.stopPropagation();

			if ( config._collection.parents('body').length ) {
				this.popover(false, config);
			}
			else {
				this.popover(config._collection, config);
			}
		},
		attr: {
			'aria-haspopup': true
		}
		// Also the popover options, defined in Buttons.popover
	},
	copy: function ( dt, conf ) {
		if ( _dtButtons.copyHtml5 ) {
			return 'copyHtml5';
		}
		if ( _dtButtons.copyFlash && _dtButtons.copyFlash.available( dt, conf ) ) {
			return 'copyFlash';
		}
	},
	csv: function ( dt, conf ) {
		// Common option that will use the HTML5 or Flash export buttons
		if ( _dtButtons.csvHtml5 && _dtButtons.csvHtml5.available( dt, conf ) ) {
			return 'csvHtml5';
		}
		if ( _dtButtons.csvFlash && _dtButtons.csvFlash.available( dt, conf ) ) {
			return 'csvFlash';
		}
	},
	excel: function ( dt, conf ) {
		// Common option that will use the HTML5 or Flash export buttons
		if ( _dtButtons.excelHtml5 && _dtButtons.excelHtml5.available( dt, conf ) ) {
			return 'excelHtml5';
		}
		if ( _dtButtons.excelFlash && _dtButtons.excelFlash.available( dt, conf ) ) {
			return 'excelFlash';
		}
	},
	pdf: function ( dt, conf ) {
		// Common option that will use the HTML5 or Flash export buttons
		if ( _dtButtons.pdfHtml5 && _dtButtons.pdfHtml5.available( dt, conf ) ) {
			return 'pdfHtml5';
		}
		if ( _dtButtons.pdfFlash && _dtButtons.pdfFlash.available( dt, conf ) ) {
			return 'pdfFlash';
		}
	},
	pageLength: function ( dt ) {
		var lengthMenu = dt.settings()[0].aLengthMenu;
		var vals = $.isArray( lengthMenu[0] ) ? lengthMenu[0] : lengthMenu;
		var lang = $.isArray( lengthMenu[0] ) ? lengthMenu[1] : lengthMenu;
		var text = function ( dt ) {
			return dt.i18n( 'buttons.pageLength', {
				"-1": 'Show all rows',
				_:    'Show %d rows'
			}, dt.page.len() );
		};

		return {
			extend: 'collection',
			text: text,
			className: 'buttons-page-length',
			autoClose: true,
			buttons: $.map( vals, function ( val, i ) {
				return {
					text: lang[i],
					className: 'button-page-length',
					action: function ( e, dt ) {
						dt.page.len( val ).draw();
					},
					init: function ( dt, node, conf ) {
						var that = this;
						var fn = function () {
							that.active( dt.page.len() === val );
						};

						dt.on( 'length.dt'+conf.namespace, fn );
						fn();
					},
					destroy: function ( dt, node, conf ) {
						dt.off( 'length.dt'+conf.namespace );
					}
				};
			} ),
			init: function ( dt, node, conf ) {
				var that = this;
				dt.on( 'length.dt'+conf.namespace, function () {
					that.text( conf.text );
				} );
			},
			destroy: function ( dt, node, conf ) {
				dt.off( 'length.dt'+conf.namespace );
			}
		};
	}
} );


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables API
 *
 * For complete documentation, please refer to the docs/api directory or the
 * DataTables site
 */

// Buttons group and individual button selector
DataTable.Api.register( 'buttons()', function ( group, selector ) {
	// Argument shifting
	if ( selector === undefined ) {
		selector = group;
		group = undefined;
	}

	this.selector.buttonGroup = group;

	var res = this.iterator( true, 'table', function ( ctx ) {
		if ( ctx._buttons ) {
			return Buttons.buttonSelector(
				Buttons.instanceSelector( group, ctx._buttons ),
				selector
			);
		}
	}, true );

	res._groupSelector = group;
	return res;
} );

// Individual button selector
DataTable.Api.register( 'button()', function ( group, selector ) {
	// just run buttons() and truncate
	var buttons = this.buttons( group, selector );

	if ( buttons.length > 1 ) {
		buttons.splice( 1, buttons.length );
	}

	return buttons;
} );

// Active buttons
DataTable.Api.registerPlural( 'buttons().active()', 'button().active()', function ( flag ) {
	if ( flag === undefined ) {
		return this.map( function ( set ) {
			return set.inst.active( set.node );
		} );
	}

	return this.each( function ( set ) {
		set.inst.active( set.node, flag );
	} );
} );

// Get / set button action
DataTable.Api.registerPlural( 'buttons().action()', 'button().action()', function ( action ) {
	if ( action === undefined ) {
		return this.map( function ( set ) {
			return set.inst.action( set.node );
		} );
	}

	return this.each( function ( set ) {
		set.inst.action( set.node, action );
	} );
} );

// Enable / disable buttons
DataTable.Api.register( ['buttons().enable()', 'button().enable()'], function ( flag ) {
	return this.each( function ( set ) {
		set.inst.enable( set.node, flag );
	} );
} );

// Disable buttons
DataTable.Api.register( ['buttons().disable()', 'button().disable()'], function () {
	return this.each( function ( set ) {
		set.inst.disable( set.node );
	} );
} );

// Get button nodes
DataTable.Api.registerPlural( 'buttons().nodes()', 'button().node()', function () {
	var jq = $();

	// jQuery will automatically reduce duplicates to a single entry
	$( this.each( function ( set ) {
		jq = jq.add( set.inst.node( set.node ) );
	} ) );

	return jq;
} );

// Get / set button processing state
DataTable.Api.registerPlural( 'buttons().processing()', 'button().processing()', function ( flag ) {
	if ( flag === undefined ) {
		return this.map( function ( set ) {
			return set.inst.processing( set.node );
		} );
	}

	return this.each( function ( set ) {
		set.inst.processing( set.node, flag );
	} );
} );

// Get / set button text (i.e. the button labels)
DataTable.Api.registerPlural( 'buttons().text()', 'button().text()', function ( label ) {
	if ( label === undefined ) {
		return this.map( function ( set ) {
			return set.inst.text( set.node );
		} );
	}

	return this.each( function ( set ) {
		set.inst.text( set.node, label );
	} );
} );

// Trigger a button's action
DataTable.Api.registerPlural( 'buttons().trigger()', 'button().trigger()', function () {
	return this.each( function ( set ) {
		set.inst.node( set.node ).trigger( 'click' );
	} );
} );

// Button resolver to the popover
DataTable.Api.register( 'button().popover()', function (content, options) {
	return this.map( function ( set ) {
		return set.inst._popover( content, this.button(this[0].node), options );
	} );
} );

// Get the container elements
DataTable.Api.register( 'buttons().containers()', function () {
	var jq = $();
	var groupSelector = this._groupSelector;

	// We need to use the group selector directly, since if there are no buttons
	// the result set will be empty
	this.iterator( true, 'table', function ( ctx ) {
		if ( ctx._buttons ) {
			var insts = Buttons.instanceSelector( groupSelector, ctx._buttons );

			for ( var i=0, ien=insts.length ; i<ien ; i++ ) {
				jq = jq.add( insts[i].container() );
			}
		}
	} );

	return jq;
} );

DataTable.Api.register( 'buttons().container()', function () {
	// API level of nesting is `buttons()` so we can zip into the containers method
	return this.containers().eq(0);
} );

// Add a new button
DataTable.Api.register( 'button().add()', function ( idx, conf ) {
	var ctx = this.context;

	// Don't use `this` as it could be empty - select the instances directly
	if ( ctx.length ) {
		var inst = Buttons.instanceSelector( this._groupSelector, ctx[0]._buttons );

		if ( inst.length ) {
			inst[0].add( conf, idx );
		}
	}

	return this.button( this._groupSelector, idx );
} );

// Destroy the button sets selected
DataTable.Api.register( 'buttons().destroy()', function () {
	this.pluck( 'inst' ).unique().each( function ( inst ) {
		inst.destroy();
	} );

	return this;
} );

// Remove a button
DataTable.Api.registerPlural( 'buttons().remove()', 'buttons().remove()', function () {
	this.each( function ( set ) {
		set.inst.remove( set.node );
	} );

	return this;
} );

// Information box that can be used by buttons
var _infoTimer;
DataTable.Api.register( 'buttons.info()', function ( title, message, time ) {
	var that = this;

	if ( title === false ) {
		this.off('destroy.btn-info');
		$('#datatables_buttons_info').fadeOut( function () {
			$(this).remove();
		} );
		clearTimeout( _infoTimer );
		_infoTimer = null;

		return this;
	}

	if ( _infoTimer ) {
		clearTimeout( _infoTimer );
	}

	if ( $('#datatables_buttons_info').length ) {
		$('#datatables_buttons_info').remove();
	}

	title = title ? '<h2>'+title+'</h2>' : '';

	$('<div id="datatables_buttons_info" class="dt-button-info"/>')
		.html( title )
		.append( $('<div/>')[ typeof message === 'string' ? 'html' : 'append' ]( message ) )
		.css( 'display', 'none' )
		.appendTo( 'body' )
		.fadeIn();

	if ( time !== undefined && time !== 0 ) {
		_infoTimer = setTimeout( function () {
			that.buttons.info( false );
		}, time );
	}

	this.on('destroy.btn-info', function () {
		that.buttons.info(false);
	});

	return this;
} );

// Get data from the table for export - this is common to a number of plug-in
// buttons so it is included in the Buttons core library
DataTable.Api.register( 'buttons.exportData()', function ( options ) {
	if ( this.context.length ) {
		return _exportData( new DataTable.Api( this.context[0] ), options );
	}
} );

// Get information about the export that is common to many of the export data
// types (DRY)
DataTable.Api.register( 'buttons.exportInfo()', function ( conf ) {
	if ( ! conf ) {
		conf = {};
	}

	return {
		filename: _filename( conf ),
		title: _title( conf ),
		messageTop: _message(this, conf.message || conf.messageTop, 'top'),
		messageBottom: _message(this, conf.messageBottom, 'bottom')
	};
} );



/**
 * Get the file name for an exported file.
 *
 * @param {object}	config Button configuration
 * @param {boolean} incExtension Include the file name extension
 */
var _filename = function ( config )
{
	// Backwards compatibility
	var filename = config.filename === '*' && config.title !== '*' && config.title !== undefined && config.title !== null && config.title !== '' ?
		config.title :
		config.filename;

	if ( typeof filename === 'function' ) {
		filename = filename();
	}

	if ( filename === undefined || filename === null ) {
		return null;
	}

	if ( filename.indexOf( '*' ) !== -1 ) {
		filename = $.trim( filename.replace( '*', $('head > title').text() ) );
	}

	// Strip characters which the OS will object to
	filename = filename.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, "");

	var extension = _stringOrFunction( config.extension );
	if ( ! extension ) {
		extension = '';
	}

	return filename + extension;
};

/**
 * Simply utility method to allow parameters to be given as a function
 *
 * @param {undefined|string|function} option Option
 * @return {null|string} Resolved value
 */
var _stringOrFunction = function ( option )
{
	if ( option === null || option === undefined ) {
		return null;
	}
	else if ( typeof option === 'function' ) {
		return option();
	}
	return option;
};

/**
 * Get the title for an exported file.
 *
 * @param {object} config	Button configuration
 */
var _title = function ( config )
{
	var title = _stringOrFunction( config.title );

	return title === null ?
		null : title.indexOf( '*' ) !== -1 ?
			title.replace( '*', $('head > title').text() || 'Exported data' ) :
			title;
};

var _message = function ( dt, option, position )
{
	var message = _stringOrFunction( option );
	if ( message === null ) {
		return null;
	}

	var caption = $('caption', dt.table().container()).eq(0);
	if ( message === '*' ) {
		var side = caption.css( 'caption-side' );
		if ( side !== position ) {
			return null;
		}

		return caption.length ?
			caption.text() :
			'';
	}

	return message;
};







var _exportTextarea = $('<textarea/>')[0];
var _exportData = function ( dt, inOpts )
{
	var config = $.extend( true, {}, {
		rows:           null,
		columns:        '',
		modifier:       {
			search: 'applied',
			order:  'applied'
		},
		orthogonal:     'display',
		stripHtml:      true,
		stripNewlines:  true,
		decodeEntities: true,
		trim:           true,
		format:         {
			header: function ( d ) {
				return strip( d );
			},
			footer: function ( d ) {
				return strip( d );
			},
			body: function ( d ) {
				return strip( d );
			}
		},
		customizeData: null
	}, inOpts );

	var strip = function ( str ) {
		if ( typeof str !== 'string' ) {
			return str;
		}

		// Always remove script tags
		str = str.replace( /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '' );

		// Always remove comments
		str = str.replace( /<!\-\-.*?\-\->/g, '' );

		if ( config.stripHtml ) {
			str = str.replace( /<[^>]*>/g, '' );
		}

		if ( config.trim ) {
			str = str.replace( /^\s+|\s+$/g, '' );
		}

		if ( config.stripNewlines ) {
			str = str.replace( /\n/g, ' ' );
		}

		if ( config.decodeEntities ) {
			_exportTextarea.innerHTML = str;
			str = _exportTextarea.value;
		}

		return str;
	};


	var header = dt.columns( config.columns ).indexes().map( function (idx) {
		var el = dt.column( idx ).header();
		return config.format.header( el.innerHTML, idx, el );
	} ).toArray();

	var footer = dt.table().footer() ?
		dt.columns( config.columns ).indexes().map( function (idx) {
			var el = dt.column( idx ).footer();
			return config.format.footer( el ? el.innerHTML : '', idx, el );
		} ).toArray() :
		null;
	
	// If Select is available on this table, and any rows are selected, limit the export
	// to the selected rows. If no rows are selected, all rows will be exported. Specify
	// a `selected` modifier to control directly.
	var modifier = $.extend( {}, config.modifier );
	if ( dt.select && typeof dt.select.info === 'function' && modifier.selected === undefined ) {
		if ( dt.rows( config.rows, $.extend( { selected: true }, modifier ) ).any() ) {
			$.extend( modifier, { selected: true } )
		}
	}

	var rowIndexes = dt.rows( config.rows, modifier ).indexes().toArray();
	var selectedCells = dt.cells( rowIndexes, config.columns );
	var cells = selectedCells
		.render( config.orthogonal )
		.toArray();
	var cellNodes = selectedCells
		.nodes()
		.toArray();

	var columns = header.length;
	var rows = columns > 0 ? cells.length / columns : 0;
	var body = [];
	var cellCounter = 0;

	for ( var i=0, ien=rows ; i<ien ; i++ ) {
		var row = [ columns ];

		for ( var j=0 ; j<columns ; j++ ) {
			row[j] = config.format.body( cells[ cellCounter ], i, j, cellNodes[ cellCounter ] );
			cellCounter++;
		}

		body[i] = row;
	}

	var data = {
		header: header,
		footer: footer,
		body:   body
	};

	if ( config.customizeData ) {
		config.customizeData( data );
	}

	return data;
};


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables interface
 */

// Attach to DataTables objects for global access
$.fn.dataTable.Buttons = Buttons;
$.fn.DataTable.Buttons = Buttons;



// DataTables creation - check if the buttons have been defined for this table,
// they will have been if the `B` option was used in `dom`, otherwise we should
// create the buttons instance here so they can be inserted into the document
// using the API. Listen for `init` for compatibility with pre 1.10.10, but to
// be removed in future.
$(document).on( 'init.dt plugin-init.dt', function (e, settings) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	var opts = settings.oInit.buttons || DataTable.defaults.buttons;

	if ( opts && ! settings._buttons ) {
		new Buttons( settings, opts ).container();
	}
} );

function _init ( settings ) {
	var api = new DataTable.Api( settings );
	var opts = api.init().buttons || DataTable.defaults.buttons;

	return new Buttons( api, opts ).container();
}

// DataTables `dom` feature option
DataTable.ext.feature.push( {
	fnInit: _init,
	cFeature: "B"
} );

// DataTables 2 layout feature
if ( DataTable.ext.features ) {
	DataTable.ext.features.register( 'buttons', _init );
}


return Buttons;
}));


/*! Bootstrap integration for DataTables' Buttons
 * ©2016 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-bs4', 'datatables.net-buttons'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net-bs4')(root, $).$;
			}

			if ( ! $.fn.dataTable.Buttons ) {
				require('datatables.net-buttons')(root, $);
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;

$.extend( true, DataTable.Buttons.defaults, {
	dom: {
		container: {
			className: 'dt-buttons btn-group flex-wrap'
		},
		button: {
			className: 'btn btn-secondary'
		},
		collection: {
			tag: 'div',
			className: 'dropdown-menu',
			button: {
				tag: 'a',
				className: 'dt-button dropdown-item',
				active: 'active',
				disabled: 'disabled'
			}
		}
	},
	buttonCreated: function ( config, button ) {
		return config.buttons ?
			$('<div class="btn-group"/>').append(button) :
			button;
	}
} );

DataTable.ext.buttons.collection.className += ' dropdown-toggle';
DataTable.ext.buttons.collection.rightAlignClassName = 'dropdown-menu-right';

return DataTable.Buttons;
}));


/*!
 * Flash export buttons for Buttons and DataTables.
 * 2015-2017 SpryMedia Ltd - datatables.net/license
 *
 * ZeroClipbaord - MIT license
 * Copyright (c) 2012 Joseph Huckaby
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net', 'datatables.net-buttons'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net')(root, $).$;
			}

			if ( ! $.fn.dataTable.Buttons ) {
				require('datatables.net-buttons')(root, $);
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * ZeroClipboard dependency
 */

/*
 * ZeroClipboard 1.0.4 with modifications
 * Author: Joseph Huckaby
 * License: MIT
 *
 * Copyright (c) 2012 Joseph Huckaby
 */
var ZeroClipboard_TableTools = {
	version: "1.0.4-TableTools2",
	clients: {}, // registered upload clients on page, indexed by id
	moviePath: '', // URL to movie
	nextId: 1, // ID of next movie

	$: function(thingy) {
		// simple DOM lookup utility function
		if (typeof(thingy) == 'string') {
			thingy = document.getElementById(thingy);
		}
		if (!thingy.addClass) {
			// extend element with a few useful methods
			thingy.hide = function() { this.style.display = 'none'; };
			thingy.show = function() { this.style.display = ''; };
			thingy.addClass = function(name) { this.removeClass(name); this.className += ' ' + name; };
			thingy.removeClass = function(name) {
				this.className = this.className.replace( new RegExp("\\s*" + name + "\\s*"), " ").replace(/^\s+/, '').replace(/\s+$/, '');
			};
			thingy.hasClass = function(name) {
				return !!this.className.match( new RegExp("\\s*" + name + "\\s*") );
			};
		}
		return thingy;
	},

	setMoviePath: function(path) {
		// set path to ZeroClipboard.swf
		this.moviePath = path;
	},

	dispatch: function(id, eventName, args) {
		// receive event from flash movie, send to client
		var client = this.clients[id];
		if (client) {
			client.receiveEvent(eventName, args);
		}
	},

	log: function ( str ) {
		console.log( 'Flash: '+str );
	},

	register: function(id, client) {
		// register new client to receive events
		this.clients[id] = client;
	},

	getDOMObjectPosition: function(obj) {
		// get absolute coordinates for dom element
		var info = {
			left: 0,
			top: 0,
			width: obj.width ? obj.width : obj.offsetWidth,
			height: obj.height ? obj.height : obj.offsetHeight
		};

		if ( obj.style.width !== "" ) {
			info.width = obj.style.width.replace("px","");
		}

		if ( obj.style.height !== "" ) {
			info.height = obj.style.height.replace("px","");
		}

		while (obj) {
			info.left += obj.offsetLeft;
			info.top += obj.offsetTop;
			obj = obj.offsetParent;
		}

		return info;
	},

	Client: function(elem) {
		// constructor for new simple upload client
		this.handlers = {};

		// unique ID
		this.id = ZeroClipboard_TableTools.nextId++;
		this.movieId = 'ZeroClipboard_TableToolsMovie_' + this.id;

		// register client with singleton to receive flash events
		ZeroClipboard_TableTools.register(this.id, this);

		// create movie
		if (elem) {
			this.glue(elem);
		}
	}
};

ZeroClipboard_TableTools.Client.prototype = {

	id: 0, // unique ID for us
	ready: false, // whether movie is ready to receive events or not
	movie: null, // reference to movie object
	clipText: '', // text to copy to clipboard
	fileName: '', // default file save name
	action: 'copy', // action to perform
	handCursorEnabled: true, // whether to show hand cursor, or default pointer cursor
	cssEffects: true, // enable CSS mouse effects on dom container
	handlers: null, // user event handlers
	sized: false,
	sheetName: '', // default sheet name for excel export

	glue: function(elem, title) {
		// glue to DOM element
		// elem can be ID or actual DOM element object
		this.domElement = ZeroClipboard_TableTools.$(elem);

		// float just above object, or zIndex 99 if dom element isn't set
		var zIndex = 99;
		if (this.domElement.style.zIndex) {
			zIndex = parseInt(this.domElement.style.zIndex, 10) + 1;
		}

		// find X/Y position of domElement
		var box = ZeroClipboard_TableTools.getDOMObjectPosition(this.domElement);

		// create floating DIV above element
		this.div = document.createElement('div');
		var style = this.div.style;
		style.position = 'absolute';
		style.left = '0px';
		style.top = '0px';
		style.width = (box.width) + 'px';
		style.height = box.height + 'px';
		style.zIndex = zIndex;

		if ( typeof title != "undefined" && title !== "" ) {
			this.div.title = title;
		}
		if ( box.width !== 0 && box.height !== 0 ) {
			this.sized = true;
		}

		// style.backgroundColor = '#f00'; // debug
		if ( this.domElement ) {
			this.domElement.appendChild(this.div);
			this.div.innerHTML = this.getHTML( box.width, box.height ).replace(/&/g, '&amp;');
		}
	},

	positionElement: function() {
		var box = ZeroClipboard_TableTools.getDOMObjectPosition(this.domElement);
		var style = this.div.style;

		style.position = 'absolute';
		//style.left = (this.domElement.offsetLeft)+'px';
		//style.top = this.domElement.offsetTop+'px';
		style.width = box.width + 'px';
		style.height = box.height + 'px';

		if ( box.width !== 0 && box.height !== 0 ) {
			this.sized = true;
		} else {
			return;
		}

		var flash = this.div.childNodes[0];
		flash.width = box.width;
		flash.height = box.height;
	},

	getHTML: function(width, height) {
		// return HTML for movie
		var html = '';
		var flashvars = 'id=' + this.id +
			'&width=' + width +
			'&height=' + height;

		if (navigator.userAgent.match(/MSIE/)) {
			// IE gets an OBJECT tag
			var protocol = location.href.match(/^https/i) ? 'https://' : 'http://';
			html += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="'+protocol+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="'+width+'" height="'+height+'" id="'+this.movieId+'" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+ZeroClipboard_TableTools.moviePath+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+flashvars+'"/><param name="wmode" value="transparent"/></object>';
		}
		else {
			// all other browsers get an EMBED tag
			html += '<embed id="'+this.movieId+'" src="'+ZeroClipboard_TableTools.moviePath+'" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+width+'" height="'+height+'" name="'+this.movieId+'" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+flashvars+'" wmode="transparent" />';
		}
		return html;
	},

	hide: function() {
		// temporarily hide floater offscreen
		if (this.div) {
			this.div.style.left = '-2000px';
		}
	},

	show: function() {
		// show ourselves after a call to hide()
		this.reposition();
	},

	destroy: function() {
		// destroy control and floater
		var that = this;

		if (this.domElement && this.div) {
			$(this.div).remove();

			this.domElement = null;
			this.div = null;

			$.each( ZeroClipboard_TableTools.clients, function ( id, client ) {
				if ( client === that ) {
					delete ZeroClipboard_TableTools.clients[ id ];
				}
			} );
		}
	},

	reposition: function(elem) {
		// reposition our floating div, optionally to new container
		// warning: container CANNOT change size, only position
		if (elem) {
			this.domElement = ZeroClipboard_TableTools.$(elem);
			if (!this.domElement) {
				this.hide();
			}
		}

		if (this.domElement && this.div) {
			var box = ZeroClipboard_TableTools.getDOMObjectPosition(this.domElement);
			var style = this.div.style;
			style.left = '' + box.left + 'px';
			style.top = '' + box.top + 'px';
		}
	},

	clearText: function() {
		// clear the text to be copy / saved
		this.clipText = '';
		if (this.ready) {
			this.movie.clearText();
		}
	},

	appendText: function(newText) {
		// append text to that which is to be copied / saved
		this.clipText += newText;
		if (this.ready) { this.movie.appendText(newText) ;}
	},

	setText: function(newText) {
		// set text to be copied to be copied / saved
		this.clipText = newText;
		if (this.ready) { this.movie.setText(newText) ;}
	},

	setFileName: function(newText) {
		// set the file name
		this.fileName = newText;
		if (this.ready) {
			this.movie.setFileName(newText);
		}
	},

	setSheetData: function(data) {
		// set the xlsx sheet data
		if (this.ready) {
			this.movie.setSheetData( JSON.stringify( data ) );
		}
	},

	setAction: function(newText) {
		// set action (save or copy)
		this.action = newText;
		if (this.ready) {
			this.movie.setAction(newText);
		}
	},

	addEventListener: function(eventName, func) {
		// add user event listener for event
		// event types: load, queueStart, fileStart, fileComplete, queueComplete, progress, error, cancel
		eventName = eventName.toString().toLowerCase().replace(/^on/, '');
		if (!this.handlers[eventName]) {
			this.handlers[eventName] = [];
		}
		this.handlers[eventName].push(func);
	},

	setHandCursor: function(enabled) {
		// enable hand cursor (true), or default arrow cursor (false)
		this.handCursorEnabled = enabled;
		if (this.ready) {
			this.movie.setHandCursor(enabled);
		}
	},

	setCSSEffects: function(enabled) {
		// enable or disable CSS effects on DOM container
		this.cssEffects = !!enabled;
	},

	receiveEvent: function(eventName, args) {
		var self;

		// receive event from flash
		eventName = eventName.toString().toLowerCase().replace(/^on/, '');

		// special behavior for certain events
		switch (eventName) {
			case 'load':
				// movie claims it is ready, but in IE this isn't always the case...
				// bug fix: Cannot extend EMBED DOM elements in Firefox, must use traditional function
				this.movie = document.getElementById(this.movieId);
				if (!this.movie) {
					self = this;
					setTimeout( function() { self.receiveEvent('load', null); }, 1 );
					return;
				}

				// firefox on pc needs a "kick" in order to set these in certain cases
				if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
					self = this;
					setTimeout( function() { self.receiveEvent('load', null); }, 100 );
					this.ready = true;
					return;
				}

				this.ready = true;
				this.movie.clearText();
				this.movie.appendText( this.clipText );
				this.movie.setFileName( this.fileName );
				this.movie.setAction( this.action );
				this.movie.setHandCursor( this.handCursorEnabled );
				break;

			case 'mouseover':
				if (this.domElement && this.cssEffects) {
					//this.domElement.addClass('hover');
					if (this.recoverActive) {
						this.domElement.addClass('active');
					}
				}
				break;

			case 'mouseout':
				if (this.domElement && this.cssEffects) {
					this.recoverActive = false;
					if (this.domElement.hasClass('active')) {
						this.domElement.removeClass('active');
						this.recoverActive = true;
					}
					//this.domElement.removeClass('hover');
				}
				break;

			case 'mousedown':
				if (this.domElement && this.cssEffects) {
					this.domElement.addClass('active');
				}
				break;

			case 'mouseup':
				if (this.domElement && this.cssEffects) {
					this.domElement.removeClass('active');
					this.recoverActive = false;
				}
				break;
		} // switch eventName

		if (this.handlers[eventName]) {
			for (var idx = 0, len = this.handlers[eventName].length; idx < len; idx++) {
				var func = this.handlers[eventName][idx];

				if (typeof(func) == 'function') {
					// actual function reference
					func(this, args);
				}
				else if ((typeof(func) == 'object') && (func.length == 2)) {
					// PHP style object + method, i.e. [myObject, 'myMethod']
					func[0][ func[1] ](this, args);
				}
				else if (typeof(func) == 'string') {
					// name of function
					window[func](this, args);
				}
			} // foreach event handler defined
		} // user defined handler for event
	}
};

ZeroClipboard_TableTools.hasFlash = function ()
{
	try {
		var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
		if (fo) {
			return true;
		}
	}
	catch (e) {
		if (
			navigator.mimeTypes &&
			navigator.mimeTypes['application/x-shockwave-flash'] !== undefined &&
			navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin
		) {
			return true;
		}
	}

	return false;
};

// For the Flash binding to work, ZeroClipboard_TableTools must be on the global
// object list
window.ZeroClipboard_TableTools = ZeroClipboard_TableTools;



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Local (private) functions
 */

/**
 * If a Buttons instance is initlaised before it is placed into the DOM, Flash
 * won't be able to bind to it, so we need to wait until it is available, this
 * method abstracts that out.
 *
 * @param {ZeroClipboard} flash ZeroClipboard instance
 * @param {jQuery} node  Button
 */
var _glue = function ( flash, node )
{
	var id = node.attr('id');

	if ( node.parents('html').length ) {
		flash.glue( node[0], '' );
	}
	else {
		setTimeout( function () {
			_glue( flash, node );
		}, 500 );
	}
};

/**
 * Get the sheet name for Excel exports.
 *
 * @param {object}  config       Button configuration
 */
var _sheetname = function ( config )
{
	var sheetName = 'Sheet1';

	if ( config.sheetName ) {
		sheetName = config.sheetName.replace(/[\[\]\*\/\\\?\:]/g, '');
	}

	return sheetName;
};

/**
 * Set the flash text. This has to be broken up into chunks as the Javascript /
 * Flash bridge has a size limit. There is no indication in the Flash
 * documentation what this is, and it probably depends upon the browser.
 * Experimentation shows that the point is around 50k when data starts to get
 * lost, so an 8K limit used here is safe.
 *
 * @param {ZeroClipboard} flash ZeroClipboard instance
 * @param {string}        data  Data to send to Flash
 */
var _setText = function ( flash, data )
{
	var parts = data.match(/[\s\S]{1,8192}/g) || [];

	flash.clearText();
	for ( var i=0, len=parts.length ; i<len ; i++ )
	{
		flash.appendText( parts[i] );
	}
};

/**
 * Get the newline character(s)
 *
 * @param {object}  config Button configuration
 * @return {string}        Newline character
 */
var _newLine = function ( config )
{
	return config.newline ?
		config.newline :
		navigator.userAgent.match(/Windows/) ?
			'\r\n' :
			'\n';
};

/**
 * Combine the data from the `buttons.exportData` method into a string that
 * will be used in the export file.
 *
 * @param  {DataTable.Api} dt     DataTables API instance
 * @param  {object}        config Button configuration
 * @return {object}               The data to export
 */
var _exportData = function ( dt, config )
{
	var newLine = _newLine( config );
	var data = dt.buttons.exportData( config.exportOptions );
	var boundary = config.fieldBoundary;
	var separator = config.fieldSeparator;
	var reBoundary = new RegExp( boundary, 'g' );
	var escapeChar = config.escapeChar !== undefined ?
		config.escapeChar :
		'\\';
	var join = function ( a ) {
		var s = '';

		// If there is a field boundary, then we might need to escape it in
		// the source data
		for ( var i=0, ien=a.length ; i<ien ; i++ ) {
			if ( i > 0 ) {
				s += separator;
			}

			s += boundary ?
				boundary + ('' + a[i]).replace( reBoundary, escapeChar+boundary ) + boundary :
				a[i];
		}

		return s;
	};

	var header = config.header ? join( data.header )+newLine : '';
	var footer = config.footer && data.footer ? newLine+join( data.footer ) : '';
	var body = [];

	for ( var i=0, ien=data.body.length ; i<ien ; i++ ) {
		body.push( join( data.body[i] ) );
	}

	return {
		str: header + body.join( newLine ) + footer,
		rows: body.length
	};
};


// Basic initialisation for the buttons is common between them
var flashButton = {
	available: function () {
		return ZeroClipboard_TableTools.hasFlash();
	},

	init: function ( dt, button, config ) {
		// Insert the Flash movie
		ZeroClipboard_TableTools.moviePath = DataTable.Buttons.swfPath;
		var flash = new ZeroClipboard_TableTools.Client();

		flash.setHandCursor( true );
		flash.addEventListener('mouseDown', function(client) {
			config._fromFlash = true;
			dt.button( button[0] ).trigger();
			config._fromFlash = false;
		} );

		_glue( flash, button );

		config._flash = flash;
	},

	destroy: function ( dt, button, config ) {
		config._flash.destroy();
	},

	fieldSeparator: ',',

	fieldBoundary: '"',

	exportOptions: {},

	title: '*',

	messageTop: '*',

	messageBottom: '*',

	filename: '*',

	extension: '.csv',

	header: true,

	footer: false
};


/**
 * Convert from numeric position to letter for column names in Excel
 * @param  {int} n Column number
 * @return {string} Column letter(s) name
 */
function createCellPos( n ){
	var ordA = 'A'.charCodeAt(0);
	var ordZ = 'Z'.charCodeAt(0);
	var len = ordZ - ordA + 1;
	var s = "";

	while( n >= 0 ) {
		s = String.fromCharCode(n % len + ordA) + s;
		n = Math.floor(n / len) - 1;
	}

	return s;
}

/**
 * Create an XML node and add any children, attributes, etc without needing to
 * be verbose in the DOM.
 *
 * @param  {object} doc      XML document
 * @param  {string} nodeName Node name
 * @param  {object} opts     Options - can be `attr` (attributes), `children`
 *   (child nodes) and `text` (text content)
 * @return {node}            Created node
 */
function _createNode( doc, nodeName, opts ){
	var tempNode = doc.createElement( nodeName );

	if ( opts ) {
		if ( opts.attr ) {
			$(tempNode).attr( opts.attr );
		}

		if ( opts.children ) {
			$.each( opts.children, function ( key, value ) {
				tempNode.appendChild( value );
			} );
		}

		if ( opts.text !== null && opts.text !== undefined ) {
			tempNode.appendChild( doc.createTextNode( opts.text ) );
		}
	}

	return tempNode;
}

/**
 * Get the width for an Excel column based on the contents of that column
 * @param  {object} data Data for export
 * @param  {int}    col  Column index
 * @return {int}         Column width
 */
function _excelColWidth( data, col ) {
	var max = data.header[col].length;
	var len, lineSplit, str;

	if ( data.footer && data.footer[col].length > max ) {
		max = data.footer[col].length;
	}

	for ( var i=0, ien=data.body.length ; i<ien ; i++ ) {
		var point = data.body[i][col];
		str = point !== null && point !== undefined ?
			point.toString() :
			'';

		// If there is a newline character, workout the width of the column
		// based on the longest line in the string
		if ( str.indexOf('\n') !== -1 ) {
			lineSplit = str.split('\n');
			lineSplit.sort( function (a, b) {
				return b.length - a.length;
			} );

			len = lineSplit[0].length;
		}
		else {
			len = str.length;
		}

		if ( len > max ) {
			max = len;
		}

		// Max width rather than having potentially massive column widths
		if ( max > 40 ) {
			return 52; // 40 * 1.3
		}
	}

	max *= 1.3;

	// And a min width
	return max > 6 ? max : 6;
}

  var _serialiser = "";
    if (typeof window.XMLSerializer === 'undefined') {
        _serialiser = new function () {
            this.serializeToString = function (input) {
                return input.xml
            }
        };
    } else {
        _serialiser =  new XMLSerializer();
    }

    var _ieExcel;


/**
 * Convert XML documents in an object to strings
 * @param  {object} obj XLSX document object
 */
function _xlsxToStrings( obj ) {
	if ( _ieExcel === undefined ) {
		// Detect if we are dealing with IE's _awful_ serialiser by seeing if it
		// drop attributes
		_ieExcel = _serialiser
			.serializeToString(
				$.parseXML( excelStrings['xl/worksheets/sheet1.xml'] )
			)
			.indexOf( 'xmlns:r' ) === -1;
	}

	$.each( obj, function ( name, val ) {
		if ( $.isPlainObject( val ) ) {
			_xlsxToStrings( val );
		}
		else {
			if ( _ieExcel ) {
				// IE's XML serialiser will drop some name space attributes from
				// from the root node, so we need to save them. Do this by
				// replacing the namespace nodes with a regular attribute that
				// we convert back when serialised. Edge does not have this
				// issue
				var worksheet = val.childNodes[0];
				var i, ien;
				var attrs = [];

				for ( i=worksheet.attributes.length-1 ; i>=0 ; i-- ) {
					var attrName = worksheet.attributes[i].nodeName;
					var attrValue = worksheet.attributes[i].nodeValue;

					if ( attrName.indexOf( ':' ) !== -1 ) {
						attrs.push( { name: attrName, value: attrValue } );

						worksheet.removeAttribute( attrName );
					}
				}

				for ( i=0, ien=attrs.length ; i<ien ; i++ ) {
					var attr = val.createAttribute( attrs[i].name.replace( ':', '_dt_b_namespace_token_' ) );
					attr.value = attrs[i].value;
					worksheet.setAttributeNode( attr );
				}
			}

			var str = _serialiser.serializeToString(val);

			// Fix IE's XML
			if ( _ieExcel ) {
				// IE doesn't include the XML declaration
				if ( str.indexOf( '<?xml' ) === -1 ) {
					str = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+str;
				}

				// Return namespace attributes to being as such
				str = str.replace( /_dt_b_namespace_token_/g, ':' );
			}

			// Safari, IE and Edge will put empty name space attributes onto
			// various elements making them useless. This strips them out
			str = str.replace( /<([^<>]*?) xmlns=""([^<>]*?)>/g, '<$1 $2>' );

			obj[ name ] = str;
		}
	} );
}

// Excel - Pre-defined strings to build a basic XLSX file
var excelStrings = {
	"_rels/.rels":
		'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
		'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+
			'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'+
		'</Relationships>',

	"xl/_rels/workbook.xml.rels":
		'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
		'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+
			'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>'+
			'<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'+
		'</Relationships>',

	"[Content_Types].xml":
		'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
		'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'+
			'<Default Extension="xml" ContentType="application/xml" />'+
			'<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />'+
			'<Default Extension="jpeg" ContentType="image/jpeg" />'+
			'<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" />'+
			'<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" />'+
			'<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" />'+
		'</Types>',

	"xl/workbook.xml":
		'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
		'<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'+
			'<fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/>'+
			'<workbookPr showInkAnnotation="0" autoCompressPictures="0"/>'+
			'<bookViews>'+
				'<workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/>'+
			'</bookViews>'+
			'<sheets>'+
				'<sheet name="" sheetId="1" r:id="rId1"/>'+
			'</sheets>'+
		'</workbook>',

	"xl/worksheets/sheet1.xml":
		'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
		'<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">'+
			'<sheetData/>'+
			'<mergeCells count="0"/>'+
		'</worksheet>',

	"xl/styles.xml":
		'<?xml version="1.0" encoding="UTF-8"?>'+
		'<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">'+
			'<numFmts count="6">'+
				'<numFmt numFmtId="164" formatCode="#,##0.00_-\ [$$-45C]"/>'+
				'<numFmt numFmtId="165" formatCode="&quot;£&quot;#,##0.00"/>'+
				'<numFmt numFmtId="166" formatCode="[$€-2]\ #,##0.00"/>'+
				'<numFmt numFmtId="167" formatCode="0.0%"/>'+
				'<numFmt numFmtId="168" formatCode="#,##0;(#,##0)"/>'+
				'<numFmt numFmtId="169" formatCode="#,##0.00;(#,##0.00)"/>'+
			'</numFmts>'+
			'<fonts count="5" x14ac:knownFonts="1">'+
				'<font>'+
					'<sz val="11" />'+
					'<name val="Calibri" />'+
				'</font>'+
				'<font>'+
					'<sz val="11" />'+
					'<name val="Calibri" />'+
					'<color rgb="FFFFFFFF" />'+
				'</font>'+
				'<font>'+
					'<sz val="11" />'+
					'<name val="Calibri" />'+
					'<b />'+
				'</font>'+
				'<font>'+
					'<sz val="11" />'+
					'<name val="Calibri" />'+
					'<i />'+
				'</font>'+
				'<font>'+
					'<sz val="11" />'+
					'<name val="Calibri" />'+
					'<u />'+
				'</font>'+
			'</fonts>'+
			'<fills count="6">'+
				'<fill>'+
					'<patternFill patternType="none" />'+
				'</fill>'+
				'<fill>'+ // Excel appears to use this as a dotted background regardless of values but
					'<patternFill patternType="none" />'+ // to be valid to the schema, use a patternFill
				'</fill>'+
				'<fill>'+
					'<patternFill patternType="solid">'+
						'<fgColor rgb="FFD9D9D9" />'+
						'<bgColor indexed="64" />'+
					'</patternFill>'+
				'</fill>'+
				'<fill>'+
					'<patternFill patternType="solid">'+
						'<fgColor rgb="FFD99795" />'+
						'<bgColor indexed="64" />'+
					'</patternFill>'+
				'</fill>'+
				'<fill>'+
					'<patternFill patternType="solid">'+
						'<fgColor rgb="ffc6efce" />'+
						'<bgColor indexed="64" />'+
					'</patternFill>'+
				'</fill>'+
				'<fill>'+
					'<patternFill patternType="solid">'+
						'<fgColor rgb="ffc6cfef" />'+
						'<bgColor indexed="64" />'+
					'</patternFill>'+
				'</fill>'+
			'</fills>'+
			'<borders count="2">'+
				'<border>'+
					'<left />'+
					'<right />'+
					'<top />'+
					'<bottom />'+
					'<diagonal />'+
				'</border>'+
				'<border diagonalUp="false" diagonalDown="false">'+
					'<left style="thin">'+
						'<color auto="1" />'+
					'</left>'+
					'<right style="thin">'+
						'<color auto="1" />'+
					'</right>'+
					'<top style="thin">'+
						'<color auto="1" />'+
					'</top>'+
					'<bottom style="thin">'+
						'<color auto="1" />'+
					'</bottom>'+
					'<diagonal />'+
				'</border>'+
			'</borders>'+
			'<cellStyleXfs count="1">'+
				'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" />'+
			'</cellStyleXfs>'+
			'<cellXfs count="61">'+
				'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
					'<alignment horizontal="left"/>'+
				'</xf>'+
				'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
					'<alignment horizontal="center"/>'+
				'</xf>'+
				'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
					'<alignment horizontal="right"/>'+
				'</xf>'+
				'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
					'<alignment horizontal="fill"/>'+
				'</xf>'+
				'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
					'<alignment textRotation="90"/>'+
				'</xf>'+
				'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
					'<alignment wrapText="1"/>'+
				'</xf>'+
				'<xf numFmtId="9"   fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
				'<xf numFmtId="164" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
				'<xf numFmtId="165" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
				'<xf numFmtId="166" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
				'<xf numFmtId="167" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
				'<xf numFmtId="168" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
				'<xf numFmtId="169" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
				'<xf numFmtId="3" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
				'<xf numFmtId="4" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
			'</cellXfs>'+
			'<cellStyles count="1">'+
				'<cellStyle name="Normal" xfId="0" builtinId="0" />'+
			'</cellStyles>'+
			'<dxfs count="0" />'+
			'<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4" />'+
		'</styleSheet>'
};
// Note we could use 3 `for` loops for the styles, but when gzipped there is
// virtually no difference in size, since the above can be easily compressed

// Pattern matching for special number formats. Perhaps this should be exposed
// via an API in future?
var _excelSpecials = [
	{ match: /^\-?\d+\.\d%$/,       style: 60, fmt: function (d) { return d/100; } }, // Precent with d.p.
	{ match: /^\-?\d+\.?\d*%$/,     style: 56, fmt: function (d) { return d/100; } }, // Percent
	{ match: /^\-?\$[\d,]+.?\d*$/,  style: 57 }, // Dollars
	{ match: /^\-?£[\d,]+.?\d*$/,   style: 58 }, // Pounds
	{ match: /^\-?€[\d,]+.?\d*$/,   style: 59 }, // Euros
	{ match: /^\([\d,]+\)$/,        style: 61, fmt: function (d) { return -1 * d.replace(/[\(\)]/g, ''); } },  // Negative numbers indicated by brackets
	{ match: /^\([\d,]+\.\d{2}\)$/, style: 62, fmt: function (d) { return -1 * d.replace(/[\(\)]/g, ''); } },  // Negative numbers indicated by brackets - 2d.p.
	{ match: /^[\d,]+$/,            style: 63 }, // Numbers with thousand separators
	{ match: /^[\d,]+\.\d{2}$/,     style: 64 }  // Numbers with 2d.p. and thousands separators
];



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables options and methods
 */

// Set the default SWF path
DataTable.Buttons.swfPath = '//cdn.datatables.net/buttons/'+DataTable.Buttons.version+'/swf/flashExport.swf';

// Method to allow Flash buttons to be resized when made visible - as they are
// of zero height and width if initialised hidden
DataTable.Api.register( 'buttons.resize()', function () {
	$.each( ZeroClipboard_TableTools.clients, function ( i, client ) {
		if ( client.domElement !== undefined && client.domElement.parentNode ) {
			client.positionElement();
		}
	} );
} );


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Button definitions
 */

// Copy to clipboard
DataTable.ext.buttons.copyFlash = $.extend( {}, flashButton, {
	className: 'buttons-copy buttons-flash',

	text: function ( dt ) {
		return dt.i18n( 'buttons.copy', 'Copy' );
	},

	action: function ( e, dt, button, config ) {
		// Check that the trigger did actually occur due to a Flash activation
		if ( ! config._fromFlash ) {
			return;
		}

		this.processing( true );

		var flash = config._flash;
		var exportData = _exportData( dt, config );
		var info = dt.buttons.exportInfo( config );
		var newline = _newLine(config);
		var output = exportData.str;

		if ( info.title ) {
			output = info.title + newline + newline + output;
		}

		if ( info.messageTop ) {
			output = info.messageTop + newline + newline + output;
		}

		if ( info.messageBottom ) {
			output = output + newline + newline + info.messageBottom;
		}

		if ( config.customize ) {
			output = config.customize( output, config, dt );
		}

		flash.setAction( 'copy' );
		_setText( flash, output );

		this.processing( false );

		dt.buttons.info(
			dt.i18n( 'buttons.copyTitle', 'Copy to clipboard' ),
			dt.i18n( 'buttons.copySuccess', {
				_: 'Copied %d rows to clipboard',
				1: 'Copied 1 row to clipboard'
			}, data.rows ),
			3000
		);
	},

	fieldSeparator: '\t',

	fieldBoundary: ''
} );

// CSV save file
DataTable.ext.buttons.csvFlash = $.extend( {}, flashButton, {
	className: 'buttons-csv buttons-flash',

	text: function ( dt ) {
		return dt.i18n( 'buttons.csv', 'CSV' );
	},

	action: function ( e, dt, button, config ) {
		// Set the text
		var flash = config._flash;
		var data = _exportData( dt, config );
		var info = dt.buttons.exportInfo( config );
		var output = config.customize ?
			config.customize( data.str, config, dt ) :
			data.str;

		flash.setAction( 'csv' );
		flash.setFileName( info.filename );
		_setText( flash, output );
	},

	escapeChar: '"'
} );

// Excel save file - this is really a CSV file using UTF-8 that Excel can read
DataTable.ext.buttons.excelFlash = $.extend( {}, flashButton, {
	className: 'buttons-excel buttons-flash',

	text: function ( dt ) {
		return dt.i18n( 'buttons.excel', 'Excel' );
	},

	action: function ( e, dt, button, config ) {
		this.processing( true );

		var flash = config._flash;
		var rowPos = 0;
		var rels = $.parseXML( excelStrings['xl/worksheets/sheet1.xml'] ) ; //Parses xml
		var relsGet = rels.getElementsByTagName( "sheetData" )[0];

		var xlsx = {
			_rels: {
				".rels": $.parseXML( excelStrings['_rels/.rels'] )
			},
			xl: {
				_rels: {
					"workbook.xml.rels": $.parseXML( excelStrings['xl/_rels/workbook.xml.rels'] )
				},
				"workbook.xml": $.parseXML( excelStrings['xl/workbook.xml'] ),
				"styles.xml": $.parseXML( excelStrings['xl/styles.xml'] ),
				"worksheets": {
					"sheet1.xml": rels
				}

			},
			"[Content_Types].xml": $.parseXML( excelStrings['[Content_Types].xml'])
		};

		var data = dt.buttons.exportData( config.exportOptions );
		var currentRow, rowNode;
		var addRow = function ( row ) {
			currentRow = rowPos+1;
			rowNode = _createNode( rels, "row", { attr: {r:currentRow} } );

			for ( var i=0, ien=row.length ; i<ien ; i++ ) {
				// Concat both the Cell Columns as a letter and the Row of the cell.
				var cellId = createCellPos(i) + '' + currentRow;
				var cell = null;

				// For null, undefined of blank cell, continue so it doesn't create the _createNode
				if ( row[i] === null || row[i] === undefined || row[i] === '' ) {
					if ( config.createEmptyCells === true ) {
						row[i] = '';
					}
					else {
						continue;
					}
				}

				row[i] = $.trim( row[i] );

				// Special number formatting options
				for ( var j=0, jen=_excelSpecials.length ; j<jen ; j++ ) {
					var special = _excelSpecials[j];

					// TODO Need to provide the ability for the specials to say
					// if they are returning a string, since at the moment it is
					// assumed to be a number
					if ( row[i].match && ! row[i].match(/^0\d+/) && row[i].match( special.match ) ) {
						var val = row[i].replace(/[^\d\.\-]/g, '');

						if ( special.fmt ) {
							val = special.fmt( val );
						}

						cell = _createNode( rels, 'c', {
							attr: {
								r: cellId,
								s: special.style
							},
							children: [
								_createNode( rels, 'v', { text: val } )
							]
						} );

						break;
					}
				}

				if ( ! cell ) {
					if ( typeof row[i] === 'number' || (
						row[i].match &&
						row[i].match(/^-?\d+(\.\d+)?$/) &&
						! row[i].match(/^0\d+/) )
					) {
						// Detect numbers - don't match numbers with leading zeros
						// or a negative anywhere but the start
						cell = _createNode( rels, 'c', {
							attr: {
								t: 'n',
								r: cellId
							},
							children: [
								_createNode( rels, 'v', { text: row[i] } )
							]
						} );
					}
					else {
						// String output - replace non standard characters for text output
						var text = ! row[i].replace ?
							row[i] :
							row[i].replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '');

						cell = _createNode( rels, 'c', {
							attr: {
								t: 'inlineStr',
								r: cellId
							},
							children:{
								row: _createNode( rels, 'is', {
									children: {
										row: _createNode( rels, 't', {
											text: text
										} )
									}
								} )
							}
						} );
					}
				}

				rowNode.appendChild( cell );
			}

			relsGet.appendChild(rowNode);
			rowPos++;
		};

		$( 'sheets sheet', xlsx.xl['workbook.xml'] ).attr( 'name', _sheetname( config ) );

		if ( config.customizeData ) {
			config.customizeData( data );
		}

		var mergeCells = function ( row, colspan ) {
			var mergeCells = $('mergeCells', rels);

			mergeCells[0].appendChild( _createNode( rels, 'mergeCell', {
				attr: {
					ref: 'A'+row+':'+createCellPos(colspan)+row
				}
			} ) );
			mergeCells.attr( 'count', mergeCells.attr( 'count' )+1 );
			$('row:eq('+(row-1)+') c', rels).attr( 's', '51' ); // centre
		};

		// Title and top messages
		var exportInfo = dt.buttons.exportInfo( config );
		if ( exportInfo.title ) {
			addRow( [exportInfo.title], rowPos );
			mergeCells( rowPos, data.header.length-1 );
		}

		if ( exportInfo.messageTop ) {
			addRow( [exportInfo.messageTop], rowPos );
			mergeCells( rowPos, data.header.length-1 );
		}

		// Table itself
		if ( config.header ) {
			addRow( data.header, rowPos );
			$('row:last c', rels).attr( 's', '2' ); // bold
		}

		for ( var n=0, ie=data.body.length ; n<ie ; n++ ) {
			addRow( data.body[n], rowPos );
		}

		if ( config.footer && data.footer ) {
			addRow( data.footer, rowPos);
			$('row:last c', rels).attr( 's', '2' ); // bold
		}

		// Below the table
		if ( exportInfo.messageBottom ) {
			addRow( [exportInfo.messageBottom], rowPos );
			mergeCells( rowPos, data.header.length-1 );
		}

		// Set column widths
		var cols = _createNode( rels, 'cols' );
		$('worksheet', rels).prepend( cols );

		for ( var i=0, ien=data.header.length ; i<ien ; i++ ) {
			cols.appendChild( _createNode( rels, 'col', {
				attr: {
					min: i+1,
					max: i+1,
					width: _excelColWidth( data, i ),
					customWidth: 1
				}
			} ) );
		}

		// Let the developer customise the document if they want to
		if ( config.customize ) {
			config.customize( xlsx, config, dt );
		}

		_xlsxToStrings( xlsx );

		flash.setAction( 'excel' );
		flash.setFileName( exportInfo.filename );
		flash.setSheetData( xlsx );
		_setText( flash, '' );

		this.processing( false );
	},

	extension: '.xlsx',
	
	createEmptyCells: false
} );



// PDF export
DataTable.ext.buttons.pdfFlash = $.extend( {}, flashButton, {
	className: 'buttons-pdf buttons-flash',

	text: function ( dt ) {
		return dt.i18n( 'buttons.pdf', 'PDF' );
	},

	action: function ( e, dt, button, config ) {
		this.processing( true );

		// Set the text
		var flash = config._flash;
		var data = dt.buttons.exportData( config.exportOptions );
		var info = dt.buttons.exportInfo( config );
		var totalWidth = dt.table().node().offsetWidth;

		// Calculate the column width ratios for layout of the table in the PDF
		var ratios = dt.columns( config.columns ).indexes().map( function ( idx ) {
			return dt.column( idx ).header().offsetWidth / totalWidth;
		} );

		flash.setAction( 'pdf' );
		flash.setFileName( info.filename );

		_setText( flash, JSON.stringify( {
			title:         info.title || '',
			messageTop:    info.messageTop || '',
			messageBottom: info.messageBottom || '',
			colWidth:      ratios.toArray(),
			orientation:   config.orientation,
			size:          config.pageSize,
			header:        config.header ? data.header : null,
			footer:        config.footer ? data.footer : null,
			body:          data.body
		} ) );

		this.processing( false );
	},

	extension: '.pdf',

	orientation: 'portrait',

	pageSize: 'A4',

	newline: '\n'
} );


return DataTable.Buttons;
}));


/*!
 * Print button for Buttons and DataTables.
 * 2016 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net', 'datatables.net-buttons'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net')(root, $).$;
			}

			if ( ! $.fn.dataTable.Buttons ) {
				require('datatables.net-buttons')(root, $);
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


var _link = document.createElement( 'a' );

/**
 * Clone link and style tags, taking into account the need to change the source
 * path.
 *
 * @param  {node}     el Element to convert
 */
var _styleToAbs = function( el ) {
	var url;
	var clone = $(el).clone()[0];
	var linkHost;

	if ( clone.nodeName.toLowerCase() === 'link' ) {
		clone.href = _relToAbs( clone.href );
	}

	return clone.outerHTML;
};

/**
 * Convert a URL from a relative to an absolute address so it will work
 * correctly in the popup window which has no base URL.
 *
 * @param  {string} href URL
 */
var _relToAbs = function( href ) {
	// Assign to a link on the original page so the browser will do all the
	// hard work of figuring out where the file actually is
	_link.href = href;
	var linkHost = _link.host;

	// IE doesn't have a trailing slash on the host
	// Chrome has it on the pathname
	if ( linkHost.indexOf('/') === -1 && _link.pathname.indexOf('/') !== 0) {
		linkHost += '/';
	}

	return _link.protocol+"//"+linkHost+_link.pathname+_link.search;
};


DataTable.ext.buttons.print = {
	className: 'buttons-print',

	text: function ( dt ) {
		return dt.i18n( 'buttons.print', 'Print' );
	},

	action: function ( e, dt, button, config ) {
		var data = dt.buttons.exportData(
			$.extend( {decodeEntities: false}, config.exportOptions ) // XSS protection
		);
		var exportInfo = dt.buttons.exportInfo( config );
		var columnClasses = dt
			.columns( config.exportOptions.columns )
			.flatten()
			.map( function (idx) {
				return dt.settings()[0].aoColumns[dt.column(idx).index()].sClass;
			} )
			.toArray();

		var addRow = function ( d, tag ) {
			var str = '<tr>';

			for ( var i=0, ien=d.length ; i<ien ; i++ ) {
				// null and undefined aren't useful in the print output
				var dataOut = d[i] === null || d[i] === undefined ?
					'' :
					d[i];
				var classAttr = columnClasses[i] ?
					'class="'+columnClasses[i]+'"' :
					'';

				str += '<'+tag+' '+classAttr+'>'+dataOut+'</'+tag+'>';
			}

			return str + '</tr>';
		};

		// Construct a table for printing
		var html = '<table class="'+dt.table().node().className+'">';

		if ( config.header ) {
			html += '<thead>'+ addRow( data.header, 'th' ) +'</thead>';
		}

		html += '<tbody>';
		for ( var i=0, ien=data.body.length ; i<ien ; i++ ) {
			html += addRow( data.body[i], 'td' );
		}
		html += '</tbody>';

		if ( config.footer && data.footer ) {
			html += '<tfoot>'+ addRow( data.footer, 'th' ) +'</tfoot>';
		}
		html += '</table>';

		// Open a new window for the printable table
		var win = window.open( '', '' );
		win.document.close();

		// Inject the title and also a copy of the style and link tags from this
		// document so the table can retain its base styling. Note that we have
		// to use string manipulation as IE won't allow elements to be created
		// in the host document and then appended to the new window.
		var head = '<title>'+exportInfo.title+'</title>';
		$('style, link').each( function () {
			head += _styleToAbs( this );
		} );

		try {
			win.document.head.innerHTML = head; // Work around for Edge
		}
		catch (e) {
			$(win.document.head).html( head ); // Old IE
		}

		// Inject the table and other surrounding information
		win.document.body.innerHTML =
			'<h1>'+exportInfo.title+'</h1>'+
			'<div>'+(exportInfo.messageTop || '')+'</div>'+
			html+
			'<div>'+(exportInfo.messageBottom || '')+'</div>';

		$(win.document.body).addClass('dt-print-view');

		$('img', win.document.body).each( function ( i, img ) {
			img.setAttribute( 'src', _relToAbs( img.getAttribute('src') ) );
		} );

		if ( config.customize ) {
			config.customize( win, config, dt );
		}

		// Allow stylesheets time to load
		var autoPrint = function () {
			if ( config.autoPrint ) {
				win.print(); // blocking - so close will not
				win.close(); // execute until this is done
			}
		};

		if ( navigator.userAgent.match(/Trident\/\d.\d/) ) { // IE needs to call this without a setTimeout
			autoPrint();
		}
		else {
			win.setTimeout( autoPrint, 1000 );
		}
	},

	title: '*',

	messageTop: '*',

	messageBottom: '*',

	exportOptions: {},

	header: true,

	footer: false,

	autoPrint: true,

	customize: null
};


return DataTable.Buttons;
}));


