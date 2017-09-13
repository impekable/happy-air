#!/bin/sh

# Sets the build number to the current git commit count (plus hash number and local changes status)
# Based on http://blog.jaredsinclair.com/post/97193356620/the-best-of-all-possible-xcode-automated-build

git=`sh /etc/profile; which git`

numberOfRevisions=`"$git" rev-list HEAD | wc -l | sed -e 's/^[ \t]*//'`
currentBranchName=`"$git" rev-parse --abbrev-ref HEAD`
lastCommitHash=`"$git" rev-parse --short HEAD`

numberOfChangedLines=`"$git" diff HEAD --numstat | sed -e "s/$(printf '\t')/+/g" | cut -d '+' -f 1,2 | paste -s -d + - | bc`

if [[ $numberOfChangedLines -ne 0 ]]; then
localChangesStatus="+$numberOfChangedLines"
fi

if [ $CONFIGURATION = "Debug" ]; then
buildNumber="$numberOfRevisions $currentBranchName@$lastCommitHash$localChangesStatus"
else
buildNumber="$numberOfRevisions"
fi

infoPlistPath="$TARGET_BUILD_DIR/$INFOPLIST_PATH"

/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $buildNumber" "$infoPlistPath"

echo "Updated CFBundleVersion to '$buildNumber' in $infoPlistPath"


