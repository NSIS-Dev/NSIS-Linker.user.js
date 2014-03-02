// ==UserScript==
// @name          NSIS-Linker.user.js
// @version       0.2.16
// @date          2014-03-02
// @namespace     https://github.com/idleberg/NSIS-Linker.user.js/
// @description   Links NSIS commands found on certain webpages to the scripting reference
// @downloadURL   https://github.com/idleberg/NSIS-Linker.user.js/raw/master/NSIS-Linker.user.js
// @match         *://bitbucket.org/*.nsh*
// @match         *://bitbucket.org/*.nsi*
// @match         *://forums.winamp.com/*
// @match         *://github.com/*.nsh
// @match         *://github.com/*.nsi
// @match         *://github.com/NSIS-Dev/*
// @match         *://github.com/NSIS-Handbook/*
// @match         *://github.com/NSIS-Packages/*
// @match         *://nsis.sf.net/*
// @match         *://nsis.sourceforge.net/*
// @match         *://stackoverflow.com/*
// ==/UserScript==

/*

  Author:         Jesse Ruderman (original AutoLink script) - http://www.squarefree.com/
                  Jan T. Sott (NSIS Linker script) - http://whyeye.org
      
  License:        MPL, GPL, LGPL

*/

const timeBefore = new Date();


// FILTERS

var ref_url = "http://idleberg.github.io/NSIS.docset/Contents/Resources/Documents/html/Commands/";
var functions_url = "http://idleberg.github.io/NSIS.docset/Contents/Resources/Documents/html/Functions/";
var variables_url = "http://idleberg.github.io/NSIS.docset/Contents/Resources/Documents/html/Variables/";
var logiclib_url = "http://idleberg.github.io/NSIS.docset/Contents/Resources/Documents/html/Library/LogicLib/";
var winver_url = "http://idleberg.github.io/NSIS.docset/Contents/Resources/Documents/html/Library/WinVer/";
var filefunc_url = "http://idleberg.github.io/NSIS.docset/Contents/Resources/Documents/html/Library/FileFunc/";
var textfunc_url = "http://idleberg.github.io/NSIS.docset/Contents/Resources/Documents/html/Library/TextFunc/";
var wordfunc_url = "http://idleberg.github.io/NSIS.docset/Contents/Resources/Documents/html/Library/WordFunc/";
var memento_url = "http://idleberg.github.io/NSIS.docset/Contents/Resources/Documents/html/Library/Memento/";
var x64_url = "http://idleberg.github.io/NSIS.docset/Contents/Resources/Documents/html/Library/x64x/";


