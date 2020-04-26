<?php 


if ( ! function_exists('redirectSebelumnya'))
{
    function redirectSebelumnya()
    {
        if (isset($_SERVER['HTTP_REFERER']))
        {
            header('Location: '.$_SERVER['HTTP_REFERER']);
        }
        else
        {
            header('Location: http://'.$_SERVER['SERVER_NAME']);
        }
        
        exit;
    }
}