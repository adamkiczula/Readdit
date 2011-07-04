var count = 25;
// TODO: CLEANUP OLD JSON SCRIPTS
function loadJSON(url)
{
  var headID = document.getElementsByTagName("head")[0];
  var newScript = document.createElement('script');
  newScript.type = 'text/javascript';
  newScript.src = url;
  headID.appendChild(newScript);
}

function processJSON(json)
{
  target = document.getElementById('links');
  target.innerHTML = '';
  // START DUPLICATE CODE
  if(json.data.before)
  {
    prev_count = count - 24;
    addLink('#', 'prev', 'changeCount(false);loadJSON(\'http://www.reddit.com/.json?count=' + prev_count + '&before=' + json.data.before + '&jsonp=processJSON\');', null, target);
    target.innerHTML += '&nbsp;|&nbsp;';
  }
  if(json.data.after)
    addLink('#', 'next', 'changeCount(true);loadJSON(\'http://www.reddit.com/.json?count=' + count + '&after=' + json.data.after + '&jsonp=processJSON\');', null, target);
  target.appendChild(addLineBreak());
  // END DUPLICATE CODE
  for(i=0; i<json.data.children.length; i++)
  {
    var newDiv = document.createElement('div');
    newDiv.id =  json.data.children[i].data.id;
    target.appendChild(newDiv);
    addLink(json.data.children[i].data.url, json.data.children[i].data.title, null, 'link_' + json.data.children[i].data.id, newDiv);
    newDiv.appendChild(document.createElement('br'));
    addLink('http://www.reddit.com' + json.data.children[i].data.permalink, json.data.children[i].data.num_comments + ' comments', null, null, newDiv);
    newDiv.innerHTML += '&nbsp;('
    addSpan(json.data.children[i].data.ups, 'upvotes', 'upvotes_' + json.data.children[i].data.id, newDiv);
    newDiv.innerHTML += '&nbsp;/&nbsp;'
    addSpan(json.data.children[i].data.downs, 'downvotes', 'downvotes_' + json.data.children[i].data.id, newDiv);
    newDiv.innerHTML += ')'
    newDiv.appendChild(addLineBreak());
  }
  if(json.data.before)
  {
    prev_count = count - 24;
    addLink('#', 'prev', 'changeCount(false);loadJSON(\'http://www.reddit.com/.json?count=' + prev_count + '&before=' + json.data.before + '&jsonp=processJSON\');', null, target);
    target.innerHTML += '&nbsp;|&nbsp;';
  }
  if(json.data.after)
    addLink('#', 'next', 'changeCount(true);loadJSON(\'http://www.reddit.com/.json?count=' + count + '&after=' + json.data.after + '&jsonp=processJSON\');', null, target);
}
function addLink(url, title, onclick, id, target)
{
  var newLink = document.createElement('a');
  newLink.href = url;
  if(id)
    newLink.id = id;
  if(onclick)
    newLink.setAttribute('onclick', onclick);
  newLink.innerHTML = title;
  //alert(newLink);
  target.appendChild(newLink);
}

function addSpan(content, span_class, span_id, target)
{
  var newSpan = document.createElement('span');
  if(span_id)
    newSpan.id = span_id;
  if(span_class)
    newSpan.setAttribute('class', span_class);
  newSpan.innerHTML = content;
  target.appendChild(newSpan);
}

function changeCount(increment)
{
  if(increment)
    count += 25;
  else
    count -= 25
}

function addLineBreak() {
	var lineBreakElement = document.createElement("div");
	lineBreakElement.setAttribute('class', 'line_break');
	
	return lineBreakElement;
}
