# Accessible Ranking

Simple accessible ranking tool using [dnd-kit](https://dndkit.com/).

## Usage

Just add the items by adding them in the query string in the URL, separated by `%0A`, the newline character. You can use a simple URL decoder online to make this easier.

For example:

[http://localhost:5173/?text=test1%0Atest2%0Atest3](http://localhost:5173/?text=test1%0Atest2%0Atest3)

or

[http://localhost:5173/?text=Journey+Planning%0D%0ATravel+to+transport+pickup+point%0D%0AArriving+at+pickup+point%0D%0AHailing+the+correct+service%0D%0ABoarding+the+chosen+mode+of+transport%0D%0ATravel+to+the+destination%0D%0APaying+the+fare%0D%0AGetting+to+the+desired+destination%0D%0AAlighting+from+the+transport+mode](http://localhost:5173/?text=Journey+Planning%0D%0ATravel+to+transport+pickup+point%0D%0AArriving+at+pickup+point%0D%0AHailing+the+correct+service%0D%0ABoarding+the+chosen+mode+of+transport%0D%0ATravel+to+the+destination%0D%0APaying+the+fare%0D%0AGetting+to+the+desired+destination%0D%0AAlighting+from+the+transport+mode)