const filters = [
  
  { // Compiler Commands
    name: "NSIS Dev",
    regexp: /(?:\b)?\!(addincludedir|addplugindir|appendfile|cd|define|delfile|echo|else|endif|error|execute|finalize|getdllversionsystem|ifdef|ifmacrodef|ifmacrondef|ifndef|if|include|insertmacro|macroend|macro|packhdr|searchparse|searchreplace|tempfile|undef|verbose|warnings)\b/g,
    href: function(match) { return ref_url + match[0] + ".html"; }
  },
  { // Callback Functions
    name: "NSIS Dev",
    regexp: /(?:\b)?((?!\.)onGUIEnd|(?!\.)onGUIInit|(?!\.)onInit|(?!\.)onInstFailed|(?!\.)onInstSuccess|(?!\.)onMouseOverSection|(?!\.)onRebootFailed|(?!\.)onSelChange|(?!\.)onUserAbort|(?:\.)onVerifyInstDir|un\.onGUIEnd|un\.onGUIInit|un\.onInit|un\.onRebootFailed|un\.onSelChange|un\.onUninstFailed|un\.onUninstSuccess|un\.onUserAbort)\b/g,
    href: function(match) { return functions_url + match[0] + ".html"; }
  },
  {  // NSIS Plugins
    name: "NSIS Wiki",
    regexp: /\b([a-z0-9_]+)::(?:[a-z0-9_]+)\b/gi,
    href: function(match) { return "http://www.google.com/cse?q=" + match[1] + "+plugin+site%3Ansis.sourceforge.net&btnI"; }
  },
  { // NSIS Commands
    name: "NSIS Dev",
    regexp: /\b(?!\{|\()(Abort|AddBrandingImage|AddSize|AllowRootDirInstall|AllowSkipFiles|AutoCloseWindow|BGFont|BGGradient|BrandingText|BringToFront|Call|CallInstDLL|Caption|ChangeUI|CheckBitmap|ClearErrors|CompletedText|ComponentText|CopyFiles|CRCCheck|CreateDirectory|CreateFont|CreateShortCut|Delete|DeleteINISec|DeleteINIStr|DeleteRegKey|DeleteRegValue|DetailPrint|DetailsButtonText|DirText|DirVar|DirVerify|EnableWindow|EnumRegKey|EnumRegValue|Exch|Exec|ExecShell|ExecWait|ExpandEnvStrings|File|FileBufSize|FileClose|FileErrorText|FileOpen|FileRead|FileReadByte|FileReadUTF16LE|FileReadWord|FileSeek|FileWrite|FileWriteByte|FileWriteUTF16LE|FileWriteWord|FindClose|FindFirst|FindNext|FindWindow|FlushINI|GetCurInstType|GetCurrentAddress|GetDlgItem|GetDLLVersion|GetDLLVersionLocal|GetErrorLevel|GetFileTime|GetFileTimeLocal|GetFullPathName|GetFunctionAddress|GetInstDirError|GetLabelAddress|GetTempFileName|Goto|HideWindow|Icon|IfAbort|IfErrors|IfFileExists|IfRebootFlag|IfSilent|InitPluginsDir|InstallButtonText|InstallColors|InstallDir|InstallDirRegKey|InstProgressFlags|InstType|InstTypeGetText|InstTypeSetText|IntCmp|IntCmpU|IntFmt|IntOp|IsWindow|LangString|LicenseBkColor|LicenseData|LicenseForceSelection|LicenseLangString|LicenseText|LoadLanguageFile|LockWindow|LogSet|LogText|ManifestDPIAware|ManifestSupportedOS|MessageBox|MiscButtonText|Name|Nop|OutFile|Page|Page|PageCallbacks|Pop|Push|Quit|ReadEnvStr|ReadINIStr|ReadRegDWORD|ReadRegStr|Reboot|RegDLL|Rename|RequestExecutionLevel|ReserveFile|Return|RMDir|SearchPath|SectionGetFlags|SectionGetInstTypes|SectionGetSize|SectionGetText|SectionIn|SectionSetFlags|SectionSetInstTypes|SectionSetSize|SectionSetText|SendMessage|SetAutoClose|SetBrandingImage|SetCompress|SetCompressor|SetCompressorDictSize|SetCtlColors|SetCurInstType|SetDatablockOptimize|SetDateSave|SetDetailsPrint|SetDetailsView|SetErrorLevel|SetErrors|SetFileAttributes|SetFont|SetOutPath|SetOverwrite|SetPluginUnload|SetRebootFlag|SetRegView|SetShellVarContext|SetSilent|ShowInstDetails|ShowUninstDetails|ShowWindow|SilentInstall|SilentUnInstall|Sleep|SpaceTexts|StrCmp|StrCmpS|StrCpy|StrLen|SubCaption|Unicode|UninstallButtonText|UninstallCaption|UninstallIcon|UninstallSubCaption|UninstallText|UninstPage|UninstPage|UnRegDLL|Var|VIAddVersionKey|VIFileVersion|VIProductVersion|WindowIcon|WriteINIStr|WriteRegBin|WriteRegDWORD|WriteRegExpandStr|WriteRegStr|WriteUninstaller|XPStyle)(?!\}|\))\b/g,
    href: function(match) { return ref_url + match[1] + ".html"; }
  },
  { // NSIS Sections & Functions
    name: "NSIS Dev",
    regexp: /\b(SectionGroupEnd|SectionGroup|FunctionEnd|Function|SectionEnd|Section|SubSectionEnd|SubSection|PageExEnd|PageEx)\b/g,
    href: function(match) { return ref_url + match[1] + ".html"; }
  },
  { // NSIS Variables
    name: "NSIS Dev",
    regexp: /(?:\$)(\{__DATE__\}|\{__FILE__\}|\{__FILEDIR__\}|\{__LINE__\}|\{__TIME__\}|\{__TIMESTAMP__\}|\{NSIS_MAX_STRLEN\}|\{NSIS_VERSION\}|\{NSISDIR\}|ADMINTOOLS|APPDATA|CDBURN_AREA|CMDLINE|COMMONFILES|COOKIES|DESKTOP|DOCUMENTS|EXEDIR|EXEFILE|EXEPATH|FAVORITES|FONTS|HISTORY|HWNDPARENT|INSTDIR|INTERNET_CACHE|LANGUAGE|LOCALAPPDATA|MUSIC|NETHOOD|OUTDIR|PICTURES|PLUGINSDIR|PRINTHOOD|PROFILE|PROGRAMFILES|QUICKLAUNCH|RECENT|RESOURCES_LOCALIZED|RESOURCES|SENDTO|SMPROGRAMS|SMSTARTUP|STARTMENU|SYSDIR|TEMP|TEMPLATES|VIDEOS|WINDIR)/g,
    href: function(match) { return variables_url + match[1] + ".html"; }
  },
  { // LogicLib
    name: "NSIS Dev",
    regexp: /(?:\$\{)(Abort|AndIf|AndIfNot|Case|Cmd|Do|LoopUntil|DoUntil|Else|ElseIf|ElseIfNot|ElseUnless|EndIf|EndWhile|Errors|ExitDo|ExitWhile|FileExists|For|ForEach|If|IfCmd|IfNot|IfThen|IfThenNot|Loop|Next|OrIfNot|RebootFlag|SectionIsBold|SectionIsExpanded|SectionIsPartiallySelected|SectionIsReadOnly|SectionIsSectionGroup|SectionIsSectionGroupEnd|SectionIsSelected|Select|Silent|Switch|Unless|While)(?:\})/g,
    href: function(match) { return logiclib_url + match[1] + ".html"; }
  },
  { // WinVer
    name: "NSIS Dev",
    regexp: /(?:\$\{)(AtLeastServicePack|AtLeastWin2000|AtLeastWin2003|AtLeastWin2008|AtLeastWin2008R2|AtLeastWin2012|AtLeastWin7|AtLeastWin8|AtLeastWin95|AtLeastWin98|AtLeastWinME|AtLeastWinNT4|AtLeastWinVista|AtLeastWinXP|AtMostServicePack|AtMostWin2000|AtMostWin2003|AtMostWin2008|AtMostWin2008R2|AtMostWin2012|AtMostWin7|AtMostWin8|AtMostWin95|AtMostWin98|AtMostWinME|AtMostWinNT4|AtMostWinVista|AtMostWinXP|IsNT|IsServer|IsServicePack|IsWin2000|IsWin2003|IsWin2008|IsWin2008R2|IsWin2012|IsWin7|IsWin8|IsWin95|IsWin98|IsWinME|IsWinNT4|IsWinVista|IsWinXP)(?:\})/g,
    href: function(match) { return winver_url + match[1] + ".html"; }
  },
  { // FileFunc
    name: "NSIS Dev",
    regexp: /(?:\$\{)(BannerTrimPath|DirState|DriveSpace|GetBaseName|GetDrives|GetExeName|GetExePath|GetFileAttributes|GetFileExt|GetFileName|GetFileVersion|GetOptions|GetOptionsS|GetParameters|GetParent|GetRoot|GetSize|GetTime|Locate|RefreshShellIcons)(?:\})/g,
    href: function(match) { return filefunc_url + match[1] + ".html"; }
  },
  { // TextFunc
    name: "NSIS Dev",
    regexp: /(?:\$\{)(ConfigRead|ConfigReadS|ConfigWrite|ConfigWriteS|FileJoin|FileReadFromEnd|FileRecode|LineFind|LineRead|LineSum|TextCompare|TextCompareS|TrimNewLines)(?:\})/g,
    href: function(match) { return textfunc_url + match[1] + ".html"; }
  },
  { // WordFunc
    name: "NSIS Dev",
    regexp: /(?:\$\{)(StrFilter|StrFilterS|VersionCompare|WordAdd|WordAddS|WordFind|WordFind2x|WordFind2xS|WordFind3x|WordFind3xS|WordFindS|WordInsert|WordInsertS|WordReplace|WordReplaceS)(?:\})/g,
    href: function(match) { return wordfunc_url + match[1] + ".html"; }
  },
  { // x64
    name: "NSIS Dev",
    regexp: /(?:\$\{)(DisableX64FSRedirection|EnableX64FSRedirection|RunningX64)(?:\})/g,
    href: function(match) { return x64_url + match[1] + ".html"; }
  },
  { // Memento
    name: "NSIS Dev",
    regexp: /(?:\$\{)(MementoSection|MementoSectionEnd|MementoSectionRestore|MementoSectionSave|MementoUnselectedSection)(?:\})/g,
    href: function(match) { return memento_url + match[1] + ".html"; }
  },
];


