## Constants

<dl>
<dt><a href="#getImageURLSync">getImageURLSync</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Returns the full URL to an image.</p>
</dd>
<dt><a href="#getImagesForShowSync">getImagesForShowSync</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Returns an array of image URLs. Filters and gives only &#39;en&#39; English images</p>
</dd>
<dt><a href="#getImageURL">getImageURL</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Returns the full URL to an image.</p>
</dd>
<dt><a href="#getImagesForShow">getImagesForShow</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Returns an array of image URLs. Filters and gives only &#39;en&#39; English images</p>
</dd>
<dt><a href="#dmAddTVShowData">dmAddTVShowData</a> ⇒ <code><a href="#TV">TV</a></code></dt>
<dd><p>First retrieves data from TMDb API and stores in Firebase
Then format the data and returns and object for the reducer to store in redux
Returns an object of objects -&gt; tvShow: {}, seasonData: {}, extraData: {}</p>
</dd>
<dt><a href="#dmRefreshTVShowData">dmRefreshTVShowData</a> ⇒ <code><a href="#TV">TV</a></code></dt>
<dd><p>First retrieves data from TMDb API and stores in Firebase
Then format the data and returns and object for the reducer to store in redux
Returns an object of objects -&gt; tvShow: {}, seasonData: {}, extraData: {}</p>
</dd>
<dt><a href="#dmFetchTVShowData">dmFetchTVShowData</a> ⇒ <code><a href="#TV">TV</a></code></dt>
<dd><p>First retrieves data from TMDb API and stores in Firebase
Then format the data and returns and object for the reducer to store in redux
Returns an object of objects -&gt; tvShow: {}, seasonData: {}, extraData: {}</p>
</dd>
<dt><a href="#dmUpdateUserEpisodeData">dmUpdateUserEpisodeData</a> ⇒</dt>
<dd><p>Update user downloaded or watched Data</p>
</dd>
<dt><a href="#dmUpdateAllUserFlags">dmUpdateAllUserFlags</a> ⇒</dt>
<dd><p>Update user downloaded or watched Data</p>
</dd>
<dt><a href="#dmUpdateTVPosterImage">dmUpdateTVPosterImage</a> ⇒</dt>
<dd><p>Updates the TV/showData.posterImage key</p>
</dd>
<dt><a href="#dmAddTagName">dmAddTagName</a> ⇒</dt>
<dd><p>Adds/Updates the TV/tagData</p>
</dd>
<dt><a href="#dmDeleteTagName">dmDeleteTagName</a> ⇒</dt>
<dd><p>Deletes the TV/tagData/[tagName]</p>
</dd>
<dt><a href="#dmUpdateTagPosition">dmUpdateTagPosition</a> ⇒</dt>
<dd><p>Updates the TV/tagData/[tagKey].tagPosition</p>
</dd>
<dt><a href="#dmAddTagToShow">dmAddTagToShow</a> ⇒</dt>
<dd><p>Adds the showId to the TV/tagData/[tagName]/members</p>
</dd>
<dt><a href="#dmUpdateShowPositionInTag">dmUpdateShowPositionInTag</a> ⇒</dt>
<dd><p>Updates the position of showId in the TV/tagData/[tagName]/members object</p>
</dd>
<dt><a href="#dmRemoveTagFromShow">dmRemoveTagFromShow</a> ⇒</dt>
<dd><p>Removes the showId from the TV/tagData/[tagName]/members</p>
</dd>
<dt><a href="#dmAddLinkToShow">dmAddLinkToShow</a> ⇒</dt>
<dd><p>Adds the Link info { linkName, link } the TV/extraData/[showId]/links</p>
</dd>
<dt><a href="#dmRemoveLinkFromShow">dmRemoveLinkFromShow</a> ⇒</dt>
<dd><p>Removes the Link info { linkName, link } the TV/extraData/[showId]/links</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#createSeasonData">createSeasonData(showId, season)</a> ⇒ <code>object</code></dt>
<dd><p>Part of the dmFetchTVShowData functions actions
takes the array of seasons and returns formatted object with 
seasons and episode data for each season
Returns an object -&gt; { name: , ... episodes: {}}</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#showData">showData</a> : <code>Object</code></dt>
<dd><p>Object of showIds</p>
</dd>
<dt><a href="#seasonData">seasonData</a> : <code>Object</code></dt>
<dd><p>Object {[showIds]: { showId, [seasonIds] }}
This describes the [seasonIds] object properties</p>
</dd>
<dt><a href="#TV">TV</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="getImageURLSync"></a>

## getImageURLSync ⇒ <code>Array.&lt;string&gt;</code>
Returns the full URL to an image.

