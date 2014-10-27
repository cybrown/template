public class <$name> {
    <%loop property properties>
    <%use property>
    private <$type> <$name>;
    
    public <$type> get<$name | capitalize>() {
        return this.<$name>;
    }

    public void set<$name | capitalize>(<$type> <$name>) {
        this.<$name> = <$name>;
    }
    </%use>
    </%loop>
}