// HELPER FUNCTIONS

function digits(s)
{
  return s.replace(/[^0-9]/g, "");
}

function alphanumerics(s)
{
  return s.replace(/[^0-9a-z]/ig, "");
}


// LINK STYLING

function styleLink(a, filter)
{
  a.style.textDecoration = "underline";
  a.style.color = "inherit";
}


// FIX FILTERS

function fixFilters()
{
  var i, r;
  for (i = 0; r = filters[i]; ++i) {
    // lowercase, and replace each run of non-alphanumerics with a single hyphen
    r.classNamePart = r.name.toLowerCase().replace(/[^0-9a-z]+/ig, "-");
    if(!r.regexp.global)
      alert("AutoLink filter " + r.name + " is not global! This will break stuff!");
  }
}
fixFilters();


// WHEN AND WHERE TO RUN

var moddingDOM = false;

window.addEventListener("load", init, false);
function init()
{
  document.addEventListener("DOMNodeInserted", nodeInserted, false);
  setTimeout(go, 50, document.body);
}

// This makes it work at Gmail.
// 20% performance penalty on a plain text file with a link on almost every line.
// Tiny performance penalty on pages with few automatically added links.
function nodeInserted(e)
{
  // our own modifications should not trigger this.
  // (we don't want our regular expression objects getting confused)
  // (we want better control over when we recurse)
  
  //GM_log("Inserted: " + e.target);
  
  if (!moddingDOM)
    go(e.target);
}

