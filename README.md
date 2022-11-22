# gousto-shortlist-chrome-extension
A Chrome extension that adds the ability to shortlist recipes on Gousto

## What does it do?

This extension adds the ability to create a temporary "shortlist" of recipes on the Gousto website.

Every week there are ~75 new recipes to choose from from which you need to pick up to 5. The "Add recipe" button only lets you select up to that maximum of 5 recipes - when you reach that limit the button becomes disabled. This is not very convenient because it is hard to keep track of which recipes you like the look of, before whittling your choices down.

This extension does two things:

1. Adds a shortlist button (👍) to each recipe, next to the existing "Add recipe" button. Pressing this will add the recipe to your shortlist. It gets highlighted in green so that it stands out as you scroll up and down. Press it again to remove a shortlisted recipe from the shortlist. You can shortlist as many recipes as you like, not constrained by the maximum of 5.

2. Adds the ability to filter the list to show only your shortlisted recipes. The extension adds a "Shortlisted" button in the bottom left. This shows the number of shortlisted recipes. Click the button to toggle the filter on and off. When the filter is applied, only shortlisted recipes will be visible. From there you can either remove recipes from the shortlist (to narrow down your choices) or add the recipes to your basket using the "Add recipe" button as normal.

## How does it work?

The extension runs automatically when visiting the menu (recipe selection) page on Gousto (any URL starting with https://www.gousto.co.uk/menu). It adds a new "shortlist" button to each recipe card on the page, and also adds a filter button in the bottom left.

The shortlisting functionality is added directly to the page itself, using simple DOM manipulation. It runs locally within the page, no data is sent out of the page or stored, so refreshing the page will lose your choices. The extension is purely a convenience tool to make the page easier to use as you make your selections.

## Installation

1. Download the code, either by:
    - cloning the repo with git, or
    - downloading it by pressing the green "Code" button, then clicking "Download Zip" and extracting the downloaded zip into a folder on your hard drive

2. In Google Chrome, enter "chrome://extensions" in the address bar and press enter

3. Click "Load unpacked" and select the folder. This should add it to your list of installed extensions. You can also turn it on and off or uninstall it from here if needed.

4. Browse to a Gousto menu and the extension should run automatically.

## Disclaimer

This is just a personal project which I wrote to make the recipe selection process more convenient. The extension is **not** provided by, supported by or endorsed by Gousto and is only intended for my own personal use. It is not published to the Chrome Web Store, nor is it sold for money.

The extension does not adversely affect Gousto servers or make any changes to the data sent to Gousto - it simply adds extra functionality as an enhancement my tweaking the DOM, just as would be possible without the extension using the browser's developer tools. It may break at any time if Gousto change the design or implementation of the menu page - as such I provide no support or guarantees that it will continue to work.