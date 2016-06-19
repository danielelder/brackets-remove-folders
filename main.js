/*jslint nomen: true, plusplus: true */
/*global define, brackets */

/** Extension to remove folders from file tree 
*/
define(function (require, exports, module) {
    "use strict";
    
    var FileSystem          = brackets.getModule("filesystem/FileSystem"),
        ProjectManager      = brackets.getModule("project/ProjectManager"),
        PreferencesManager  = brackets.getModule("preferences/PreferencesManager"),
        moduleId            = 'brackets.remove-folders',
        prefs               = PreferencesManager.getExtensionPrefs(moduleId);
    
	prefs.definePreference("folders", "array", []).on("change", function () {
		ProjectManager.getProjectRoot()._clearCachedData();
		ProjectManager.refreshFileTree();
	});
	
    FileSystem._FileSystem.prototype._indexFilter = function (path, name) {
        
        var prefs = PreferencesManager.getExtensionPrefs(moduleId),
            folders = prefs.get('folders'),
            count;
		
        if (folders) {
            for (count = 0; count < folders.length; count++) {
                if (name.match(folders[count])) {
                    return false;
                }
            }
        }
		
		return true;
    };
});