// DOM TRAVERSAL

// Ignore all children of these elements.
const skippedElements = { 
  a:        true, // keeps us from screwing with existing links. keeps us from recursing to death :)
  noscript: true, // noscript has uninterpreted, unshown text children; don't waste time+sanity there.
  head:     true,
  script:   true,
  style:    true,
  textarea: true,
  label:    true,
  select:   true,
  button:   true,
  h1:     true,
  h2:     true,
  h3:     true,
  h4:     true
}

const gmail = (location.host == "gmail.google.com");

function skipChildren(node)
{
  if (node.tagName)  // !
  {
    if (skippedElements[node.tagName.toLowerCase()]) {
      return true;
    }
    
    if (gmail) {
      if (node.className == "ac") // gmail autocomplete (fake dropdown)
        return true;
      if (node.className == "ilc sxs") // invite foo to gmail (fake link/button)
        return true;
    }
  }

  return false;
}


function go(traversalRoot)
{
  var m;
  
  // Ensure we're not already in a forbidden element.
  for (m = traversalRoot; m != undefined; m = m.parentNode) {
    if (skipChildren(m)) {
      return;
    }
  }

  // work around bug, or in case previous user scripts did crazy stuff
  traversalRoot.normalize();

  function cont(n, didChildren)
  {
    var k = 0; // split work into chunks so Firefox doesn't freeze
    var q;
    
    while (n && k < 100)
    {
      ++k;
    
      // Do stuff at this node
      if (!didChildren && n.nodeType == 3) {
        if((q = runFiltersOnTextNode(n))) {
          n = q[0];

          // if there were changes, run filters again on the new text node that's here          
          if (q[1]) 
            continue;
        }
      }
  
      // Traverse to the "next" node in depth-first order

      if (!n.firstChild)
        didChildren = true;
  
      if (didChildren && n == traversalRoot)
        break;
      else if (!didChildren && n.firstChild && !skipChildren(n)) {
        n = n.firstChild;
        // didChildren is already false and should stay false
      }
      else {
        if (n.nextSibling) {
          n = n.nextSibling;
          didChildren = false;
        }
        else {
          n = n.parentNode;
          didChildren = true;
        }
      }
    } // end while
  
    if (!n) {
      //GM_log("Odd. traversalRoot was " + traversalRoot);
    }
    else if (n == traversalRoot) {
      //GM_log("Done");
      //alert("AutoLink time: " + (new Date() - timeBefore))
    }
    else {
      // Continue after 10ms.
      //GM_log("will have to continue");
      setTimeout(cont, 10, n, didChildren);
    }
    
  } // end function cont
  
  cont(traversalRoot, false);
}


