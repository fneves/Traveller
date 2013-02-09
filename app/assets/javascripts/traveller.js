Journal = function(options) {

    var journal = null;

    function bindActions() {
        $('.submit-story').each(function (index, value) {
            $(value).click(function (e) {
                e.preventDefault();
                var inputs = $(value).closest('form').find(':checked,:selected,:text,textarea');
                var data = {};
                inputs.each(function (index, elem) {
                    data[$(elem).attr('id')] = $(elem).val();
                });
                createStory(data)
            })
        });
    }

    function bindNavigationControls() {
        $(window).bind('keydown', function (e) {
            if (e.target && e.target.tagName.toLowerCase() != 'input')
                if (e.keyCode == 37)
                    journal.turn('previous');
                else if (e.keyCode == 39)
                    journal.turn('next');
        });
    }

    function getCurrentPage() {
        return journal.turn('page');
    }

    function getPageTimeStamp() {
        var page = getCurrentPage();
        return $('.page .p' + page + ' .timestamp').val();
    }

    function addPages(range, book) {
        var pagesToUpdate = {};
        //pre-populate the pages with loading gif
        for (var page = range[0]; page <= range[1]; page++){
            // Check if the page is not in the book
            if (!book.turn('hasPage', page)) {
                // Create an element for this page
                var element = $('<div />').html('Loading…');
                // Add the page
                book.turn('addPage', element, page);
                pagesToUpdate[page+''] = element;
            }
        }

        // Get the data for this page
        var url = "app?method=get-page-content&page="+page;
        var req = {
            pages: range,
            entry: getPageTimeStamp(),
            currentPage : getCurrentPage()
        }
        //TODO
//        $.getJSON(url,req, function(data) {
//            $.each(data,function( key, value ){
//                pagesToUpdate[key].html(value);
//            });
//        });
    }

    function bindNavigationEvents(){
        journal.bind('turning',function(event,page,view){
            var range = $(this).turn('range', page);
            addPages(range, $(this));
        });
    }

    function bindControls() {
        bindNavigationControls();
        bindNavigationEvents()
    }

    function bindEvents() {
        bindActions();
        bindControls();
    }

    function addFrontCover() {
        var frontCover = $("#frontCover").html();
        var element = $("#cover").html();
//        journal.turn("removePage", 1);
        journal.turn('addPage', element, 1);
//        journal.turn("removePage", 2);
        journal.turn('addPage', frontCover, 2);
    }

    function addBackCover() {
        var backCover = $("#backCover").html();
        var element = $("#backCover").html();
//        journal.turn("removePage", getTotalPages()-1);
        journal.turn('addPage', element, getTotalPages()-1);
//        journal.turn("removePage", getTotalPages());
        journal.turn('addPage', backCover, getTotalPages());
    }

    function addNewStoryPage() {
        var editPage = $("#editPage").html();
        var page = getTotalPages()-2;
        $('.page.p' + page).html(editPage);
    }

    function getTotalPages() {
        return journal.turn('pages');
    }

    function createBook(options) {
        journal.turn({pages: options.pages});
        addFrontCover();
        addBackCover();
        addNewStoryPage();
        bindEvents();
        var size = getTotalPages();
        journal.turn('page', size - 1);
    }

    function createStory(data) {
        $.ajax
        ({
            type: "POST",
            //the url where you want to sent the userName and password to
            url: '/day_entries.json',
            dataType: 'json',
            async: false,
            //json object to sent to the authentication url
            data: {'day_entry': data }

        })
            .done(function(data){
                console.log(data);
                $('.flash-container').html('<p> Story Added!</p>');
            })
            .fail(function(data){
                console.log(data);
                $('.flash-container').html('<p> Error!</p>');
            });
    }

    var initialize = function(options){
        journal = $("#" + options.id);
        createBook(options);
    };

    initialize(options);

    return {

    }
}