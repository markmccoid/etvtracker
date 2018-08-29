## Constants

<dl>
<dt><a href="#getSidebarData">getSidebarData</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Returns data need for display of shows in sidebar</p>
</dd>
<dt><a href="#getAllShowData">getAllShowData</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Returns all TVShowData in array format</p>
</dd>
<dt><a href="#getCurrentShow">getCurrentShow</a> ⇒ <code>object</code></dt>
<dd><p>Returns on object with show data for the showId passed in</p>
</dd>
<dt><a href="#getCurrentSeasons">getCurrentSeasons</a> ⇒ <code>object</code></dt>
<dd><p>Returns an object with the season data for the showId passed in</p>
</dd>
<dt><a href="#getExtraDataForShow">getExtraDataForShow</a> ⇒ <code>object</code></dt>
<dd><p>Returns an object with the extraData for the showId passed in</p>
</dd>
<dt><a href="#getUserEpisodeData">getUserEpisodeData</a> ⇒ <code>object</code></dt>
<dd><p>Returns an object with the userData for the showId passed in.  Will be in the format of
{ 12332: { //Season ID <br />
   55645:{ //Episode ID <br />
     download: true/false <br />
     watched: true/false <br />
    }, <br />
   52333: { //Episode ID <br />
     downloaded: true/false, <br />
     watched: true/false <br />
    }, <br />
   ... <br />
  } <br />
}</p>
</dd>
<dt><a href="#getTagDataArray">getTagDataArray</a> ⇒ <code>object</code></dt>
<dd><p>Returns an array of Tag data.  All tags, plus a flag &quot;isMember&quot; telling if the show is a member of the tag</p>
</dd>
<dt><a href="#getTagDataWithShowInfo">getTagDataWithShowInfo</a> ⇒ <code>object</code></dt>
<dd><p>Returns an array of Tag data with showIds and showNames of members
{
 [tagKey]: {
   members: {
     [showId]: {
       showId,
       showName,
       position
     }
   }<br> }
}</p>
</dd>
</dl>

<a name="getSidebarData"></a>

## getSidebarData ⇒ <code>Array.&lt;string&gt;</code>
Returns data need for display of shows in sidebar

**Kind**: global constant  
**Returns**: <code>Array.&lt;string&gt;</code> - Returns an array of objects with needed show data  

| Param | Type | Description |
| --- | --- | --- |
| showData | <code>object</code> | Object of showData as formatted in redux store |
| searchTerm | <code>string</code> | Search string to filter return data by (show.name) |
| tagData | <code>string</code> | from redux store |
| filterKeys | <code>string</code> | tagKeys that we are filtering by |
| andFlag | <code>boolean</code> | are we ANDing or ORing |

<a name="getAllShowData"></a>

## getAllShowData ⇒ <code>Array.&lt;string&gt;</code>
Returns all TVShowData in array format

**Kind**: global constant  
**Returns**: <code>Array.&lt;string&gt;</code> - Returns an array of objects with all tvshowdata  

| Param | Type | Description |
| --- | --- | --- |
| showData | <code>string</code> | redux showData object |

<a name="getCurrentShow"></a>

## getCurrentShow ⇒ <code>object</code>
Returns on object with show data for the showId passed in

**Kind**: global constant  
**Returns**: <code>object</code> - Returns an object of show data  

| Param | Type | Description |
| --- | --- | --- |
| showId | <code>number</code> | Id of show to return data for |
| showData | <code>object</code> | Object of objects of showData as formatted in redux store |
| userData | <code>object</code> | Object of objects of userData as formatted in redux store |

<a name="getCurrentSeasons"></a>

## getCurrentSeasons ⇒ <code>object</code>
Returns an object with the season data for the showId passed in

**Kind**: global constant  
**Returns**: <code>object</code> - Returns an object of season data  

| Param | Type | Description |
| --- | --- | --- |
| showId | <code>number</code> | Id of show to return data for |
| seasonData | <code>object</code> | Object of objects seasonData as formatted in redux store |
| userData | <code>object</code> | Object of objects seasonData as formatted in redux store |

<a name="getExtraDataForShow"></a>

## getExtraDataForShow ⇒ <code>object</code>
Returns an object with the extraData for the showId passed in

**Kind**: global constant  
**Returns**: <code>object</code> - Returns an object of season data  

| Param | Type | Description |
| --- | --- | --- |
| showId | <code>number</code> | Id of show to return data for |
| extraData | <code>object</code> | Object of extraData as formatted in redux store |

<a name="getUserEpisodeData"></a>

## getUserEpisodeData ⇒ <code>object</code>
Returns an object with the userData for the showId passed in.  Will be in the format of{ 12332: { //Season ID <br />   55645:{ //Episode ID <br />     download: true/false <br />     watched: true/false <br />    }, <br />   52333: { //Episode ID <br />     downloaded: true/false, <br />     watched: true/false <br />    }, <br />   ... <br />  } <br />}

**Kind**: global constant  
**Returns**: <code>object</code> - Returns an object of User data  

| Param | Type | Description |
| --- | --- | --- |
| showId | <code>number</code> | Id of show to return data for |
| userData | <code>object</code> | Object of Season objects with Episode Array in each season userData as formatted in redux store |

<a name="getTagDataArray"></a>

## getTagDataArray ⇒ <code>object</code>
Returns an array of Tag data.  All tags, plus a flag "isMember" telling if the show is a member of the tag

**Kind**: global constant  
**Returns**: <code>object</code> - Returns an Array of objects of tag info  

| Param | Type | Description |
| --- | --- | --- |
| showId | <code>number</code> | Id of show to return data for |
| tagData | <code>object</code> | Object of tagData |

<a name="getTagDataWithShowInfo"></a>

## getTagDataWithShowInfo ⇒ <code>object</code>
Returns an array of Tag data with showIds and showNames of members{ [tagKey]: {   members: {     [showId]: {       showId,       showName,       position     }   }    }}

**Kind**: global constant  
**Returns**: <code>object</code> - Returns an Array of objects of tag info  

| Param | Type | Description |
| --- | --- | --- |
| showData | <code>object</code> | object of showData from redux store |
| tagData | <code>object</code> | Object of tagData |