**Kind**: global constant  
**Returns**: <code>Array.&lt;string&gt;</code> - full URL to the image  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| imgFileName | <code>string</code> \| <code>Array.&lt;string&gt;</code> |  | file name of the image or Array of filenames. |
| [size] | <code>string</code> | <code>&quot;m&quot;</code> | 's', *'m', 'l', 'original'. |
| [secureURL] | <code>boolean</code> | <code>true</code> | return the https or http - *true |

<a name="getImagesForShowSync"></a>

## getImagesForShowSync ⇒ <code>Array.&lt;string&gt;</code>
Returns an array of image URLs. Filters and gives only 'en' English images

**Kind**: global constant  
**Returns**: <code>Array.&lt;string&gt;</code> - Array of URLs to the images  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| showId | <code>string</code> |  | showId from TMDb API Show Search. |
| [imageType] | <code>string</code> | <code>&quot;posters&quot;</code> | *'posters', 'backdrops' |

<a name="getImageURL"></a>

## getImageURL ⇒ <code>Array.&lt;string&gt;</code>
Returns the full URL to an image.

**Kind**: global constant  
**Returns**: <code>Array.&lt;string&gt;</code> - full URL to the image  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| imgFileName | <code>string</code> \| <code>Array.&lt;string&gt;</code> |  | file name of the image or Array of filenames. |
| [size] | <code>string</code> | <code>&quot;m&quot;</code> | 's', *'m', 'l', 'original'. |
| [secureURL] | <code>boolean</code> | <code>true</code> | return the https or http - *true |

<a name="getImagesForShow"></a>

## getImagesForShow ⇒ <code>Array.&lt;string&gt;</code>
Returns an array of image URLs. Filters and gives only 'en' English images

**Kind**: global constant  
**Returns**: <code>Array.&lt;string&gt;</code> - Array of URLs to the images  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| showId | <code>string</code> |  | showId from TMDb API Show Search. |
| [imageType] | <code>string</code> | <code>&quot;posters&quot;</code> | *'posters', 'backdrops' |

<a name="dmAddTVShowData"></a>

## dmAddTVShowData ⇒ [<code>TV</code>](#TV)
First retrieves data from TMDb API and stores in FirebaseThen format the data and returns and object for the reducer to store in reduxReturns an object of objects -> tvShow: {}, seasonData: {}, extraData: {}

