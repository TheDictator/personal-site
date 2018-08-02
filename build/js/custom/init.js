<script>
(function() {
    var formWrap = document.getElementById( 'fs-form-wrap' );

    [].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {
        new SelectFx( el, {
            stickyPlaceholder: false,
            onChange: function(val){
                document.querySelector('span.cs-placeholder').style.backgroundColor = val;
            }
        });
    } );

    new FForm( formWrap, {
        onReview : function() {
            classie.add( document.body, 'overview' );
        }
    } );
})();
</script>
<script type="text/javascript">
    $('#toTop').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 600);
    });
$(".menu").click(function(){
    $(this).parent().toggleClass("close");
});
$('.section-static').click(function() {
    $('.section-static').removeClass("active-tab");
    $(this).addClass("active-tab");
});
</script>