// RUNNING FILTERS

// runFiltersOnTextNode
// Return: node at which to continue traversal, or |null| to mean no changes were made.

function runFiltersOnTextNode(node)
{
  // Too many variables.  Good hint that I need to split this function up :P
  var source, j, regexp, match, lastLastIndex, k, filter, href, anyChanges; // things
  var used, unused, firstUnused, lastUnused, a, parent, nextSibling; // nodes
  
  source = node.data;
  
  anyChanges = false;

  // runFiltersOnTextNode has its own do-too-much-at-once avoider thingie.
  // assumption: if there is one text node with a lot of matches,
  // it's more important to finish quickly than be transparent.
  // (e.g. plain text file FULL of links)
  // assumption: 40 * 100 = 140.
  k=0;
  
  for (j = 0; filter = filters[j]; ++j) {
    regexp = filter.regexp;
    
    if (regexp.test(source)) {

      parent = node.parentNode;
      nextSibling = node.nextSibling;

      
      regexp.lastIndex = 0;
      firstUnused = null;
      
      // Optimization from the linkify that came with Greasemonkey(?):
      // instead of splitting a text node multiple times, take advantage
      // of global regexps and substring.

      for (match = null, lastLastIndex = 0; k < 40 && (match = regexp.exec(source)); ) {
      
        // this should happen first, so RegExp.foo is still good :)
        href = genLink(filter, match); 
        
        if (href != null && href != location.href) { 
          ++k;

          unused = document.createTextNode(source.substring(lastLastIndex, match.index));
          if (!anyChanges) {
            anyChanges = true;
            parent.removeChild(node);
            firstUnused = unused;
            moddingDOM = true;
          }
          parent.insertBefore(unused, nextSibling);

          used = document.createTextNode(match[0])
  
          a = document.createElement("a");
          a.href = href;
          a.title = "Look up the " + filter.name;
          a.className = "autolink autolink-" + filter.classNamePart;
  
          styleLink(a, filter);
  
          a.appendChild(used);
          parent.insertBefore(a, nextSibling);
          
          lastLastIndex = regexp.lastIndex;
        }

      }

      if (anyChanges) {
        lastUnused = document.createTextNode(source.substring(lastLastIndex));
        parent.insertBefore(lastUnused, nextSibling);
        moddingDOM = false;
        return [firstUnused, true]
      }
      
      return [node, false];
    }
  }
  return null;
}

function genLink(filter, match)
{
  try {
    return filter.href(match); 
  }
  catch(er) {
    return "data:text/plain,Error running AutoLink function for filter: " + encodeURIComponent(filter.name) + "%0A%0A" + encodeURIComponent(er);
  }
}
