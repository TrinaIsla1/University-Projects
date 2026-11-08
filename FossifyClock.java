// Swing = window, panels, labels. AWT = colors, fonts, drawing. geom = shapes (rounded rectangles, arcs).
import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.awt.event.*;
import java.awt.geom.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Simple Fossify Clock look-alike (Alarm tab only).
 * Working features: + button (add alarm), set alarm time (tap an alarm), delete, on/off switch.
 */
// The whole app lives in this one class.
public class FossifyClock {
    // Colors copied from the original app, defined once and reused everywhere.
    static final Color BG = new Color(0x1D1D1F), DIALOG = new Color(0x2A2A30), NAV = new Color(0x2D2E38);
    static final Color FAB = new Color(0x8A8CA0), ACCENT = new Color(0x8E90A8), TRACK_OFF = new Color(0x4A4A4F);
    static final Color BORDER_OFF = new Color(0x8B8B90), HINT = new Color(0xA9AABD);
    // Day names for the list text; single letters for the dialog circles (index 0 = Sunday).
    static final String[] DAY_NAMES = {"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"};
    static final String[] DAY_LETTERS = {"S", "M", "T", "W", "T", "F", "S"};

    // ---------- model ----------
    // One alarm = the data the app stores. Add / edit / delete only change these objects.
    static class Alarm {
        // hour is 0-23; days[i] is true if the alarm repeats on weekday i (0 = Sunday).
        int hour, minute;
        boolean[] days = new boolean[7];
        boolean enabled, vibrate;
        String label = "";

        // Constructor. 'on' lists the ticked weekdays, e.g. 1,2,3,4,5 = Mon-Fri.
        Alarm(int hour, int minute, boolean enabled, int... on) {
            this.hour = hour; this.minute = minute; this.enabled = enabled;
            for (int d : on) days[d] = true;
        }

        // Duplicate used by the dialog, so edits don't touch the real alarm until OK is pressed.
        Alarm copy() {
            Alarm a = new Alarm(hour, minute, enabled);
            a.days = days.clone(); a.vibrate = vibrate; a.label = label;
            return a;
        }