**Kind**: global constant  
**Returns**: [<code>TV</code>](#TV) - TV Object  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>string</code> | user id for firebase. |
| showId | <code>string</code> | showId from TMDb API Show Search. |

<a name="dmRefreshTVShowData"></a>

## dmRefreshTVShowData ⇒ [<code>TV</code>](#TV)
First retrieves data from TMDb API and stores in FirebaseThen format the data and returns and object for the reducer to store in reduxReturns an object of objects -> tvShow: {}, seasonData: {}, extraData: {}

**Kind**: global constant  
**Returns**: [<code>TV</code>](#TV) - TV Object  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>string</code> | user id for firebase. |
| showId | <code>string</code> | showId from TMDb API Show Search. |

<a name="dmFetchTVShowData"></a>

## dmFetchTVShowData ⇒ [<code>TV</code>](#TV)
First retrieves data from TMDb API and stores in FirebaseThen format the data and returns and object for the reducer to store in reduxReturns an object of objects -> tvShow: {}, seasonData: {}, extraData: {}

**Kind**: global constant  
**Returns**: [<code>TV</code>](#TV) - TV Object  

| Param | Type | Description |
| --- | --- | --- |
| showId | <code>string</code> | showId from TMDb API Show Search. |
| updateFlag | <code>boolean</code> | Flag to determine if we are adding or updating |

<a name="dmUpdateUserEpisodeData"></a>

## dmUpdateUserEpisodeData ⇒
Update user downloaded or watched Data

**Kind**: global constant  
**Returns**: promise  

| Param | Description |
| --- | --- |
| string | uid - firebase uid |
| number | showId - showId to update |
| number | seasonId - seasonId to update |
| number | episodeId - episodeId to update |
| string | userField - WATCHED/DOWNLOADED determines which field to update |
| boolean | checkboxState - true or false |

<a name="dmUpdateAllUserFlags"></a>

## dmUpdateAllUserFlags ⇒
Update user downloaded or watched Data

**Kind**: global constant  
**Returns**: promise  

| Param | Description |
| --- | --- |
| string | uid - firebase uid |
| number | showId - showId to update |
| number | seasonId - seasonId to update |
| object | episodes - episodes formatted for firebase update |
| string | userField - WATCHED/DOWNLOADED determines which field to update |
| boolean | checkboxState - true or false |

<a name="dmUpdateTVPosterImage"></a>

## dmUpdateTVPosterImage ⇒
Updates the TV/showData.posterImage key

**Kind**: global constant  
**Returns**: promise  

| Param | Description |
| --- | --- |
| string | uid - firebase uid |
| number | showId - showId to update |
| string | imageURL - image poster URL |

<a name="dmAddTagName"></a>

## dmAddTagName ⇒
Adds/Updates the TV/tagData

**Kind**: global constant  
**Returns**: promise / firebase key  

| Param | Description |
| --- | --- |
| string | uid - firebase uid |
| string | tagName - tagName |

<a name="dmDeleteTagName"></a>

## dmDeleteTagName ⇒
Deletes the TV/tagData/[tagName]

**Kind**: global constant  
**Returns**: promise  

| Param | Description |
| --- | --- |
| string | uid - firebase uid |
| string | tagName - tagName |

<a name="dmUpdateTagPosition"></a>

## dmUpdateTagPosition ⇒
Updates the TV/tagData/[tagKey].tagPosition

**Kind**: global constant  
**Returns**: promise  

| Param | Description |
| --- | --- |
| string | uid - firebase uid |
| string | tagPosArray - Array of tagKeys and tagPositions |

<a name="dmAddTagToShow"></a>

## dmAddTagToShow ⇒
Adds the showId to the TV/tagData/[tagName]/members

**Kind**: global constant  
**Returns**: promise / firebase key  

| Param | Description |
| --- | --- |
| string | uid - firebase uid |
| string | showId - tmdb showId |
| string | showName - tmdb showName **Currently not used elsewhere however it is stored in firebase |
| string | tagName - tagName |

<a name="dmUpdateShowPositionInTag"></a>

## dmUpdateShowPositionInTag ⇒
Updates the position of showId in the TV/tagData/[tagName]/members object

**Kind**: global constant  
**Returns**: promise / firebase key  

| Param | Description |
| --- | --- |
| string | uid - firebase uid |
| string | showId - tmdb showId |
| string | tagName - tagName |
| string | position - position of show in sidebar |

<a name="dmRemoveTagFromShow"></a>

## dmRemoveTagFromShow ⇒
Removes the showId from the TV/tagData/[tagName]/members

**Kind**: global constant  
**Returns**: promise / firebase key  

| Param | Description |
| --- | --- |
| string | uid - firebase uid |
| string | showMemberKey - firebase member key for this showId |
| string | tagName - tagName |

<a name="dmAddLinkToShow"></a>

## dmAddLinkToShow ⇒
Adds the Link info { linkName, link } the TV/extraData/[showId]/links

**Kind**: global constant  
**Returns**: promise / firebase key  

| Param | Description |
| --- | --- |
| string | uid - firebase uid |
| string | showId - showId from TMDb |
| object | linkObj |

<a name="dmRemoveLinkFromShow"></a>

## dmRemoveLinkFromShow ⇒
Removes the Link info { linkName, link } the TV/extraData/[showId]/links

**Kind**: global constant  
**Returns**: promise / firebase key  

| Param | Description |
| --- | --- |
| string | uid - firebase uid |
| string | linkKey - FB LinkKey |

<a name="createSeasonData"></a>

## createSeasonData(showId, season) ⇒ <code>object</code>
Part of the dmFetchTVShowData functions actionstakes the array of seasons and returns formatted object with seasons and episode data for each seasonReturns an object -> { name: , ... episodes: {}}

**Kind**: global function  
**Returns**: <code>object</code> - seasonsObj  

| Param | Type | Description |
| --- | --- | --- |
| showId | <code>string</code> | showId from TMDb API Show Search. |
| season | <code>Array.&lt;object&gt;</code> | array |

<a name="showData"></a>

## showData : <code>Object</code>
Object of showIds

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| backdropPath | <code>string</code> | url to the backdrop image |
| firstAirDate | <code>number</code> | unix time key for first airdate |
| genres | <code>array</code> | Array of genre string values |
| lastAirDate | <code>number</code> | unix time key for first airdate |
| name | <code>string</code> | The show name |
| overview | <code>string</code> | Overview of the show |
| posterPath | <code>string</code> | url to the poster image |
| showId | <code>number</code> | TMDb show Id |
| status | <code>string</code> | Status of the show. "Ended", "Returning series", etc |
| totalEpisodes | <code>number</code> | Total episode in all seasons |
| totalSeasons | <code>number</code> | Total seasons of show available |

<a name="seasonData"></a>

## seasonData : <code>Object</code>
Object {[showIds]: { showId, [seasonIds] }}This describes the [seasonIds] object properties

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| airDate | <code>number</code> | Primary data for a tvShow |
| id | <code>number</code> | Season Id from TMDb |
| name | <code>string</code> | Name of season from TMDb |
| number | <code>number</code> | The number of the season (we exclude any zero seasons returned) |
| overview | <code>string</code> | Overview of the season |
| posterPath | <code>string</code> | url to the poster image for the season |

<a name="TV"></a>

## TV : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| tvShow | <code>Object</code> | Primary data for a tvShow |
| seasonData | <code>Object</code> | The season data for the tv show (Object Key) |
| extraData | <code>Object</code> | Additional data for the tv show (Object Key) |