        // Text under the time: day names, 'Every day', or Today/Tomorrow when no day is ticked.
        String daysText() {
            String prefix = label.isEmpty() ? "" : label + ", ";
            int n = 0;
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 7; i++) if (days[i]) { if (n++ > 0) sb.append(", "); sb.append(DAY_NAMES[i]); }
            if (n == 0) {
                java.util.Calendar c = java.util.Calendar.getInstance();
                boolean past = hour * 60 + minute <= c.get(java.util.Calendar.HOUR_OF_DAY) * 60 + c.get(java.util.Calendar.MINUTE);
                return prefix + (past ? "Tomorrow" : "Today");
            }
            return prefix + (n == 7 ? "Every day" : sb.toString());
        }
    }

    // Builds the big time (like 7:00 am) as HTML so the am/pm can be smaller and lighter.
    static String timeHtml(int hour, int minute) {
        int h = hour % 12 == 0 ? 12 : hour % 12;
        return "<html><body style='font-weight:normal'>"
                + "<span style='font-family:Segoe UI Light; font-size:38pt; font-weight:normal'>" + h + ":" + String.format("%02d", minute) + "</span>"
                + "<span style='font-family:Segoe UI; font-size:17pt; font-weight:normal'>&nbsp;&nbsp;" + (hour < 12 ? "am" : "pm") + "</span>"
                + "</body></html>";
    }

    // ---------- state ----------
    // The list of all alarms. This is the single source of truth for the screen.
    static final List<Alarm> alarms = new ArrayList<>();
    // Panel that holds one row per alarm, and the main window.
    static JPanel listPanel;
    static JFrame frame;

    // ---------- small custom components ----------
    // Turns on smooth edges for the custom drawing below.
    static void aa(Graphics2D g) {
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
    }

    // The on/off toggle, drawn by hand to match the original. Clicking flips it and runs onToggle.
    static class Switch extends JComponent {
        boolean on;
        Switch(boolean on, Runnable onToggle) {
            this.on = on;
            setPreferredSize(new Dimension(56, 34));
            setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
            addMouseListener(new MouseAdapter() {
                public void mousePressed(MouseEvent e) { Switch.this.on = !Switch.this.on; repaint(); onToggle.run(); }
            });
        }
        protected void paintComponent(Graphics g0) {
            Graphics2D g = (Graphics2D) g0; aa(g);
            Color c = on ? ACCENT : BORDER_OFF;
            g.setColor(on ? ACCENT : TRACK_OFF);
            g.fillRoundRect(2, 2, 52, 30, 30, 30);
            g.setStroke(new BasicStroke(2f)); g.setColor(c);
            g.drawRoundRect(2, 2, 52, 30, 30, 30);
            if (on) { g.setColor(BG); g.fillOval(28, 6, 22, 22); }
            else { g.setColor(new Color(0x9A9A9F)); g.fillOval(8, 10, 14, 14); }
        }
    }

    /** kind: 0 sort, 1 more, 2 plus, 3 vibrate, 4 bell, 5 label, 6-9 nav icons (clock, alarm, stopwatch, timer) */
    // Draws every icon (sort, more, plus, vibrate, bell, label, tab icons) from lines and ovals.
    // 'kind' chooses which icon to draw.
    static class Glyph extends JComponent {
        final int kind; Color color = Color.WHITE;
        Glyph(int kind, int size) { this.kind = kind; setPreferredSize(new Dimension(size, size)); }
        protected void paintComponent(Graphics g0) {
            Graphics2D g = (Graphics2D) g0; aa(g);
            int w = getWidth(), h = getHeight();
            g.setColor(color); g.setStroke(new BasicStroke(w / 13f, BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND));
            float u = w / 24f;
            switch (kind) {
                case 0: g.drawLine((int) (3 * u), (int) (7 * u), (int) (21 * u), (int) (7 * u));
                        g.drawLine((int) (3 * u), (int) (12 * u), (int) (15 * u), (int) (12 * u));
                        g.drawLine((int) (3 * u), (int) (17 * u), (int) (9 * u), (int) (17 * u)); break;
                case 1: for (int i = 0; i < 3; i++) g.fillOval((int) (10 * u), (int) ((4 + i * 6) * u), (int) (4 * u), (int) (4 * u)); break;
                case 2: g.setStroke(new BasicStroke(w / 11f, BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND));
                        g.drawLine(w / 2, (int) (4 * u), w / 2, (int) (20 * u));
                        g.drawLine((int) (4 * u), h / 2, (int) (20 * u), h / 2); break;
                case 3: g.draw(new RoundRectangle2D.Float(7 * u, 3 * u, 10 * u, 18 * u, 3 * u, 3 * u));
                        g.drawLine((int) (3 * u), (int) (9 * u), (int) (3 * u), (int) (15 * u));
                        g.drawLine((int) (21 * u), (int) (9 * u), (int) (21 * u), (int) (15 * u)); break;
                case 4: g.draw(new Arc2D.Float(6 * u, 3 * u, 12 * u, 12 * u, 0, 180, Arc2D.OPEN));
                        g.drawLine((int) (6 * u), (int) (9 * u), (int) (6 * u), (int) (17 * u));
                        g.drawLine((int) (18 * u), (int) (9 * u), (int) (18 * u), (int) (17 * u));
                        g.drawLine((int) (4 * u), (int) (18 * u), (int) (20 * u), (int) (18 * u));
                        g.fillOval((int) (10 * u), (int) (19 * u), (int) (4 * u), (int) (3 * u)); break;
                case 5: g.draw(new RoundRectangle2D.Float(2 * u, 4 * u, 20 * u, 16 * u, 3 * u, 3 * u));
                        g.drawLine((int) (5 * u), (int) (10 * u), (int) (10 * u), (int) (10 * u));
                        g.drawLine((int) (5 * u), (int) (15 * u), (int) (19 * u), (int) (15 * u)); break;
                case 6: g.drawOval((int) (3 * u), (int) (3 * u), (int) (18 * u), (int) (18 * u));
                        g.drawLine(w / 2, h / 2, w / 2, (int) (6.5 * u)); g.drawLine(w / 2, h / 2, (int) (16 * u), (int) (14 * u)); break;
                case 7: g.drawOval((int) (4 * u), (int) (5 * u), (int) (16 * u), (int) (16 * u));
                        g.drawLine(w / 2, (int) (13 * u), w / 2, (int) (8.5 * u)); g.drawLine(w / 2, (int) (13 * u), (int) (15 * u), (int) (15 * u));
                        g.drawLine((int) (2 * u), (int) (6 * u), (int) (6 * u), (int) (2.5 * u));
                        g.drawLine((int) (22 * u), (int) (6 * u), (int) (18 * u), (int) (2.5 * u)); break;
                case 8: g.drawOval((int) (4 * u), (int) (6 * u), (int) (16 * u), (int) (16 * u));
                        g.drawLine(w / 2, (int) (14 * u), w / 2, (int) (9.5 * u));
                        g.drawLine((int) (9 * u), (int) (2.5 * u), (int) (15 * u), (int) (2.5 * u));
                        g.drawLine(w / 2, (int) (3 * u), w / 2, (int) (6 * u)); break;
                case 9: g.drawLine((int) (6 * u), (int) (3 * u), (int) (18 * u), (int) (3 * u));
                        g.drawLine((int) (6 * u), (int) (21 * u), (int) (18 * u), (int) (21 * u));
                        Path2D p = new Path2D.Float();
                        p.moveTo(7 * u, 3 * u); p.lineTo(7 * u, 7 * u); p.lineTo(12 * u, 12 * u); p.lineTo(7 * u, 17 * u); p.lineTo(7 * u, 21 * u);
                        p.moveTo(17 * u, 3 * u); p.lineTo(17 * u, 7 * u); p.lineTo(12 * u, 12 * u); p.lineTo(17 * u, 17 * u); p.lineTo(17 * u, 21 * u);
                        g.draw(p); break;
            }
        }
    }

    // One tab in the bottom bar: icon above a text label.
    static class NavItem extends JPanel {
        NavItem(int icon, String text, boolean selected) {
            setOpaque(false);
            setLayout(new BoxLayout(this, BoxLayout.Y_AXIS));
            setBorder(new EmptyBorder(12, 0, 10, 0));
            Glyph gl = new Glyph(icon, 28);
            gl.setMaximumSize(new Dimension(28, 28)); gl.setAlignmentX(CENTER_ALIGNMENT);
            JLabel l = new JLabel(text);
            l.setFont(l.getFont().deriveFont(13f)); l.setAlignmentX(CENTER_ALIGNMENT);
            Color c = selected ? new Color(0x9A9BAD) : Color.WHITE;
            gl.color = c; l.setForeground(c);
            add(gl); add(Box.createVerticalStrut(4)); add(l);
        }
    }

    // The + button (rounded square). Runs onClick when pressed.
    static class Fab extends JComponent {
        Fab(Runnable onClick) {
            setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
            addMouseListener(new MouseAdapter() { public void mousePressed(MouseEvent e) { onClick.run(); } });
        }
        protected void paintComponent(Graphics g0) {
            Graphics2D g = (Graphics2D) g0; aa(g);
            g.setColor(FAB); g.fillRoundRect(0, 0, getWidth(), getHeight(), 22, 22);
            g.setColor(Color.WHITE); g.setStroke(new BasicStroke(3f, BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND));
            int c = getWidth() / 2;
            g.drawLine(c, c - 11, c, c + 11); g.drawLine(c - 11, c, c + 11, c);
        }
    }

    // ---------- alarm list ----------
    // Rebuilds the list on screen from 'alarms'. Called after every add, edit or delete.
    static void refresh() {
        listPanel.removeAll();
        for (Alarm a : alarms) listPanel.add(row(a));
        listPanel.revalidate(); listPanel.repaint();
    }

    // Builds one alarm row: time and days on the left, switch on the right.
    // Tapping the row opens the edit dialog for that alarm.
    static JPanel row(Alarm a) {
        JPanel row = new JPanel(new BorderLayout());
        row.setOpaque(false);
        row.setBorder(new EmptyBorder(8, 20, 8, 24));
        row.setMaximumSize(new Dimension(Integer.MAX_VALUE, 130));

        JPanel info = new JPanel();
        info.setOpaque(false);
        info.setLayout(new BoxLayout(info, BoxLayout.Y_AXIS));
        JLabel time = new JLabel(timeHtml(a.hour, a.minute));
        time.setForeground(Color.WHITE);
        JLabel days = new JLabel(a.daysText());
        days.setForeground(Color.WHITE);
        days.setFont(days.getFont().deriveFont(15f));
        days.setBorder(new EmptyBorder(0, 2, 0, 0));
        info.add(time); info.add(days);

        JPanel right = new JPanel(new GridBagLayout());
        right.setOpaque(false);
        right.add(new Switch(a.enabled, () -> a.enabled = !a.enabled));

        row.add(info, BorderLayout.CENTER);
        row.add(right, BorderLayout.EAST);
        row.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        MouseAdapter open = new MouseAdapter() { public void mousePressed(MouseEvent e) { openDialog(a); } };
        row.addMouseListener(open); info.addMouseListener(open);
        return row;
    }

    // ---------- add / edit / delete dialog ----------
    // One weekday circle (S M T W T F S) in the dialog. Click to select or unselect.
    static class DayButton extends JComponent {
        boolean on; final String letter;
        DayButton(String letter, boolean on) {
            this.letter = letter; this.on = on;
            setPreferredSize(new Dimension(38, 38));
            setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
            addMouseListener(new MouseAdapter() { public void mousePressed(MouseEvent e) { DayButton.this.on = !DayButton.this.on; repaint(); } });
        }
        protected void paintComponent(Graphics g0) {
            Graphics2D g = (Graphics2D) g0; aa(g);
            int s = Math.min(getWidth(), getHeight()) - 3;
            if (on) { g.setColor(Color.WHITE); g.fillOval(1, 1, s, s); }
            g.setColor(Color.WHITE); g.setStroke(new BasicStroke(1.5f)); g.drawOval(1, 1, s, s);
            g.setColor(on ? DIALOG : Color.WHITE);
            g.setFont(getFont().deriveFont(15f));
            FontMetrics fm = g.getFontMetrics();
            g.drawString(letter, 1 + (s - fm.stringWidth(letter)) / 2, 1 + (s + fm.getAscent() - fm.getDescent()) / 2);
        }
    }

    // Custom checkbox used for the Vibrate option.
    static class CheckBox extends JComponent {
        boolean on;
        CheckBox(boolean on) {
            this.on = on; setPreferredSize(new Dimension(26, 26));
            setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
            addMouseListener(new MouseAdapter() { public void mousePressed(MouseEvent e) { CheckBox.this.on = !CheckBox.this.on; repaint(); } });
        }
        protected void paintComponent(Graphics g0) {
            Graphics2D g = (Graphics2D) g0; aa(g);
            if (on) { g.setColor(ACCENT); g.fillRoundRect(2, 2, 22, 22, 5, 5); }
            g.setColor(on ? ACCENT : Color.WHITE); g.setStroke(new BasicStroke(2f));
            g.drawRoundRect(2, 2, 22, 22, 5, 5);
            if (on) { g.setColor(BG); g.drawLine(7, 13, 11, 18); g.drawLine(11, 18, 19, 8); }
        }
    }

    // Text field that shows grey 'Label' hint text while it is empty.
    static class HintField extends JTextField {
        HintField(String hint) {
            setOpaque(false); setForeground(Color.WHITE); setCaretColor(Color.WHITE);
            setFont(getFont().deriveFont(16f));
            setBorder(BorderFactory.createCompoundBorder(
                    BorderFactory.createLineBorder(BORDER_OFF, 1, true), new EmptyBorder(14, 14, 14, 14)));
            this.hint = hint;
        }
        final String hint;
        protected void paintComponent(Graphics g0) {
            super.paintComponent(g0);
            if (getText().isEmpty() && !isFocusOwner()) {
                Graphics2D g = (Graphics2D) g0; aa(g);
                g.setColor(BORDER_OFF); g.setFont(getFont());
                g.drawString(hint, 15, (getHeight() + g.getFontMetrics().getAscent() - g.getFontMetrics().getDescent()) / 2);
            }
        }
    }

    // Helper: a dialog row with an icon on the left, content in the middle, optional control on the right.
    static JPanel iconRow(int icon, JComponent content, JComponent trailing) {
        JPanel r = new JPanel(new BorderLayout(18, 0));
        r.setOpaque(false); r.setBorder(new EmptyBorder(10, 0, 10, 0));
        r.setMaximumSize(new Dimension(Integer.MAX_VALUE, 80));
        r.add(new Glyph(icon, 26), BorderLayout.WEST);
        r.add(content, BorderLayout.CENTER);
        if (trailing != null) r.add(trailing, BorderLayout.EAST);
        return r;
    }

    // Helper: flat text button used for Cancel / OK / Delete.
    static JButton textButton(String text, Color color) {
        JButton b = new JButton(text);
        b.setContentAreaFilled(false); b.setFocusPainted(false); b.setBorder(new EmptyBorder(8, 14, 8, 14));
        b.setForeground(color); b.setFont(b.getFont().deriveFont(16f));
        b.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        return b;
    }

    /** existing == null means "+" was pressed (new alarm). */
    // Add / edit / delete dialog.
    // existing == null means the + button was pressed (new alarm); otherwise an alarm was tapped (edit).
    static void openDialog(Alarm existing) {
        Alarm draft;
        if (existing != null) draft = existing.copy();
        else {
            draft = new Alarm(8, 0, true);
            draft.days[java.util.Calendar.getInstance().get(java.util.Calendar.DAY_OF_WEEK) - 1] = true;
        }
        final Alarm d = draft;

        // Borderless dialog; the panel below draws the rounded dark background.
        JDialog dlg = new JDialog(frame, true);
        dlg.setUndecorated(true);
        dlg.setBackground(DIALOG);
        JPanel box = new JPanel() {
            protected void paintComponent(Graphics g0) {
                Graphics2D g = (Graphics2D) g0; aa(g);
                g.setColor(DIALOG); g.fillRoundRect(0, 0, getWidth(), getHeight(), 40, 40);
            }
        };
        box.setOpaque(false);
        box.setLayout(new BoxLayout(box, BoxLayout.Y_AXIS));
        box.setBorder(new EmptyBorder(24, 24, 14, 20));

        // set the alarm time: click the big time
        JLabel time = new JLabel(timeHtml(d.hour, d.minute));
        time.setForeground(Color.WHITE);
        time.setAlignmentX(Component.LEFT_ALIGNMENT);
        time.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        time.addMouseListener(new MouseAdapter() {
            public void mousePressed(MouseEvent e) {
                JSpinner hh = new JSpinner(new SpinnerNumberModel(d.hour % 12 == 0 ? 12 : d.hour % 12, 1, 12, 1));
                JSpinner mm = new JSpinner(new SpinnerNumberModel(d.minute, 0, 59, 1));
                mm.setEditor(new JSpinner.NumberEditor(mm, "00"));
                JComboBox<String> ap = new JComboBox<>(new String[]{"am", "pm"});
                ap.setSelectedIndex(d.hour < 12 ? 0 : 1);
                JPanel p = new JPanel(new FlowLayout());
                p.add(hh); p.add(new JLabel(":")); p.add(mm); p.add(ap);
                if (JOptionPane.showConfirmDialog(dlg, p, "Set time", JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE) == JOptionPane.OK_OPTION) {
                    d.hour = ((Integer) hh.getValue()) % 12 + (ap.getSelectedIndex() == 1 ? 12 : 0);
                    d.minute = (Integer) mm.getValue();
                    time.setText(timeHtml(d.hour, d.minute));
                }
            }
        });
        box.add(time);
        box.add(Box.createVerticalStrut(14));

        JPanel dayRow = new JPanel(new GridLayout(1, 7, 4, 0));
        dayRow.setOpaque(false); dayRow.setAlignmentX(Component.LEFT_ALIGNMENT);
        dayRow.setMaximumSize(new Dimension(Integer.MAX_VALUE, 40));
        DayButton[] dayButtons = new DayButton[7];
        for (int i = 0; i < 7; i++) { dayButtons[i] = new DayButton(DAY_LETTERS[i], d.days[i]); dayRow.add(dayButtons[i]); }
        box.add(dayRow);
        box.add(Box.createVerticalStrut(14));

        CheckBox vib = new CheckBox(d.vibrate);
        JLabel vibText = new JLabel("Vibrate"); vibText.setForeground(Color.WHITE); vibText.setFont(vibText.getFont().deriveFont(17f));
        JPanel vibRow = iconRow(3, vibText, vib); vibRow.setAlignmentX(Component.LEFT_ALIGNMENT);
        box.add(vibRow);

        JLabel sound = new JLabel("Default (fairviews)"); sound.setForeground(Color.WHITE); sound.setFont(sound.getFont().deriveFont(17f));
        JPanel soundRow = iconRow(4, sound, null); soundRow.setAlignmentX(Component.LEFT_ALIGNMENT);
        box.add(soundRow);

        HintField label = new HintField("Label");
        label.setText(d.label);
        JPanel labelRow = iconRow(5, label, null); labelRow.setAlignmentX(Component.LEFT_ALIGNMENT);
        box.add(labelRow);
        box.add(Box.createVerticalStrut(10));

        JPanel buttons = new JPanel();
        buttons.setOpaque(false); buttons.setLayout(new BoxLayout(buttons, BoxLayout.X_AXIS));
        buttons.setAlignmentX(Component.LEFT_ALIGNMENT);
        if (existing != null) {
            JButton del = textButton("Delete", new Color(0xE57373));
            // DELETE: remove the alarm from the list, redraw the list, close the dialog.
            del.addActionListener(e -> { alarms.remove(existing); refresh(); dlg.dispose(); });
            buttons.add(del);
        }
        buttons.add(Box.createHorizontalGlue());
        JButton cancel = textButton("Cancel", HINT);
        cancel.addActionListener(e -> dlg.dispose());
        JButton ok = textButton("OK", HINT);
        // OK: copy the dialog values into the alarm (or add a new one), redraw the list, close.
        ok.addActionListener(e -> {
            for (int i = 0; i < 7; i++) d.days[i] = dayButtons[i].on;
            d.vibrate = vib.on; d.label = label.getText().trim(); d.enabled = true;
            if (existing == null) alarms.add(d);
            else { existing.hour = d.hour; existing.minute = d.minute; existing.days = d.days; existing.vibrate = d.vibrate; existing.label = d.label; existing.enabled = true; }
            refresh(); dlg.dispose();
        });
        buttons.add(cancel); buttons.add(Box.createHorizontalStrut(10)); buttons.add(ok);
        box.add(buttons);

        dlg.setContentPane(box);
        dlg.setSize(340, 470);
        dlg.setShape(new RoundRectangle2D.Float(0, 0, 340, 470, 40, 40));
        dlg.setLocationRelativeTo(frame);
        dlg.setVisible(true);
    }

    // ---------- main window ----------
    // Program starts here: sets the look, adds the 2 starter alarms and builds the window.
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            // Use the Windows look instead of Java's default bold "Metal" theme
            UIManager.put("swing.boldMetal", Boolean.FALSE);
            try { UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName()); } catch (Exception ignored) {}

            // Make every default Swing font Segoe UI, size 15
            Font base = new Font("Segoe UI", Font.PLAIN, 15);
            for (Object key : java.util.Collections.list(UIManager.getDefaults().keys())) {
                if (UIManager.get(key) instanceof javax.swing.plaf.FontUIResource)
                    UIManager.put(key, new javax.swing.plaf.FontUIResource(base));
            }

            // Starter alarms like the original: 7:00 Mon-Fri and 9:00 Sun/Sat (both off).
            alarms.add(new Alarm(7, 0, false, 1, 2, 3, 4, 5));   // Mon-Fri
            alarms.add(new Alarm(9, 0, false, 0, 6));            // Sun, Sat

            frame = new JFrame("Clock");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.setSize(380, 760);
            frame.getContentPane().setBackground(BG);
            frame.setLayout(new BorderLayout());

            // toolbar (sort + more icons)
            JPanel toolbar = new JPanel(new FlowLayout(FlowLayout.RIGHT, 18, 16));
            toolbar.setBackground(BG);
            toolbar.add(new Glyph(0, 26)); toolbar.add(new Glyph(1, 26));

            listPanel = new JPanel();
            listPanel.setLayout(new BoxLayout(listPanel, BoxLayout.Y_AXIS));
            listPanel.setBackground(BG);
            JPanel top = new JPanel(new BorderLayout());
            top.setBackground(BG); top.add(listPanel, BorderLayout.NORTH);
            JScrollPane scroll = new JScrollPane(top);
            scroll.setBorder(null); scroll.getViewport().setBackground(BG);
            scroll.getVerticalScrollBar().setUnitIncrement(16);

            JPanel content = new JPanel(new BorderLayout());
            content.setBackground(BG);
            content.add(toolbar, BorderLayout.NORTH);
            content.add(scroll, BorderLayout.CENTER);

            // The + button floats over the list using a layered pane.
            // The resize listener below keeps it in the bottom-right corner.
            Fab fab = new Fab(() -> openDialog(null));
            JLayeredPane layers = new JLayeredPane();
            layers.add(content, JLayeredPane.DEFAULT_LAYER);
            layers.add(fab, JLayeredPane.PALETTE_LAYER);
            layers.addComponentListener(new ComponentAdapter() {
                public void componentResized(ComponentEvent e) {
                    content.setBounds(0, 0, layers.getWidth(), layers.getHeight());
                    fab.setBounds(layers.getWidth() - 88, layers.getHeight() - 88, 64, 64);
                }
            });
            frame.add(layers, BorderLayout.CENTER);

            // Bottom tab bar. Display only; just the Alarm tab is functional.
            JPanel nav = new JPanel(new GridLayout(1, 4));
            nav.setBackground(NAV);
            nav.add(new NavItem(6, "Clock", false));
            nav.add(new NavItem(7, "Alarm", true));
            nav.add(new NavItem(8, "Stopwatch", false));
            nav.add(new NavItem(9, "Timer", false));
            frame.add(nav, BorderLayout.SOUTH);

            refresh();
            frame.setLocationRelativeTo(null);
            frame.setVisible(true);
        });
    }
}
